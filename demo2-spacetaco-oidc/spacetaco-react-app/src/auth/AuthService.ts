import { IDENTITY_CONFIG, METADATA_OIDC } from "../utils";
import { UserManager, WebStorageStateStore, Log } from "oidc-client";

export interface IAuthService {
    signinRedirectCallback: () => void;
    getUser: () => Promise<any>;
    parseJwt: (token: string) => any;
    signInRedirect: () => void;
    navigateToScreen: () => void;
    isAuthenticated: () => boolean;
    signinSilent: () => void;
    signinSilentCallback: () => void;
    createSigninRequest: () => any;
    logout: () => void;
    signoutRedirectCallback: () => void;
}

export default class AuthService implements IAuthService {
    UserManager;

    constructor() {
        console.log(process.env.REACT_APP_ISSUER);
        this.UserManager = new UserManager({
            ...IDENTITY_CONFIG,
            response_type: "code",
            userStore: new WebStorageStateStore({ store: window.sessionStorage }),
            metadata: {
                ...METADATA_OIDC,
                issuer: "https://localhost:7113/"
            }
        });
        // Logger
        Log.logger = console;
        Log.level = Log.DEBUG;
        this.UserManager.events.addUserLoaded((user) => {
            if (window.location.href.indexOf("signin-oidc") !== -1) {
                this.navigateToScreen();
            }
        });
        this.UserManager.events.addSilentRenewError((e) => {
            console.log("silent renew error", e.message);
        });

        this.UserManager.events.addAccessTokenExpired(() => {
            console.log("token expired");
            this.signinSilent();
        });
    }

    signinRedirectCallback = () => {
        this.UserManager.signinRedirectCallback().then(() => {
            "";
        });
    };


    getUser = async () => {
        const user = await this.UserManager.getUser();
        if (!user) {
            return await this.UserManager.signinRedirectCallback();
        }
        return user;
    };

    parseJwt = (token: string) => {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace("-", "+").replace("_", "/");
        return JSON.parse(window.atob(base64));
    };


    signInRedirect = () => {
        localStorage.setItem("redirectUri", window.location.pathname);
        this.UserManager.signinRedirect({});
    };


    navigateToScreen = () => {
        window.location.replace("/en/dashboard");
    };


    isAuthenticated = () => {
        const oidcStorage = JSON.parse(sessionStorage.getItem(`oidc.user:${process.env.REACT_APP_AUTHORITY ?? ""}:${process.env.REACT_APP_CLIENT_ID ?? ""}`) ?? "")

        return (!!oidcStorage && !!oidcStorage.access_token)
    };

    signinSilent = () => {
        this.UserManager.signinSilent()
            .then((user) => {
                console.log("signed in", user);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    signinSilentCallback = () => {
        this.UserManager.signinSilentCallback();
    };

    createSigninRequest = () => {
        return this.UserManager.createSigninRequest();
    };

    logout = () => {
        this.UserManager.signoutRedirect({
            id_token_hint: localStorage.getItem("id_token")
        });
        this.UserManager.clearStaleState();
    };

    signoutRedirectCallback = () => {
        this.UserManager.signoutRedirectCallback().then(() => {
            localStorage.clear();
            window.location.replace(process.env.REACT_APP_AUTHORITY ?? "");
        });
        this.UserManager.clearStaleState();
    };
}