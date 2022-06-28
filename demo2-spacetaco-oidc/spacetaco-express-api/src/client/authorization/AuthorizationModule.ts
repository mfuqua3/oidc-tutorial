import { Env, Type } from "@tsed/core";
import { Module } from "@tsed/di";
import { ScopesAuthorizationHandler } from "./PermissionsAuthorizationHandler";

@Module({
  authorizationHandlers: [ScopesAuthorizationHandler],
})
export class AuthorizationModule {}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace TsED {
    interface Configuration {
      authorizationHandlers: AuthorizationHandlerSettings[];
    }
  }
}

type AuthorizationHandlerLoadingOptions = { env?: Env; use: Type<any> };
type AuthorizationHandlerSettings = Type<any> | AuthorizationHandlerLoadingOptions | any;
