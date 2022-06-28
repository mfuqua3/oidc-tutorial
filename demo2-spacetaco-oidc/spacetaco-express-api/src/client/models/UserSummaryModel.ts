import {Integer, Property} from "@tsed/schema";

export class UserSummaryModel {
    @Property(String)
    userId: string;
    @Integer()
    tacosAvailable: number;
}