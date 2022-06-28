import {ApiController} from "../decorators/ApiControllerDecorator";
import {Post, Returns} from "@tsed/schema";
import {PurchaseItemResponseModel} from "../models/PurchaseItemResponseModel";
import {BodyParams, Req} from "@tsed/common";
import {ClaimsPrincipal} from "../../utils/claims";
import {PurchaseItemRequestModel} from "../models/PurchaseItemRequestModel";
import {PurchasesService} from "../../service/PurchasesService";
import {Unauthorized} from "@tsed/exceptions";
import {Authorize} from "../decorators/AuthorizeDecorator";

@ApiController("purchases")
export class PurchasesController{
    constructor(private readonly purchaseService: PurchasesService) {
    }
    @Post()
    @Authorize({scopes: "write:purchases"})
    @Returns(201, PurchaseItemResponseModel)
    async purchaseItem(@Req("user") user: ClaimsPrincipal, @BodyParams() request: PurchaseItemRequestModel){
        if(!user?.userId){
            throw new Unauthorized("User is not authenticated");
        }
        return await this.purchaseService.purchaseItem({...request, userId: user.userId})
    }
}