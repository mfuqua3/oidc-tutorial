FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
ARG CONFIGURATION
WORKDIR /src
COPY ["Dotnet.Idp.csproj", "./"]
RUN dotnet restore "Dotnet.Idp.csproj"
COPY . .
WORKDIR "/src/"
RUN dotnet build "Dotnet.Idp.csproj" -c $CONFIGURATION -o /app/build

FROM build AS publish
ARG CONFIGURATION
RUN dotnet publish "Dotnet.Idp.csproj" -c $CONFIGURATION -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Dotnet.Idp.dll"]
