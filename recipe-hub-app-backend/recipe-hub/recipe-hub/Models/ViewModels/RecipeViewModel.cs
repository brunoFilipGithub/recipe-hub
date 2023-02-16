using Microsoft.AspNetCore.Mvc;

namespace recipe_hub.Models.ViewModels
{
    
    public class RecipeViewModel
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ImageString { get; set; }
        public List<Ingredient> Ingredients { get; set; }
        public List<Step> Steps { get; set; }
    }
  }
