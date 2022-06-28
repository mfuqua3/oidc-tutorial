import { AuthorizationContext } from "./AuthorizationContext";
import { AuthorizationResult } from "./AuthorizationResult";

export interface IAuthorizationHandler {
  name: string;
  handle(context: AuthorizationContext, requirements?: string[]): Promise<AuthorizationResult>;
}
