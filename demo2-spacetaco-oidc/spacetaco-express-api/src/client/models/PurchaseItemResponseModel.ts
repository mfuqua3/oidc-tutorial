import {TacoPurchase} from "../../service/PurchasesService";
import {Integer, Property} from "@tsed/schema";

export class PurchaseItemResponseModel implements TacoPurchase {
    @Integer()
    itemId: number;
    @Property(String)
    payerId: string;
    @Integer()
    spentCount: number;

}