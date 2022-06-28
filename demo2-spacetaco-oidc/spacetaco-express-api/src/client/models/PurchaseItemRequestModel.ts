import {PurchaseItemRequest} from "../../service/PurchasesService";
import {Ignore, Integer, Required} from "@tsed/schema";

export class PurchaseItemRequestModel implements PurchaseItemRequest{
    @Integer()
    @Required()
    itemId: number;
    @Ignore()
    userId: string;

}

