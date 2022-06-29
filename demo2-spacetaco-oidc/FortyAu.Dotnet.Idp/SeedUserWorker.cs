using Dotnet.Idp.Data;
using Microsoft.AspNetCore.Identity;

namespace Dotnet.Idp;

public class SeedUserWorker: BackgroundService
{
    private readonly IServiceScopeFactory _scopeFactory;

    private string[] _seedUsers = new[]
    {
        "Andrew Kerr",
        "Mike Atlas",
        "Logan Buchanan",
        "Duane Arnett",
        "Summer Ladd",
        "Amy Arthur",
        "Grayson Carroll",
        "Thomas Townsley",
        "Buddy Rich",
        "Adam Urbas",
        "Joe Cox"
    };

    public SeedUserWorker(IServiceScopeFactory scopeFactory)
    {
        _scopeFactory = scopeFactory;
    }
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        var seedUserScope = _scopeFactory.CreateScope();
        var userManager = seedUserScope.ServiceProvider.GetRequiredService<UserManager<OidcUser>>();
        foreach (var user in _seedUsers)
        {
            var username = user.Replace(" ", "").ToLower();
            var existing = await userManager.FindByNameAsync(username);
            if (existing != null)
            {
                continue;
            }
            var created = await userManager.CreateAsync(new OidcUser
            {
                Email = (user.ToLower().Replace(' ', '.') + "@fortyau.com"),
                UserName = username,
                EmailConfirmed = true
            });
        }
    }
}