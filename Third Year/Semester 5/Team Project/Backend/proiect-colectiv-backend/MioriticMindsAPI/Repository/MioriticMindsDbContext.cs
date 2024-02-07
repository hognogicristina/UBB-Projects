using Microsoft.EntityFrameworkCore;
using MioriticMindsAPI.Models;

namespace MioriticMindsAPI.Repository
{
    public class MioriticMindsDbContext : DbContext
    {
        public MioriticMindsDbContext() { }

        public MioriticMindsDbContext(DbContextOptions<MioriticMindsDbContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Person> Persons { get; set; }
    }
}