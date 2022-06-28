import { ClaimsPrincipal } from "../claims";

export class AuthorizationContext {
  constructor(public readonly user: ClaimsPrincipal, public readonly resource: unknown) {}
}
