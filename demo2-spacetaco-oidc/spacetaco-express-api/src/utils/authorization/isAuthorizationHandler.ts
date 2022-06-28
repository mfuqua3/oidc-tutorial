import { IAuthorizationHandler } from "./IAuthorizationHandler";

export function isAuthorizationHandler(obj: any): obj is IAuthorizationHandler {
  return "handle" in obj;
}
