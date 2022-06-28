import { ClaimsPrincipal } from "../claims";
import { AuthorizationResult } from "./AuthorizationResult";

export interface IAuthorizationService {
  authorize(
    user: ClaimsPrincipal,
    resource: unknown,
    requirements: AuthorizationRequirements,
  ): Promise<AuthorizationResult>;
}
export const IAuthorizationService: unique symbol = Symbol("IAuthorizationService");

export type AuthorizationRequirements = Map<string, string[]>;
