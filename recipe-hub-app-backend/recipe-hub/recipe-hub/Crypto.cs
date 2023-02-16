using System.Security.Cryptography;
using System.Text;

namespace recipe_hub
{
    public class Crypto
    {
        public static string GetHashSHA256(string _input)
        {
            StringBuilder Sb = new StringBuilder();

            var hash = SHA256.Create();
            byte[] result = hash.ComputeHash(Encoding.UTF8.GetBytes(_input));

            foreach (byte b in result)
                Sb.Append(b.ToString("x2"));
            
            return Sb.ToString();
        }


    }
}
