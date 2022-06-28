using System.Collections.Immutable;
using System.Security.Claims;
using OpenIddict.Abstractions;

namespace FortyAu.Dotnet.Idp.Helpers;

public static class ClaimsIdentityExtensions
{
    private const string Scope = OpenIddictConstants.Claims.Scope;

    public static void SetScopes(this ClaimsIdentity claimsIdentity, IEnumerable<string> scopes)
    {
        claimsIdentity.AddClaims(scopes.Select(x =>
            new Claim(Scope, x, "String", "https://localhost:7113/", "https://localhost:7113/", claimsIdentity)));
    }

    public static ImmutableArray<string> GetScopes(this ClaimsIdentity claimsIdentity)
    {
        return claimsIdentity.GetClaims(Scope).ToImmutableArray();
    }

    public static bool HasScope(this ClaimsIdentity claimsIdentity, string scope)
    {
        return claimsIdentity.HasClaim(Scope, scope);
    }
}