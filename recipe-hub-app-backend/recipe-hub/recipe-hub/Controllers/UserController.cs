using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using recipe_hub.Data_Access_Layer;
using recipe_hub.Models;
using recipe_hub.Models.ViewModels;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace recipe_hub.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        IUnitOfWork _unitOfWork;

        public UserController(RecipeHubContext recipeContext)
        { 
            _unitOfWork = new UnitOfWork(recipeContext);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            User? result = (await  _unitOfWork.UserRepository.Find(u => u.Id == id)).FirstOrDefault();

            if (result == null)
                return NotFound("User with id " + id + " not found!");

            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult<User>> CreateUser([FromBody] User user)
        {
            if (user == null)
                return BadRequest("No user from body");

            User? result = (await _unitOfWork.UserRepository.Find(u => u.Email == user.Email)).FirstOrDefault();

            if (result != null)
            {
                return Conflict("A user with that email already eists!");
            }

            result = (await _unitOfWork.UserRepository.Find(u => u.UserName == user.UserName)).FirstOrDefault();

            if (result != null)
            {
                return Conflict("A user with that username already eists!");
            }


            if (user.UserImage.Contains("default") == false)
            {
                string path = "";
                Guid guid = new Guid();
                guid = Guid.NewGuid();
                string imageName = guid.ToString().Substring(0, 7) + ".jpg";
                path = Path.Combine("Assets/UserImages/" + imageName);
                Helper.SaveBase64AsImage(path, user.UserImage);
                user.UserImage = path;
            }

            user.PasswordHash = Crypto.GetHashSHA256(user.PasswordHash);
            _unitOfWork.UserRepository.Create(user);
            await _unitOfWork.CompleteAsync();

            return  Ok(user);
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] UserLoginViewModel _userLoginViewModel)
        {
            if (_userLoginViewModel == null)
            {
                return BadRequest("Bad request");
            }

            var user = (await _unitOfWork.UserRepository.Find(u => u.Email == _userLoginViewModel.Email)).FirstOrDefault();


            if (user != null && _userLoginViewModel.Email == user.Email  &&  (Crypto.GetHashSHA256(_userLoginViewModel.Password) == user.PasswordHash) )
            {
                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("secretKey1234567"));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken(
                    issuer: "https://localhost:5001",
                    audience: "https://localhost:5001",
                    claims: new List<Claim>(),
                    expires: DateTime.Now.AddMinutes(25),
                    signingCredentials: signinCredentials);

                var userJson = Newtonsoft.Json.JsonConvert.SerializeObject(user);
                
                token.Payload["user"] = userJson;

                var tokenString = new JwtSecurityTokenHandler().WriteToken(token);
                return Ok(new AuthResponse { IsAuthSuccessful = true, Token = tokenString });
            }

            return Conflict("Wrong email or password!");
        }
    }
}
