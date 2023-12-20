var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages();
builder.Services.AddCors();
builder.Services.AddLogging(loggingBuilder =>
{
    loggingBuilder.AddFile("app.log", append: true);
});

var app = builder.Build();

app.UseStaticFiles();

app.UseRouting();
app.UseCors();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllerRoute(
        name: "default",
        pattern: "{controller=Home}/{action=Index}");
});

app.Run(); ;
