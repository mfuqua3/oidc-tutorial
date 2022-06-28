import {readFileSync} from "fs";
import {envs} from "./envs";
import loggerConfig from "./logger";
import {JwtOptionsDefaults} from "./jwt";
const pkg = JSON.parse(readFileSync("./package.json", {encoding: "utf8"}));

export const config: Partial<TsED.Configuration> = {
  version: pkg.version,
  envs,
  logger: loggerConfig,
  jwt: JwtOptionsDefaults
  // additional shared configuration
};
