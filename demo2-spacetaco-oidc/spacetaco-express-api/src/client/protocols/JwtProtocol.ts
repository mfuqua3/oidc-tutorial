import { Req, Value } from "@tsed/common";
import { Arg, OnVerify, Protocol } from "@tsed/passport";
import { Inject } from "@tsed/di";
import { Logger } from "@tsed/logger";
import {JwtBearerHandler} from "../../utils/authentication";
import { Strategy } from "passport-http-bearer";

/**This protocol defines the JWT authentication scheme. It can be used in
 * tandem with the @Authenticate("jwt") or @Authorize({authenticationSchemes: "jwt"})
 * decorators to require an authenticated user for endpoints or controllers.*/
@Protocol({
    name: "jwt",
    useStrategy: Strategy
})
export class JwtProtocol implements OnVerify {
    @Value("jwt.issuer")
    issuer: string;
    @Inject()
    authenticationHandler: JwtBearerHandler;
    @Inject()
    logger: Logger;
    async $onVerify(@Req() req: Req, @Arg(0) jwtPayload: string) {
        this.logger.info("JWT Bearer challenged.");
        const authenticationResult = await this.authenticationHandler.handleTokenAsync(jwtPayload, {
            issuer: this.issuer,
        });
        if (authenticationResult.failure) {
            throw authenticationResult.failure;
        }
        return authenticationResult.principal;
    }
}
