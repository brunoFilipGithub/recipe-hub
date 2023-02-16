namespace recipe_hub.Models
{
    public class Step
    {
        public int Id { get; set; }

        public int RecipeId { get; set; }

        public int Index { get; set; }

        public string Text { get; set; }
    }
}
