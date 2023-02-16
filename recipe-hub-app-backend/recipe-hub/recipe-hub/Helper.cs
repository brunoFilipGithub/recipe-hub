using recipe_hub.Models;
using System.Diagnostics;

namespace recipe_hub
{
    public class Helper
    {
        public static bool SaveBase64AsImage(string path, string base64raw)
        {
            string format = base64raw.Substring(11, 3);
            int startIndex = 0;

            switch (format)
            {
                case "jpe":
                    {
                        format = ".jpg";
                        startIndex = 23;
                        break;
                    }

                case "png":
                    {
                        format = ".png";
                        startIndex = 22;
                        break;
                    }
            }

            try
            {
                string base64 = base64raw.Substring(startIndex);
                byte[] imageBytes = Convert.FromBase64String(base64);
                File.WriteAllBytes(path, imageBytes);

            } catch(Exception ex)
            {
                Debug.WriteLine("Error while saving an image: " + ex);
                return false;
            }

            return true;
        }

        public static string GetBase64FromFile(string path)
        {
            string format = Path.GetExtension(path);
            string prefix = "data:image/" + format.Substring(1) + ";base64,";

            byte[] imageBytes = File.ReadAllBytes(path);
            return prefix + Convert.ToBase64String(imageBytes);
            
        }

        // TODO: rename database row [User].UserImage to ImageString
        public static void NormalizeImageStrings<T>(ref List<T>  objects)
        {
            if (typeof(T) == typeof(Recipe))
            {
                foreach (var recipe in (objects as List<Recipe>))
                {
                    if (recipe.ImageString.Contains("default") == false)
                    {
                        recipe.ImageString = GetBase64FromFile(recipe.ImageString);
                    }
                }
            }
            else
            {
                foreach (var user in (objects as List<User>))
                {
                    if (user.UserImage.Contains("default") == false)
                    {
                        user.UserImage = GetBase64FromFile(user.UserImage);
                    }
                }
            }
        }
    }
}
