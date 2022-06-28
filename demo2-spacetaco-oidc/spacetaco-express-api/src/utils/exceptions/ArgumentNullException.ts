import { InternalServerError } from "@tsed/exceptions";

export class ArgumentNullException extends InternalServerError {
  constructor(paramName?: string, message?: string) {
    message = message ?? "The argument provided is null.";
    if(paramName){
      message = message.concat(" Parameter Name: ",paramName);
    }
    super(message);
  }
}
