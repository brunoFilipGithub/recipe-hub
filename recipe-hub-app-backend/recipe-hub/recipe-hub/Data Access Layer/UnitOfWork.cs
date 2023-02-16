using recipe_hub.Models;

namespace recipe_hub.Data_Access_Layer
{
    public class UnitOfWork : IUnitOfWork
    {
        public IRepository<User> UserRepository { get; }

        public IRepository<Recipe> RecipeRepository { get; }

        public IRepository<Ingredient> IngredientRepository { get; }

        public IRepository<Step> StepRepository { get; }

        private RecipeHubContext _context;
        private bool isDisposed = false;

        public UnitOfWork(RecipeHubContext context)
        {
            _context = context;
            UserRepository = new Repository<User>(_context);
            RecipeRepository = new Repository<Recipe>(_context);
            IngredientRepository = new Repository<Ingredient>(_context);
            StepRepository = new Repository<Step>(_context);
        }

        public async Task CompleteAsync()
        {
            await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            if (!isDisposed)
                Dispose(true);
            GC.SuppressFinalize(this);
        }

        private void Dispose(bool disposing)
        {
            isDisposed = true;
            if (disposing)
            {
                if (_context != null)
                    this._context.Dispose();
            }
        }
    }
}
