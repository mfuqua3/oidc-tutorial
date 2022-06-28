import {Service} from "@tsed/di";
import {PrismaAccess} from "../data";
import {BadRequest} from "@tsed/exceptions";

export interface GiveTacoRequest {
    payerId: string;
    payeeId: string;
    note: string;
    count: number;
}

export interface TacoTransactionRecord {
    id: number;
    payerId: string;
    payeeId: string;
    note: string;
    count: number;
    createdAt: Date;
}

export interface Taco {
    id: number;
    ownerId: string;
    givenById: string;
    awardedOn: Date;
}

@Service()
export class TacoService {
    constructor(private readonly prisma: PrismaAccess) {
    }
    async getTacos(): Promise<Taco[]>{
        const tacos = await this.prisma.taco.findMany({
            orderBy: {
                createdAt: "desc"
            },
            select: {
                createdAt: true,
                ownerId: true,
                id: true,
                createdFrom: {
                    select: {
                        payerId: true
                    }
                }
            }
        });
        return tacos.map(taco=>({
            ...taco,
            awardedOn: taco.createdAt,
            givenById: taco.createdFrom.payerId
        }));
    }

    async getUserTacoSummary(userId: string): Promise<{userId: string, tacosAvailable: number}>{
        let userRecord = await this.prisma.user.findUnique({
            where: {id: userId},
            select: {
                id: true,
                allocatedTacos: true
            }
        });
        if(userRecord === null){
            //Not very restful to create during a GET, but whatever this is a demo
            userRecord = await this.prisma.user.create({
                data: {
                    id: userId,
                    allocatedTacos: 25
                },
                select: {
                    id: true,
                    allocatedTacos: true
                }
            })
        }
        return {
            userId: userRecord.id,
            tacosAvailable: userRecord.allocatedTacos
        }
    }

    async giveTaco(request: GiveTacoRequest): Promise<TacoTransactionRecord> {
        const created = await this.prisma.$transaction(async (db) => {
            const val = await db.$executeRaw`update "User"
                                             set "allocatedTacos" = "allocatedTacos" - ${request.count}
                                             where id = ${request.payerId}
                                             returning "allocatedTacos"`;
            if (val < 0) {
                throw new BadRequest("Not enough tacos!");
            }
            return await db.tacoAward.create({
                data: {
                    payerId: request.payerId,
                    payeeId: request.payeeId,
                    note: request.note,
                    createdTacos: {
                        createMany: Array.apply(null, Array(request.count))
                            .map(()=>({
                                ownerId: request.payeeId
                            }))
                    }
                },
                include: {
                    createdTacos: true
                }
            })
        });
        return {
            ...created,
            createdAt: created.createdAt,
            count: created.createdTacos.length
        }
    }
}