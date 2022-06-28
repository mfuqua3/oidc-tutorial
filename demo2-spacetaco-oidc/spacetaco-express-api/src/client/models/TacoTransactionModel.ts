import {TacoTransactionRecord} from "../../service/TacoService";
import {Format, Integer, Property} from "@tsed/schema";

export class TacoTransactionModel implements TacoTransactionRecord {
    @Integer()
    count: number;
    @Format("date-time")
    createdAt: Date;
    @Integer()
    id: number;
    @Property(String)
    note: string;
    @Property(String)
    payeeId: string;
    @Property(String)
    payerId: string;

}