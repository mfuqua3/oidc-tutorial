import { Injectable, OnInit } from "@tsed/di";
import JwksRsa from "jwks-rsa";
import { OidcConfigurationManager } from "./OidcConfigurationManager";
import { ArgumentNullException, ServiceInitializationException } from "../../exceptions";
import https from "https";

@Injectable()
export class JwksClient implements OnInit {
  private _client: JwksRsa.JwksClient | null = null;

  constructor(private readonly configurationManager: OidcConfigurationManager) {
  }

  async $onInit(): Promise<any> {
    const config = await this.configurationManager.getConfigurationAsync();
    if (!config?.jwksUri) {
      throw new ServiceInitializationException(
        JwksClient,
        "Unable to determine a JWKS URI endpoint from the OIDC configuration.",
        `Ensure your endpoints are properly configured and that the ${OidcConfigurationManager.name.toString()} is 
            fetching the proper remote configuration from your identity provider.`);
    }
    this._client = JwksRsa({
      cache: true,
      cacheMaxEntries: 5,
      cacheMaxAge: 600000,
      jwksUri: config?.jwksUri,
      rateLimit: true,
      jwksRequestsPerMinute: 10,
      //DISABLES SSL CERT VALIDATION, DO NOT COPY FOR PROD CODE
      requestAgent: new https.Agent({
        rejectUnauthorized: false
      })
    });
  }

  async getKey(kid: string) {
    if(this._client === null){
      throw new ArgumentNullException("client");
    }
    const key = await this._client.getSigningKey(kid);
    return key.getPublicKey();
  }
}