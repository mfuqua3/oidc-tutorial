import {Injectable} from '@angular/core';
import {Log, User, UserManager, WebStorageStateStore} from "oidc-client";
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export default class AuthService {
  private userManager: UserManager;
  private userSubject = new BehaviorSubject<User|null>(null);
  user$: Observable<User|null> = this.userSubject.asObservable();

  constructor() {
      this.userManager = new UserManager({
        authority: environment.oidcAuthority,
        client_id: environment.oidcClientId,
        client_secret: environment.oidcClientSecret,
        loadUserInfo: true,
        automaticSilentRenew: true,
        scope: "openid email profile read:tacos",
        response_type: "code",
        userStore: new WebStorageStateStore({store: window.sessionStorage})
      });
      this.userManager.events.addUserLoaded((user) => {
        if (window.location.href.indexOf("signin-oidc") !== -1) {
          this.navigateToScreen();
        }
      });
      this.userManager.events.addSilentRenewError((e) => {
        console.log("silent renew error", e.message);
      });

      this.userManager.events.addAccessTokenExpired(() => {
        console.log("token expired");
        this.signinSilent();
      });
      this.userManager.getUser().then(user=>this.userSubject.next(user));

    // Logger
    Log.logger = console;
    Log.level = Log.DEBUG;

  }

  async signinRedirectCallback(){
    await this.userManager?.signinRedirectCallback();
  };

  parseJwt(token: string){
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  };


  signInRedirect() {
    localStorage.setItem("redirectUri", window.location.pathname);
    this.userManager?.signinRedirect({});
  };


  navigateToScreen() {
    window.location.replace("");
  };


  isAuthenticated() {
    return this.userSubject.getValue() !== null;
  };

  signinSilent() {
    this.userManager?.signinSilent()
      .then((user) => {
        console.log("signed in", user);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  signinSilentCallback() {
    return this.userManager?.signinSilentCallback();
  };

  createSigninRequest() {
    return this.userManager?.createSigninRequest();
  };

  logout() {
    this.userManager?.signoutRedirect({
      id_token_hint: localStorage.getItem("id_token")
    });
    this.userManager?.clearStaleState();
  };

  async signoutRedirectCallback() {
    this.userManager?.signoutRedirectCallback().then(() => {
      localStorage.clear();
    });
    await this.userManager?.clearStaleState();
  };
}
