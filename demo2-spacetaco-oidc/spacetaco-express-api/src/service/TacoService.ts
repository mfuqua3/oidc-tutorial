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

    async getTacos(): Promise<Taco[]> {
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
                        payer: {
                            select: {userId: true}
                        }
                    }
                }
            }
        });
        return tacos.map(taco => ({
            ...taco,
            awardedOn: taco.createdAt,
            givenById: taco.createdFrom.payer.userId
        }));
    }

    async getUserTacoSummary(userId: string): Promise<{ userId: string, tacosAvailable: number }> {
        let userRecord = await this.prisma.user.findUnique({
            where: {id: userId},
            select: {
                id: true,
                allocatedTacos: true
            }
        });
        if (userRecord === null) {
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
            await db.$executeRaw`update "User"
                                 set "allocatedTacos" = "allocatedTacos" - ${request.count}
                                 where id = ${request.payerId}`;
            const payerQueryResult = await db.user.findUnique({
                where: {id: request.payerId},
                select: {allocatedTacos: true}
            });
            if (!payerQueryResult || payerQueryResult.allocatedTacos < 0) {
                throw new BadRequest("Not enough tacos!");
            }
            let payeeRecord = await db.user.findUnique({
                where: {id: request.payeeId},
                select: {
                    id: true,
                    allocatedTacos: true
                }
            });
            if (payeeRecord === null) {
                payeeRecord = await db.user.create({
                    data: {
                        id: request.payeeId,
                        allocatedTacos: 25
                    },
                    select: {
                        id: true,
                        allocatedTacos: true
                    }
                })
            }
            return await db.tacoAward.create({
                data: {
                    payer: {
                        create: {
                            user: {connect: {id: request.payerId}}
                        }
                    },
                    payee: {
                        create: {
                            user: {
                                connect: {id: payeeRecord.id}
                            }
                        }
                    },
                    createdTacos: {
                        createMany: {
                            data: Array.apply(null, Array(request.count)).map(() => ({
                                ownerId: request.payeeId
                            }))
                        }
                    }
                    ,
                    note: request.note
                },
                select: {
                    note: true,
                    id: true,
                    createdAt: true,
                    createdTacos: true,
                    payer: {select: {userId: true}},
                    payee: {select: {userId: true}},
                }
            })
        });
        return {
            ...created,
            payeeId: created.payee.userId,
            payerId: created.payer.userId,
            createdAt: created.createdAt,
            count: created.createdTacos.length
        }
    }
}