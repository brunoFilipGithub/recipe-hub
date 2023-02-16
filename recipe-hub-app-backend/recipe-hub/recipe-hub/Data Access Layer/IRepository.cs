using System.Linq.Expressions;

namespace recipe_hub.Data_Access_Layer
{
    public interface IRepository<T> where T : class
    {
        Task<T> Get(int id);

        Task<List<T>> GetAll();

        Task<List<T>> Find(Expression<Func<T, bool>> predicate);

        void Create(T entity);

        void Update(T entity);

        void Delete(T entity);
    }
}
