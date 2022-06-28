using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace FortyAu.Dotnet.Idp.Data;

public class OidcDbContext : IdentityDbContext<OidcUser>
{
    public OidcDbContext(DbContextOptions<OidcDbContext> options)
        : base(options)
    {
    }
}