import { InjectorService, Service } from "@tsed/di";
import { IAuthorizationHandler } from "./IAuthorizationHandler";
import { AuthorizationHandlerProviderType } from "./constants";
import { isAuthorizationHandler } from "./isAuthorizationHandler";

@Service()
export class AuthorizationHandlerProvider {
  constructor(private readonly injector: InjectorService) {}

  getHandlers(): IAuthorizationHandler[] {
    const handlers = this.injector.getAll(AuthorizationHandlerProviderType);
    return handlers.filter((x) => isAuthorizationHandler(x));
  }
}
