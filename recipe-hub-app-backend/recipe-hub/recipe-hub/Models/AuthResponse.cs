namespace recipe_hub.Models
{
    public class AuthResponse
    {
        public bool IsAuthSuccessful { get; set; }
        public string? ErrorMessage { get; set; }
        public string? Token { get; set; } 
    }
}
