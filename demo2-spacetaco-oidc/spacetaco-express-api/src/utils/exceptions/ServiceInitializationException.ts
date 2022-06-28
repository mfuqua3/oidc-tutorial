import { InternalServerError } from "@tsed/exceptions";

export class ServiceInitializationException extends InternalServerError {
  constructor(service: any, reason?: string, suggestion?: string) {
    const serviceName = service.name.toString();
    let message = `Initialization error during the construction or initialization of ${serviceName}.`;
    if(reason){
      message = message.concat('\n',reason);
    }
    if(suggestion){
      message.concat('\n',suggestion);
    }
    super(message);
  }
}