using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace recipe_hub.Data_Access_Layer
{
    public class Repository<T> : IRepository<T>  where T : class
    {
        RecipeHubContext _context;

        public Repository(RecipeHubContext context)
        {
            _context = context;
        }

        public async Task<T> Get(int id)
        {
            return await _context.Set<T>().FindAsync(id);
        }

        public  async Task<List<T>> GetAll() 
        {
            return  await _context.Set<T>().AsNoTracking().ToListAsync();
        }

        public  async Task<List<T>> Find(Expression<Func<T, bool>> expression)
        { 
            return  await _context.Set<T>().Where(expression).AsNoTracking().ToListAsync();
        }

        public void Create(T entity)
        {
            _context.Set<T>().Add(entity);
        }

        public void Update(T entity)
        {
            _context.Set<T>().Update(entity);
        }

        public void Delete(T entity)
        {
            _context.Set<T>().Remove(entity);
        }
    }
}
