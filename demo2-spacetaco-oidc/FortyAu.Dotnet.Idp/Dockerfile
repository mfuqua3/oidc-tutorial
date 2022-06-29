FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["FortyAu.Dotnet.Idp/FortyAu.Dotnet.Idp.csproj", "FortyAu.Dotnet.Idp/"]
RUN dotnet restore "FortyAu.Dotnet.Idp/FortyAu.Dotnet.Idp.csproj"
COPY . .
WORKDIR "/src/FortyAu.Dotnet.Idp"
RUN dotnet build "FortyAu.Dotnet.Idp.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "FortyAu.Dotnet.Idp.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "FortyAu.Dotnet.Idp.dll"]
