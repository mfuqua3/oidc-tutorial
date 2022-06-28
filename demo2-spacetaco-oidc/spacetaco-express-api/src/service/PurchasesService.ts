import {Service} from "@tsed/di";
import {PrismaAccess} from "../data";
import {BadRequest, NotFound} from "@tsed/exceptions";

export interface PurchaseItemRequest {
    itemId: number;
    userId: string;
}

export interface TacoPurchase {
    payerId: string;
    itemId: number;
    spentCount: number;
}

@Service()
export class PurchasesService {
    constructor(private readonly prisma: PrismaAccess) {
    }

    async purchaseItem(request: PurchaseItemRequest): Promise<TacoPurchase> {
        const itemQueryResult = await this.prisma.tacoTruckItem.findUnique({
            where: {id: request.itemId},
            select: {cost: true}
        });
        if (itemQueryResult === null) {
            throw new NotFound("No item found.");
        }
        const tacosAvailable = await this.prisma.taco.count({
            where: {
                ownerId: request.userId,
                spentWithId: null
            }
        });
        if (itemQueryResult.cost > tacosAvailable) {
            throw new BadRequest("You cant afford that!");
        }
        return await this.prisma.$transaction(async (db) => {
            const tacosToSpend = await db.taco.findMany({
                where: {
                    ownerId: request.userId,
                    spentWithId: null
                },
                take: itemQueryResult.cost
            });
            const createdResult = await db.tacoPurchase.create({
                data: {
                    payerId: request.userId,
                    itemId: request.itemId,
                    spentTacos: {
                        connect: tacosToSpend
                    }
                },
                select: {
                    payerId: true,
                    itemId: true,
                    spentTacos: {
                        select: {
                            id: true
                        }
                    }
                }
            });
            return {
                payerId: createdResult.payerId,
                itemId: createdResult.itemId,
                spentCount: createdResult.spentTacos.length
            }
        });
    }
}