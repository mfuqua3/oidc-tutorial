import { Unauthorized } from "@tsed/exceptions";

export class WebTokenException extends Unauthorized {
  constructor() {
    super("Failed to validate the provided access token.");
  }
}
