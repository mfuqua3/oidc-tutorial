import {Controller, ControllerOptions, PathType} from "@tsed/di";
import {Returns} from "@tsed/schema";
import {useDecorators} from "@tsed/core";
import {Use} from "@tsed/platform-middlewares";
import {AuthenticationMiddleware} from "../middlewares/AuthenticationMiddleware";
import {AuthorizationMiddleware} from "../middlewares/AuthorizationMiddleware";

export function ApiController(options: PathType | ControllerOptions) {
    return useDecorators(
        Controller("/api/" + (options) + "/"),
        Use(AuthenticationMiddleware),
        Use(AuthorizationMiddleware),
        Returns(401),
        Returns(403),
    );
}