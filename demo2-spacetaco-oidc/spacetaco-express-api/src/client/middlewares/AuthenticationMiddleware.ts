import {AsyncMiddlewareBase} from "./common";
import {Middleware, Next} from "@tsed/common";
import {Context} from "@tsed/platform-params";
import {Configuration} from "@tsed/di";
import {ProtocolsService} from "@tsed/passport";

interface AuthenticationSettings {
    protocols: string[];
}

@Middleware()
export class AuthenticationMiddleware extends AsyncMiddlewareBase {
    private settings: AuthenticationSettings;
    constructor(
        @Configuration() configuration: Configuration,
        private readonly protocolService: ProtocolsService
    ) {
        super();
        this.settings = (configuration.get("authentication") as AuthenticationSettings) ?? { protocols: [] };
    }

    async invokeAsync(ctx: Context, next: Next): Promise<void> {
        const protocols = ctx.endpoint.store.get("protocols", []).concat(...ctx.endpoint.parent.store.get("protocols", []));
        const configuredProtocols = protocols.concat(...(this.settings.protocols ?? []));
        const toExecute = this.protocolService.getProtocolsNames().filter((x) => configuredProtocols.includes(x));
        await this.protocolService.authenticate(toExecute, {session: false}, ctx);
        next();
    }
}

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace TsED {
        interface Configuration {
            authentication: AuthenticationSettings;
        }
    }
}