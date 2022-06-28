import { Injectable } from "@tsed/di";
import { AuthorizationHandlerProviderType } from "./constants";

export function AuthorizationHandler(): ClassDecorator {
  return Injectable({
    type: AuthorizationHandlerProviderType,
  });
}
