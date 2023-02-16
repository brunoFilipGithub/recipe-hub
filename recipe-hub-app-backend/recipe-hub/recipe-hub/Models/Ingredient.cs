namespace recipe_hub.Models
{
    public class Ingredient
    {
        public int Id { get; set; }

        public int RecipeId { get; set; }

        public string Name { get; set; }

        public string ClassName { get; set; }

        public int Quantity { get; set; }

        public string MeasuringUnit {  get; set; }
    }
}
