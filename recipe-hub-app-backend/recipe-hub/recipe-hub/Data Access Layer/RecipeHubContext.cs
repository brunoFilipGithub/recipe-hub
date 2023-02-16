using Microsoft.EntityFrameworkCore;
using recipe_hub.Models;
using System.Linq.Expressions;

namespace recipe_hub.Data_Access_Layer
{
    public class RecipeHubContext : DbContext
    {
        public DbSet<Recipe> Recipes { get; set; }
        public DbSet<Ingredient> Ingredients { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Step> Steps { get; set; }

        public RecipeHubContext(DbContextOptions<RecipeHubContext> options)
        : base(options)
        {

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=RecipeHubDatabase;Trusted_Connection=True");
            }
        }
    }
}
