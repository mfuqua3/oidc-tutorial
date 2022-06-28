import { AsyncMiddlewareBase } from "./common";
import { Middleware, Next, Req } from "@tsed/common";
import { Forbidden, InternalServerError } from "@tsed/exceptions";
import { Context } from "@tsed/platform-params";
import { Inject } from "@tsed/di";
import {AuthorizationRequirements, IAuthorizationService} from "../../utils/authorization";
import {ClaimsPrincipal} from "../../utils/claims";
import {AuthorizationOptions} from "../../utils/authorization/types";

@Middleware()
export class AuthorizationMiddleware extends AsyncMiddlewareBase {
  constructor(@Inject(IAuthorizationService) private readonly authorizationService: IAuthorizationService) {
    super();
  }

  async invokeAsync(ctx: Context, next: Next): Promise<void> {
    const req = ctx.getReq() as Req;
    if (!req.isAuthenticated || !req.isAuthenticated() || !req.user) {
      throw new InternalServerError(
        "Authorization middleware was invoked but no authenticated user exists for the current request.\n" +
        "Verify middleware has been configured to execute in the correct order, authentication should always precede authorization.",
      );
    }
    const user = req.user as ClaimsPrincipal;
    const authorizationOptions = ctx.endpoint.get<AuthorizationOptions>(AuthorizationMiddleware);
    const authorizationRequirements: AuthorizationRequirements = new Map<string, string[]>();
    const definedRequirements = authorizationOptions ? Object.keys(authorizationOptions) : [];
    for (const definedRequirement of definedRequirements) {
      const definitionValue = authorizationOptions[definedRequirement];
      if (!definitionValue) {
        continue;
      }
      const valueAsArray = Array.isArray(definitionValue) ? definitionValue : [definitionValue];
      authorizationRequirements.set(definedRequirement, valueAsArray);
    }
    const authResult = await this.authorizationService.authorize(user, null, authorizationRequirements);
    if (!authResult.succeeded) {
      throw new Forbidden(authResult.failure ?? "User is not authorized");
    }
    await next();
  }
}
