import {Taco} from "../../service/TacoService";
import {Format, Integer, Property} from "@tsed/schema";

export class TacoModel implements Taco {
    @Format("date-time")
    awardedOn: Date;
    @Property(String)
    givenById: string;
    @Integer()
    id: number;
    @Property(String)
    ownerId: string;

}