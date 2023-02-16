using recipe_hub.Models.ViewModels;

namespace recipe_hub.Models
{
    public class ViewRecipeResponse
    {
        public User User { get; set; }
        public RecipeViewModel Recipe { get; set; }
    }
}
