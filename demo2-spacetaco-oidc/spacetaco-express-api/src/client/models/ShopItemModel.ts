import {TacoTruckItem} from "../../service/ShopService";
import {Integer, Property} from "@tsed/schema";

export class ShopItemModel implements TacoTruckItem {
    @Integer()
    cost: number;
    @Property(String)
    icon: string;
    @Integer()
    id: number;
    @Property(String)
    name: string;

}