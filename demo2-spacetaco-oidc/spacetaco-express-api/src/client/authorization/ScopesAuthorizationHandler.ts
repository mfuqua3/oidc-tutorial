import {
  AuthorizationContext,
  AuthorizationHandler,
  AuthorizationResult,
  IAuthorizationHandler
} from "../../utils/authorization";
import {AuthorizationRequirements} from "../../utils/authorization/types";
import {ClaimTypes} from "../../utils/claims";


@AuthorizationHandler()
export class ScopesAuthorizationHandler implements IAuthorizationHandler {
  name: string = AuthorizationRequirements.Scopes;

  async handle({ user }: AuthorizationContext, requirements?: string[]): Promise<AuthorizationResult> {
    if (!requirements || requirements.length === 0) {
      return AuthorizationResult.success();
    }
    const scopeClaims = user.findAll(ClaimTypes.Scope).map((c) => c.value);
    const permittedScopes = scopeClaims.map(scopeClaim=>scopeClaim.split(' ')).flatMap(x=>x);
    for (const requiredScope of requirements) {
      if (!permittedScopes.includes(requiredScope)) {
        return AuthorizationResult.failed(`Access denied, requires the following access to the following scopes: (${requirements.join("|")})`);
      }
    }
    return AuthorizationResult.success();
  }
}
