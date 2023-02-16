using recipe_hub.Models;

namespace recipe_hub.Data_Access_Layer
{
    public interface IUnitOfWork : IDisposable
    {
        IRepository<User> UserRepository {  get; }
        IRepository<Recipe> RecipeRepository { get; }
        IRepository<Ingredient> IngredientRepository { get; }
        IRepository<Step> StepRepository { get; }

        Task CompleteAsync();
    }
}
