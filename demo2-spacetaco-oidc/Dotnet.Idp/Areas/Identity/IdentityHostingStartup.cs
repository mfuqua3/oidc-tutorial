using Dotnet.Idp.Areas.Identity;

[assembly: HostingStartup(typeof(IdentityHostingStartup))]
namespace Dotnet.Idp.Areas.Identity
{
    public class IdentityHostingStartup : IHostingStartup
    {
        public void Configure(IWebHostBuilder builder)
        {
            builder.ConfigureServices((context, services) => {
            });
        }
    }
}
