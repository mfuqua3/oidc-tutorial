import {ApiController} from "../decorators/ApiControllerDecorator";
import {Get, Returns} from "@tsed/schema";
import {ShopItemModel} from "../models/ShopItemModel";
import {ShopService} from "../../service/ShopService";
import {Authorize} from "../decorators/AuthorizeDecorator";

@ApiController("shop")
export class ShopController {
    constructor(private readonly shopService: ShopService) {
    }
    @Get()
    @Authorize({scopes: "read:items"})
    @Returns(200, ShopItemModel)
    async getItems(){
        return await this.shopService.getItems();
    }
}