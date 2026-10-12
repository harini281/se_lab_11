var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod());
});
var app = builder.Build();
app.UseCors("Frontend");

app.MapGet("/", () => Results.Ok(new
{
    app = "CampusEats API",
    message = "Local demo API is running.",
    endpoints = new[] { "/api/health", "/api/menu" }
}));

app.MapGet("/api/health", () => Results.Ok(new
{
    status = "healthy",
    service = "CampusEats.Api",
    environment = app.Environment.EnvironmentName
}));

app.MapGet("/api/menu", () => Results.Ok(new[]
{
    new MenuItem(1, "Crispy Chicken Burger", "Burgers", 850, "Crispy chicken, fresh lettuce and house sauce.", "🍔", "Student favourite"),
    new MenuItem(2, "Classic Margherita Pizza", "Pizza", 1200, "Cheese, tomato and fragrant basil.", "🍕", "Freshly baked"),
    new MenuItem(3, "Rainbow Veggie Bowl", "Healthy", 760, "Colourful vegetables, rice and sesame dressing.", "🥗", "Veggie choice"),
    new MenuItem(4, "Iced Milo", "Drinks", 350, "A chilled chocolate malt drink.", "🥤", "Cool break"),
    new MenuItem(5, "Chicken Kottu", "Rice & Noodles", 900, "Sri Lankan-style chopped roti with chicken.", "🍲", "Local pick"),
    new MenuItem(6, "Chocolate Brownie", "Desserts", 420, "Rich chocolate brownie for your sweet break.", "🍫", "Sweet treat")
}));

app.Run();

record MenuItem(int Id, string Name, string Category, decimal Price, string Description, string Emoji, string Tag);
