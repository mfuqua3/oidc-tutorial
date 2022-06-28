import {AsyncMiddlewareBase} from "./common";
import {Middleware, Next, Req} from "@tsed/common";
import {Context} from "@tsed/platform-params";
import {Configuration, Constant} from "@tsed/di";
import {ProtocolsService} from "@tsed/passport";


@Middleware()
export class AuthenticationMiddleware extends AsyncMiddlewareBase {

    constructor(
        @Configuration() configuration: Configuration,
        private readonly protocolService: ProtocolsService
    ) {
        super();
    }

    async invokeAsync(ctx: Context, next: Next): Promise<void> {
        const protocols = ctx.endpoint.store.get("protocols", []).concat(...ctx.endpoint.parent.store.get("protocols", []));
        const toExecute = this.protocolService.getProtocolsNames().filter((x) => protocols.includes(x));
        await this.protocolService.authenticate(toExecute, {}, ctx);
        next();
    }
}
