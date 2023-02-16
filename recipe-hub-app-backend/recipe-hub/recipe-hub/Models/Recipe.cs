namespace recipe_hub.Models
{
    public class Recipe
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ImageString { get; set; }
    }
}
