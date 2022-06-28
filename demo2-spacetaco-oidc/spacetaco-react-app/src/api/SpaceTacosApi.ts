import {PurchaseItemRequest} from "../models/PurchaseItemRequest";
import {PurchaseItemResponse} from "../models/PurchaseItemResponse";
import {ShopItem} from "../models/ShopItem";
import {TacoAwardRequest} from "../models/TacoAwardRequest";
import {TacoTransaction} from "../models/TacoTransaction";
import {UserTacoSummary} from "../models/UserTacoSummary";
import {Taco} from "../models/Taco";
import axios from "axios";

const apiRoot = process.env.REACT_APP_API_ROOT;

export const SpaceTacosApi = {
    getAllTacos: async(): Promise<Taco[]>=>{
        const result = await axios.get<Taco[]>(apiRoot + "tacos");
        return result.data;
    },
    getMyTacoSummary: async():Promise<UserTacoSummary>=>{
        const result = await axios.get<UserTacoSummary>(apiRoot + "tacos/me");
        return result.data;
    },
    giveTaco:async(request: TacoAwardRequest): Promise<TacoTransaction>=>{
      const result = await axios.post<TacoTransaction>(apiRoot + "tacos", request);
      return result.data;
    },
    getShopItems: async(): Promise<ShopItem[]>=>{
        const result = await axios.get<ShopItem[]>(apiRoot + "shop");
        return result.data;
    },
    purchaseItem: async(request: PurchaseItemRequest): Promise<PurchaseItemResponse>=>{
        const result = await axios.get<PurchaseItemResponse>(apiRoot + "purchases");
        return result.data;
    },
}