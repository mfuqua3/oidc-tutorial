import {Configuration, registerProvider} from "@tsed/di";

export interface JwtOptions {
    audience: string;
    issuer: string;
    authority: string;
}
export const JwtOptions: unique symbol = Symbol.for("JwtOptions");
export const JwtOptionsDefaults: JwtOptions = {
    audience: process.env.JWT_AUDIENCE ??"",
    issuer: process.env.JWT_ISSUER??"",
    authority: process.env.JWT_AUTHORITY??"",
};

registerProvider<JwtOptions>({
    provide: JwtOptions,
    deps: [Configuration],
    useFactory(config: Configuration) {
        return config.get("jwt") as JwtOptions;
    },
});