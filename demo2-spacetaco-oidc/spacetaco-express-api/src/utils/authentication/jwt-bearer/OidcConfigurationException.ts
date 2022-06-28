import { InternalServerError } from "@tsed/exceptions";

export class OidcConfigurationException extends InternalServerError {
  constructor() {
    super("Unable to fetch OIDC configuration from the provided authority.");
  }
}
