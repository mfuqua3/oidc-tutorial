import {StoreSet} from "@tsed/core";
import {AuthorizationOptions} from "../../utils/authorization/types";
import {AuthorizationMiddleware} from "../middlewares/AuthorizationMiddleware";

export function Authorize(options: AuthorizationOptions) {
    return StoreSet(AuthorizationMiddleware, options);
}