import {OnDestroy, OnInit, Service} from "@tsed/di";
import {PrismaClient} from "@prisma/client";

@Service()
export class PrismaAccess extends PrismaClient implements OnInit, OnDestroy {
    constructor() {
        super();
    }

    async $onDestroy(): Promise<void> {
        this.$disconnect();
    }

    async $onInit(): Promise<void> {
        this.$connect()
    }
}