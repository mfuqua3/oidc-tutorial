import {OpenIdConnectConfiguration} from "./OpenIdConnectConfiguration";
import {Inject, ProviderScope, Scope} from "@tsed/di";
import {deserialize} from "@tsed/json-mapper";
import axios, {AxiosResponse} from "axios";
import {Exception, InternalServerError} from "@tsed/exceptions";
import {JwtOptions} from "../../config/jwt";
import * as https from "https";

@Scope(ProviderScope.SINGLETON)
export class OidcConfigurationManager {
    private configuration: OpenIdConnectConfiguration | null = null;
    private readonly address: string;

    constructor(@Inject(JwtOptions) private readonly options: JwtOptions) {
        this.address = `${this.options.authority}/.well-known/openid-configuration`
    }

    async getConfigurationAsync(): Promise<OpenIdConnectConfiguration | null> {
        if (this.configuration !== null) {
            return this.configuration;
        }
        let configResponse: AxiosResponse;
        try {
            //CAUTION, IF YOU FORK THIS IMPLEMENTATION, BE AWARE THAT SSL VALIDATION IS TURNED OFF
            //VALID FOR THIS USE CASE FOR INTERNAL IDP DEMO, BUT YOU WOULD NEVER DO THIS IN A REAL ENVIRONMENT
            configResponse = await axios.get(this.address, {
                httpsAgent: new https.Agent({
                    rejectUnauthorized: false
                })
            });
        } catch (e) {
            if (!axios.isAxiosError(e) || !e.response?.status || e.response.status < 500) {
                throw new InternalServerError(e);
            }
            throw new Exception(e.response.status, e.response.statusText);
        }
        const result = deserialize<OpenIdConnectConfiguration>(configResponse.data, {
            type: OpenIdConnectConfiguration,
        });
        return result;
    }
}
