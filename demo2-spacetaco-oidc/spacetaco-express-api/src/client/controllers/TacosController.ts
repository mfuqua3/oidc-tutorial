import {ApiController} from "../decorators/ApiControllerDecorator";
import {Get, Post, Returns} from "@tsed/schema";
import {TacoTransactionModel} from "../models/TacoTransactionModel";
import {BodyParams, Req} from "@tsed/common";
import {ClaimsPrincipal} from "../../utils/claims";
import {TacoAwardRequestModel} from "../models/TacoAwardRequestModel";
import {TacoModel} from "../models/TacoModel";
import {TacoService} from "../../service/TacoService";
import {Unauthorized} from "@tsed/exceptions";
import {Authorize} from "../decorators/AuthorizeDecorator";

@ApiController("tacos")
export class TacosController {
    constructor(private readonly tacoService: TacoService) {
    }

    @Post()
    @Authorize({scopes: "write:tacos"})
    @Returns(201, TacoTransactionModel)
    async giveTaco(@Req("user") user: ClaimsPrincipal, @BodyParams() request: TacoAwardRequestModel) {
        if (!user?.userId) {
            throw new Unauthorized("User is not authenticated");
        }
        return await this.tacoService.giveTaco({...request, payerId: user.userId});
    }

    @Get()
    @Authorize({scopes: "read:tacos"})
    @Returns(200, TacoModel)
    async getTacos() {
        return await this.tacoService.getTacos();
    }
}