using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Web;
using Microsoft.IdentityModel.Tokens;
using recipe_hub.Data_Access_Layer;
using System.Text;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddAuthentication(options => {
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = "https://localhost:7270",
            ValidAudience = "https://localhost:7270",
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("secretKey1234567"))
        };
    });

builder.Services.AddControllers();

builder.Services.AddDbContext<RecipeHubContext>(options => options.UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=RecipeHubDatabase;Trusted_Connection=True"));

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "MyAllowSpecificOrigins",
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:4200").AllowAnyHeader().AllowAnyMethod();
                      });
});

var app = builder.Build();

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.UseCors("MyAllowSpecificOrigins");
app.Run();
