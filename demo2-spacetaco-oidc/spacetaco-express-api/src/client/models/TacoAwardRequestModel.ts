import {GiveTacoRequest} from "../../service/TacoService";
import {Ignore, Integer, Min, Property, Required} from "@tsed/schema";

export class TacoAwardRequestModel implements GiveTacoRequest {
    @Required()
    @Min(1)
    @Integer()
    count: number;
    @Required()
    @Property(String)
    note: string;
    @Required()
    @Property(String)
    payeeId: string;
    @Ignore()
    payerId: string;

}