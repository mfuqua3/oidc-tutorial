import { Service } from "@tsed/di";
import decode from "jwt-decode";
import jwt, { JwtPayload } from "jsonwebtoken";
import { OidcConfigurationManager } from "./OidcConfigurationManager";
import { JwtValidationParameters } from "./JwtValidationParameters";
import { OpenIdConnectConfiguration } from "./OpenIdConnectConfiguration";
import { OidcConfigurationException } from "./OidcConfigurationException";
import { WebTokenException } from "./WebTokenException";
import { Unauthorized } from "@tsed/exceptions";
import { Claim, ClaimsIdentity, ClaimsPrincipal, ClaimTypes } from "../../claims";
import { AuthenticationProperties, AuthenticationResult } from "../common";
import { JwksClient } from "./JwksClient";

@Service()
export class JwtBearerHandler {
  private configuration: OpenIdConnectConfiguration | null;

  constructor(private readonly configurationManager: OidcConfigurationManager,
              private readonly jwksClient: JwksClient) {}

  async handleTokenAsync(token: string, validationParameters?: JwtValidationParameters): Promise<AuthenticationResult> {
    this.configuration = await this.configurationManager.getConfigurationAsync();
    if (!this.configuration?.jwksUri) {
      return new AuthenticationResult(new OidcConfigurationException());
    }
    const decodedTokenHeader = decode<{ kid?: string }>(token, { header: true });
    if (!decodedTokenHeader.kid) {
      throw new Unauthorized("No KID specified.");
    }
    let signingKey: string;
    try {
      signingKey = await this.jwksClient.getKey(decodedTokenHeader.kid);
    } catch (e) {
      throw new Unauthorized("IDP did not provide a signing key that matched the provided KID.");
    }
    let decoded: JwtPayload | string;
    try {
      decoded = jwt.verify(token, signingKey, validationParameters);
    } catch (err) {
      return new AuthenticationResult(new WebTokenException());
    }
    return this.buildResult(decoded as JwtPayload);
  }

  private buildResult(payload: JwtPayload): AuthenticationResult {
    const result = new AuthenticationResult();
    const properties = new AuthenticationProperties();
    const { iat, exp } = payload;
    properties.issuedUtc = !!iat ? new Date(iat * 1000) : null;
    properties.expiresUtc = !!exp ? new Date(exp * 1000) : null;
    const identity = new ClaimsIdentity();
    identity.issuer = payload.iss ?? "";
    if (this.configuration?.claimsSupported) {
      const undefinedClaim = "%UNDEF";
      const claims = this.configuration.claimsSupported
        .map((type) => new Claim(type, payload[type] ?? undefinedClaim))
        .filter((claim) => claim.value !== undefinedClaim);
      identity.addClaims(claims);
    } else {
      identity.addClaim(new Claim(ClaimTypes.WellKnown.Subject, payload.sub ?? ""));
    }
    result.properties = properties;
    result.principal = new ClaimsPrincipal(identity);
    const now = new Date();
    if (properties.issuedUtc !== null && properties.issuedUtc > now) {
      result.failure = new Unauthorized("Provided token is not active.");
    }
    if (properties.expiresUtc !== null && properties.expiresUtc < now) {
      result.failure = new Unauthorized("Provided token has expired.");
    }
    return result;
  }
}
