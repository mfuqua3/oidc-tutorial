import { AuthorizationRequirements, IAuthorizationService } from "./IAuthorizationService";
import { Injectable } from "@tsed/di";
import { ClaimsPrincipal } from "../claims";
import { AuthorizationResult } from "./AuthorizationResult";
import { AuthorizationHandlerProvider } from "./AuthorizationHandlerProvider";
import { AuthorizationContext } from "./AuthorizationContext";

@Injectable({ provide: IAuthorizationService })
export class AuthorizationService implements IAuthorizationService {
  constructor(private readonly handlerProvider: AuthorizationHandlerProvider) {
  }

  async authorize(
    user: ClaimsPrincipal,
    resource: unknown,
    requirements: AuthorizationRequirements,
  ): Promise<AuthorizationResult> {
    const authContext = new AuthorizationContext(user, resource);
    const handlers = this.handlerProvider.getHandlers();
    const results: AuthorizationResult[] = [];
    for (const handler of handlers) {
      const handlerRequirements = requirements.get(handler.name);
      results.push(await handler.handle(authContext, handlerRequirements));
    }
    return AuthorizationResult.combine(results);
  }
}
