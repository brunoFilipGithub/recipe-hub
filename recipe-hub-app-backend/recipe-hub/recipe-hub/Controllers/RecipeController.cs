using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using recipe_hub.Data_Access_Layer;
using recipe_hub.Models;
using recipe_hub.Models.ViewModels;
using System.Diagnostics;
using System.Text.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace recipe_hub.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipeController : ControllerBase
    {
        private IUnitOfWork _unitOfWork;

        public RecipeController(RecipeHubContext recipeContext)
        {
            _unitOfWork = new UnitOfWork(recipeContext);
        }

        private static JsonResult Json(object data)
        {
            return new JsonResult(data, new JsonSerializerOptions());
        }

        [HttpGet]
        [Route("userRecipes/{id}")]
        public async Task<ActionResult> GetUserRecipes([FromRoute] int id)
        {
            var recipes = await _unitOfWork.RecipeRepository.Find(recipe => recipe.UserId == id);

            if (recipes == null)
            {
                return NotFound();
            }
            if (recipes.Count() == 0)
            {
                return NotFound();
            }

            List<ViewRecipeResponse> vrrs = new List<ViewRecipeResponse>();

            foreach (Recipe recipe in recipes)
            {
                var recipeViewModel = await TryInitializeRecipe(recipe);
                var vrResponse = new ViewRecipeResponse();
                vrResponse.Recipe = recipeViewModel;
                vrResponse.User = (await _unitOfWork.UserRepository.Find(u => u.Id == recipeViewModel.UserId)).FirstOrDefault();

                vrrs.Add(vrResponse);
            }

            return Json(vrrs);
        }

        // GET: api/<RecipeController>
        [HttpGet]
        public async Task<ActionResult> GetAllRecipes()
        {
            var recipes = await _unitOfWork.RecipeRepository.GetAll();

            if(recipes == null)
            {
                return NotFound();
            }
            if (recipes.Count() == 0) 
            {
                return NotFound();
            }

            List<ViewRecipeResponse> vrrs = new List<ViewRecipeResponse>();

            foreach(Recipe recipe in recipes)
            {
                var recipeViewModel = await TryInitializeRecipe(recipe);
                var vrResponse = new ViewRecipeResponse();
                vrResponse.Recipe = recipeViewModel;
                vrResponse.User = (await _unitOfWork.UserRepository.Find(u => u.Id == recipeViewModel.UserId)).FirstOrDefault();
                
                vrrs.Add(vrResponse);
            }

            return Json(vrrs);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetRecipeById([FromRoute] int id)
        {
            Recipe recipe = await _unitOfWork.RecipeRepository.Get(id);

            RecipeViewModel recipeViewModel = await TryInitializeRecipe(recipe);

            if (recipeViewModel == null)
            {
                string error = "Recipe with id: " + id + "is invalid!";
                Debug.WriteLine(error);
                Response.StatusCode = 500;
                return Json(error);
            }

            var vrResponse = new ViewRecipeResponse();
            vrResponse.Recipe = recipeViewModel;
            vrResponse.User = (await _unitOfWork.UserRepository.Find(u => u.Id == recipeViewModel.UserId)).FirstOrDefault();
            vrResponse.User.UserImage = Helper.GetBase64FromFile(vrResponse.User.UserImage);

            return Json(vrResponse);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] RecipeViewModel recipe)
        {
            Recipe _recipe = new Recipe { UserId = recipe.UserId, Description = recipe.Description, Name = recipe.Name, ImageString = recipe.ImageString };
            int id;

            try
            {
                if (recipe.ImageString.Contains("default") == false)
                {
                    string path = "";
                    Guid guid = new Guid();
                    guid = Guid.NewGuid();
                    string imageName = guid.ToString().Substring(0, 7) + ".jpg";
                    path = Path.Combine("Assets/RecipeImages/" + imageName);
                    Helper.SaveBase64AsImage(path, recipe.ImageString);
                    _recipe.ImageString = path;
                }

                _unitOfWork.RecipeRepository.Create(_recipe);
                await _unitOfWork.CompleteAsync();

                id = (await _unitOfWork.RecipeRepository.Find(r => r.Name == _recipe.Name && r.Description == _recipe.Description)).FirstOrDefault().Id;
                

                if (recipe.Steps != null)
                {
                    foreach (Step step in recipe.Steps)
                    {
                        step.RecipeId = id;
                         _unitOfWork.StepRepository.Create(step);
                    }
                }

                if (recipe.Ingredients != null)
                {
                    foreach (Ingredient ing in recipe.Ingredients)
                    {
                        ing.Id = 0;
                        ing.RecipeId = id;
                         _unitOfWork.IngredientRepository.Create(ing);
                    }
                }

                await _unitOfWork.CompleteAsync();

            } catch (Exception ex)
            {
                string error = "Problem during recipe creation: " + ex.Message;
                Debug.WriteLine(error);
                Response.StatusCode = 500;
                return Json(error);
            }

            return Json(_recipe);

        }

        [HttpGet]
        [Route("image/{path}")]
        public ActionResult GetImage([FromRoute] string path)
        {
            try
            {
                return Json(Helper.GetBase64FromFile(path));
            }
            catch(Exception ex)
            {
                return Json("Error while getting requested image: " + ex.Message);
            }
        }

        [HttpPut]
        [Route("putRecipe/")]
        public async Task<ActionResult> Put(RecipeViewModel _recipe)
        {
            if(isRecipeValid(_recipe))
            {
                var recipeFromDB = (await _unitOfWork.RecipeRepository.Find(recipe => recipe.Id == _recipe.Id)).FirstOrDefault();

                if(recipeFromDB != null)
                {
                    try
                    {
                        recipeFromDB.Name = _recipe.Name;
                        recipeFromDB.Description = _recipe.Description;

                        if (_recipe.ImageString.Contains("default") == false)
                        {
                            if (recipeFromDB.ImageString.Contains("default") || _recipe.ImageString != Helper.GetBase64FromFile(recipeFromDB.ImageString))
                            {
                                string path = "";
                                Guid guid = new Guid();
                                guid = Guid.NewGuid();
                                string imageName = guid.ToString().Substring(0, 7) + ".jpg";
                                path = Path.Combine("Assets/RecipeImages/" + imageName);
                                Helper.SaveBase64AsImage(path, _recipe.ImageString);
                                recipeFromDB.ImageString = path;
                            }
                        }
                        else
                        {
                            recipeFromDB.ImageString = _recipe.ImageString;
                        }

                        _unitOfWork.RecipeRepository.Update(recipeFromDB);

                        List<Ingredient> ingredients = (await _unitOfWork.IngredientRepository.Find(ing => ing.RecipeId == _recipe.Id));
                        List<Step> steps = (await _unitOfWork.StepRepository.Find(step => step.RecipeId == _recipe.Id));

                        foreach(var ing in ingredients)
                        {
                            _unitOfWork.IngredientRepository.Delete(ing);
                        }

                        foreach (var step in steps)
                        {
                            _unitOfWork.StepRepository.Delete(step);
                        }

                        await _unitOfWork.CompleteAsync();

                        foreach (Step step in _recipe.Steps)
                        {
                            step.Id = 0;
                            step.RecipeId = recipeFromDB.Id;
                            _unitOfWork.StepRepository.Create(step);
                        }

                        await _unitOfWork.CompleteAsync();

                        foreach (Ingredient ing in _recipe.Ingredients)
                        {
                            ing.Id = 0;
                            ing.RecipeId = recipeFromDB.Id;
                            _unitOfWork.IngredientRepository.Create(ing);
                        }

                        await _unitOfWork.CompleteAsync();

                        return Ok();
                    }
                    catch(Exception ex)
                    {
                        return Json("Problem with updating the recipe, " + ex.Message);
                    }
                }
                return Json("Could not find a matching recipe in the database!");
            }
            return Json("Recipe from the request is not valid!");
        }

        // DELETE api/<RecipeController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var recipe = (await _unitOfWork.RecipeRepository.Find(recipe => recipe.Id == id)).FirstOrDefault();

            if (recipe == null)
            {
                return NotFound("No recipe with id " + id + " found");
            }

            List<Ingredient> ings = (await _unitOfWork.IngredientRepository.Find(x => x.RecipeId == id));
            
            foreach(Ingredient ing in ings)
            {
                _unitOfWork.IngredientRepository.Delete(ing);
                await _unitOfWork.CompleteAsync();
            }

            List<Step> steps = (await _unitOfWork.StepRepository.Find(x => x.RecipeId == id));

            foreach (Step step in steps)
            {
                _unitOfWork.StepRepository.Delete(step);
                await _unitOfWork.CompleteAsync();
            }

            _unitOfWork.RecipeRepository.Delete(recipe);
            await _unitOfWork.CompleteAsync();

            return Ok();
        }

        private async Task<RecipeViewModel> TryInitializeRecipe(Recipe recipe) 
        {
            List<Ingredient>? ingredients = await _unitOfWork.IngredientRepository.Find(x => x.RecipeId == recipe.Id);
            List<Step>? steps = await _unitOfWork.StepRepository.Find(x => x.RecipeId == recipe.Id);

            if (recipe == null || ingredients == null || steps == null)
            {
                return null;
            }

            if (recipe.ImageString.Contains("default") == false)
            {
                recipe.ImageString = Helper.GetBase64FromFile(recipe.ImageString);
            }

            RecipeViewModel recipeViewModel = new RecipeViewModel
            {
                Id = recipe.Id,
                UserId = recipe.UserId,
                Description = recipe.Description,
                ImageString = recipe.ImageString,
                Name = recipe.Name,
                Ingredients = ingredients,
                Steps = steps
            };

            return recipeViewModel;
        }

        private bool isRecipeValid(RecipeViewModel _recipe)
        {
            if(_recipe.Name.Length > 0 && 
               _recipe.Description.Length > 0 &&   
               _recipe.ImageString.Length > 0 &&
               _recipe.UserId != 0 &&
               _recipe.Ingredients.Count > 0 &&
               _recipe.Steps.Count >= 2)
            {
                return true;
            }

            return false;
        }


    }
}
