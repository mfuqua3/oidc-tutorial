import {join} from "path";
import {Configuration, Inject} from "@tsed/di";
import {PlatformApplication} from "@tsed/common";
import "@tsed/platform-express"; // /!\ keep this import
import bodyParser from "body-parser";
import compress from "compression";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";
import cors from "cors";
import "@tsed/ajv";
import {config} from "../utils/config";
import * as api from "./controllers";
import {ClaimsPrincipal} from "../utils/claims";
import AuthorizationModule from "./authorization";
import {JwtProtocol} from "./protocols/JwtProtocol";

@Configuration({
  ...config,
  acceptMimes: ["application/json"],
  httpPort: process.env.PORT || 8083,
  httpsPort: false, // CHANGE
  componentsScan: false,
  passport: {
    disableSession: true,
    userInfoModel: ClaimsPrincipal,
  },
  authentication: {
    protocols: ["jwt"],
  },
  imports: [AuthorizationModule, JwtProtocol],
  mount: {
    "/api": [
      ...Object.values(api)
    ]
  },
  middlewares: [
    cors({
      origin: (origin,cb)=>{return cb(null,true)}
    }),
    cookieParser(),
    compress({}),
    methodOverride(),
    bodyParser.json(),
    bodyParser.urlencoded({
      extended: true
    }),
  ],
  views: {
    root: join(process.cwd(), "../views"),
    extensions: {
      ejs: "ejs"
    }
  },
  exclude: [
    "**/*.spec.ts"
  ]
})
export class Server {
  @Inject()
  protected app: PlatformApplication;

  @Configuration()
  protected settings: Configuration;
}
