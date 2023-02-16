namespace recipe_hub.Models
{
    public class User
    {
        public int Id { get; set; }

        public string UserName { get; set; }

        public string Email {  get ; set; }

        public string PasswordHash { get; set; }

        public string UserImage { get; set; }
    }
}
