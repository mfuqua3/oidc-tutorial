using FortyAu.Dotnet.Idp.Data;
using FortyAu.Dotnet.Idp.Utilities;
using OpenIddict.Abstractions;
using static OpenIddict.Abstractions.OpenIddictConstants;

namespace FortyAu.Dotnet.Idp;

public class ClientRegistrationWorker : IHostedService
{
    private readonly IServiceProvider _serviceProvider;

    public ClientRegistrationWorker(IServiceProvider serviceProvider)
        => _serviceProvider = serviceProvider;

    public async Task StartAsync(CancellationToken cancellationToken)
    {
        await using var scope = _serviceProvider.CreateAsyncScope();

        var context = scope.ServiceProvider.GetRequiredService<OidcDbContext>();
        await context.Database.EnsureCreatedAsync(cancellationToken);

        var manager = scope.ServiceProvider.GetRequiredService<IOpenIddictApplicationManager>();
        if (await manager.FindByClientIdAsync("space-taco", cancellationToken) == null)
        {
            await manager.CreateAsync(new OpenIddictApplicationDescriptor
            {
                ClientId = "space-taco",
                ClientSecret = "901564A5-E7FE-42CB-B10D-61EF6A8F3654",
                ConsentType = ConsentTypes.Implicit,
                DisplayName = "Space Taco Application",
                PostLogoutRedirectUris =
                {
                    new Uri("https://localhost:3000/signout-callback-oidc")
                },
                RedirectUris =
                {
                    new Uri("http://localhost:3000/signin-oidc")
                },
                Permissions =
                {
                    Permissions.Endpoints.Authorization,
                    Permissions.Endpoints.Logout,
                    Permissions.Endpoints.Token,
                    Permissions.GrantTypes.AuthorizationCode,
                    Permissions.GrantTypes.RefreshToken,
                    Permissions.ResponseTypes.Code,
                    Permissions.Scopes.Email,
                    Permissions.Scopes.Profile,
                    Permissions.Scopes.Roles,
                    Permissions.Prefixes.Scope + SpaceTacoScopes.GetTacos,
                    Permissions.Prefixes.Scope + SpaceTacoScopes.GiveTacos,
                    Permissions.Prefixes.Scope + SpaceTacoScopes.GetShopItems,
                    Permissions.Prefixes.Scope + SpaceTacoScopes.PurchaseItem
                },
                Requirements =
                {
                    Requirements.Features.ProofKeyForCodeExchange
                }
            }, cancellationToken);
        }
        if (await manager.FindByClientIdAsync("taco-time", cancellationToken) == null)
        {
            await manager.CreateAsync(new OpenIddictApplicationDescriptor
            {
                ClientId = "taco-time",
                ClientSecret = "925162eb-2fd0-4cb0-9f6b-1344d6a9f97a",
                ConsentType = ConsentTypes.Explicit,
                DisplayName = "Taco Time Application",
                PostLogoutRedirectUris =
                {
                    new Uri("http://localhost:4200/signout-callback-oidc")
                },
                RedirectUris =
                {
                    new Uri("http://localhost:4200/signin-oidc")
                },
                Permissions =
                {
                    Permissions.Endpoints.Authorization,
                    Permissions.Endpoints.Logout,
                    Permissions.Endpoints.Token,
                    Permissions.GrantTypes.AuthorizationCode,
                    Permissions.GrantTypes.RefreshToken,
                    Permissions.ResponseTypes.Code,
                    Permissions.Scopes.Email,
                    Permissions.Scopes.Profile,
                    Permissions.Scopes.Roles,
                    Permissions.Prefixes.Scope + SpaceTacoScopes.GetTacos
                },
                Requirements =
                {
                    Requirements.Features.ProofKeyForCodeExchange
                }
            }, cancellationToken);
        }
    }

    public Task StopAsync(CancellationToken cancellationToken) => Task.CompletedTask;
}