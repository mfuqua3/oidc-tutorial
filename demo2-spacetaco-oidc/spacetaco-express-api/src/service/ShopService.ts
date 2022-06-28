import {Service} from "@tsed/di";
import {PrismaAccess} from "../data";

export interface TacoTruckItem {
    name: string;
    id: number;
    cost: number;
    icon: string;
}

@Service()
export class ShopService {
    constructor(private readonly prisma: PrismaAccess) {
    }
    async getItems(): Promise<TacoTruckItem[]>{
        return await this.prisma.tacoTruckItem.findMany();
    }
}