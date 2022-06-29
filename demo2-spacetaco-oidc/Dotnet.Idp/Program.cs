namespace Dotnet.Idp;

public static class Program
{
    public static void Main(string[] args)
    {
        CreateHostBuilder(args).Build().Run();
    }

    private static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(webBuilder =>
                        {

                            var port = Environment.GetEnvironmentVariable("PORT");
                            if (!string.IsNullOrEmpty(port))
                            {
                                webBuilder.UseUrls($"http://*:{port}");
                            }
                            webBuilder.UseStartup<Startup>();
                        });

}