import { AdditionalProperties, CollectionOf, Name, Property } from "@tsed/schema";
import { OpenIdProviderMetadataNames } from "./OpenIdProviderMetadataNames";

@AdditionalProperties(true)
export class OpenIdConnectConfiguration {
  [type: string]: unknown;
  @Property()
  @Name(OpenIdProviderMetadataNames.AcrValuesSupported)
  @CollectionOf(String)
  acrValuesSupported?: string[];
  @Property()
  @Name(OpenIdProviderMetadataNames.AuthorizationEndpoint)
  authorizationEndpoint?: string;
  @Property()
  @Name(OpenIdProviderMetadataNames.CheckSessionIframe)
  checkSessionIframe?: string;
  @Property()
  @Name(OpenIdProviderMetadataNames.ClaimsSupported)
  @CollectionOf(String)
  claimsSupported?: string[];
  @Property()
  @Name(OpenIdProviderMetadataNames.ClaimsLocalesSupported)
  @CollectionOf(String)
  claimsLocalesSupported?: string[];
  @Property()
  @Name(OpenIdProviderMetadataNames.ClaimsParameterSupported)
  claimsParameterSupported?: boolean;
  @Property()
  @Name(OpenIdProviderMetadataNames.ClaimTypesSupported)
  @CollectionOf(String)
  claimTypesSupported?: string[];
  @Name(OpenIdProviderMetadataNames.DisplayValuesSupported)
  @CollectionOf(String)
  displayValuesSupported?: string[];
  @Property()
  @Name(OpenIdProviderMetadataNames.EndSessionEndpoint)
  endSessionEndpoint?: string;
  @Property()
  @Name(OpenIdProviderMetadataNames.FrontchannelLogoutSessionSupported)
  frontChannelLogoutSessionSupported?: string;
  @Property()
  @Name(OpenIdProviderMetadataNames.FrontchannelLogoutSupported)
  frontchannelLogoutSupported?: string;
  @Property()
  @Name(OpenIdProviderMetadataNames.GrantTypesSupported)
  @CollectionOf(String)
  grantTypesSupported?: string[];
  @Property()
  @Name(OpenIdProviderMetadataNames.HttpLogoutSupported)
  httpLogoutSupported?: boolean;
  @Property()
  @Name(OpenIdProviderMetadataNames.IdTokenEncryptionAlgValuesSupported)
  @CollectionOf(String)
  idTokenEncryptionAlgValuesSupported?: string[];
  @Property()
  @Name(OpenIdProviderMetadataNames.IdTokenEncryptionEncValuesSupported)
  @CollectionOf(String)
  idTokenEncryptionEncValuesSupported?: string[];
  @Property()
  @Name(OpenIdProviderMetadataNames.IdTokenSigningAlgValuesSupported)
  @CollectionOf(String)
  idTokenSigningAlgValuesSupported?: string[];
  @Property()
  @Name(OpenIdProviderMetadataNames.IntrospectionEndpoint)
  @CollectionOf(String)
  introspectionEndpoint?: string[];
  @Property()
  @Name(OpenIdProviderMetadataNames.IntrospectionEndpointAuthMethodsSupported)
  @CollectionOf(String)
  introspectionEndpointAuthMethodsSupported?: string[];
  @Property()
  @Name(OpenIdProviderMetadataNames.IntrospectionEndpointAuthSigningAlgValuesSupported)
  @CollectionOf(String)
  introspectionEndpointAuthSigningAlgValuesSupported?: string[];
  @Property()
  @Name(OpenIdProviderMetadataNames.Issuer)
  issuer?: string;
  @Property()
  @Name(OpenIdProviderMetadataNames.JwksUri)
  jwksUri?: string;
  @Property()
  @Name(OpenIdProviderMetadataNames.LogoutSessionSupported)
  logoutSessionSupported?: boolean;
  @Property()
  @Name(OpenIdProviderMetadataNames.OpPolicyUri)
  opPolicyUri?: string;
  @Property()
  @Name(OpenIdProviderMetadataNames.OpTosUri)
  opTosUri?: string;
  @Property()
  @Name(OpenIdProviderMetadataNames.RegistrationEndpoint)
  registrationEndpoint?: string;
  @Property()
  @Name(OpenIdProviderMetadataNames.RequestObjectEncryptionAlgValuesSupported)
  @CollectionOf(String)
  requestObjectEncryptionAlgValuesSupported?: string[];
  @Property()
  @Name(OpenIdProviderMetadataNames.RequestObjectEncryptionEncValuesSupported)
  @CollectionOf(String)
  requestObjectEncryptionEncValuesSupported?: string[];
  @Property()
  @Name(OpenIdProviderMetadataNames.RequestObjectSigningAlgValuesSupported)
  @CollectionOf(String)
  requestObjectSigningAlgValuesSupported?: string[];
  @Property()
  @Name(OpenIdProviderMetadataNames.RequestParameterSupported)
  requestParameterSupported?: boolean;
  @Property()
  @Name(OpenIdProviderMetadataNames.RequestUriParameterSupported)
  requestUriParameterSupported?: boolean;
  @Property()
  @Name(OpenIdProviderMetadataNames.RequireRequestUriRegistration)
  requireRequestUriRegistration?: boolean;
  @Property()
  @Name(OpenIdProviderMetadataNames.ResponseModesSupported)
  @CollectionOf(String)
  responseModesSupported?: string[];
  @Property()
  @Name(OpenIdProviderMetadataNames.ResponseTypesSupported)
  @CollectionOf(String)
  responseTypesSupported?: string[];
  @Property()
  @Name(OpenIdProviderMetadataNames.ServiceDocumentation)
  serviceDocumentation?: string;
  @Property()
  @Name(OpenIdProviderMetadataNames.ScopesSupported)
  @CollectionOf(String)
  scopesSupported?: string[];
  @Property()
  @Name(OpenIdProviderMetadataNames.SubjectTypesSupported)
  @CollectionOf(String)
  subjectTypesSupported?: string[];
  @Property()
  @Name(OpenIdProviderMetadataNames.TokenEndpoint)
  tokenEndpoint?: string;
  @Property()
  @Name(OpenIdProviderMetadataNames.TokenEndpointAuthMethodsSupported)
  @CollectionOf(String)
  tokenEndpointAuthMethodsSupported?: string[];
  @Property()
  @Name(OpenIdProviderMetadataNames.TokenEndpointAuthSigningAlgValuesSupported)
  @CollectionOf(String)
  tokenEndpointAuthSigningAlgValuesSupported?: string[];
  @Property()
  @Name(OpenIdProviderMetadataNames.UILocalesSupported)
  @CollectionOf(String)
  uiLocalesSupported?: string[];
  @Property()
  @Name(OpenIdProviderMetadataNames.UserInfoEndpoint)
  userInfoEndpoint?: string;
  @Property()
  @Name(OpenIdProviderMetadataNames.UserInfoEncryptionAlgValuesSupported)
  @CollectionOf(String)
  userInfoEndpointEncryptionAlgValuesSupported?: string[];
  @Property()
  @Name(OpenIdProviderMetadataNames.UserInfoSigningAlgValuesSupported)
  @CollectionOf(String)
  UserInfoEndpointSigningAlgValuesSupported?: string[];
}
