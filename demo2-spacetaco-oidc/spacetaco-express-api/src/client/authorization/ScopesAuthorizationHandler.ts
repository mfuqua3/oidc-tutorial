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
    const scopeClaims = user.findAll(ClaimTypes.Scopes).map((c) => c.value);
    for (const permissionRequirement in requirements) {
      if (!scopeClaims.includes(permissionRequirement)) {
        return AuthorizationResult.failed(`Access denied, requires the following access to the following scopes: (${requirements.join("|")})`);
      }
    }
    return AuthorizationResult.success();
  }
}
