import { Exception } from "@tsed/exceptions";
import { ClaimsPrincipal } from "../../claims";
import { AuthenticationProperties } from "./AuthenticationProperties";

export class AuthenticationResult {
  principal?: ClaimsPrincipal;
  properties?: AuthenticationProperties;

  constructor(public failure?: Exception) {}
}
