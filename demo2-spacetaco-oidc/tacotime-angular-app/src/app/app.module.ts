import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AuthModule} from "./auth/auth.module";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./auth/login/login.component";
import {CallbackComponent} from "./auth/callback/callback.component";
import {HomeComponent} from './home/home.component';
import {TacoWatchComponent} from "./tacowatch/taco-watch.component";
import {AuthorizeGuard} from "./auth/authorize.guard";
import {HttpClientModule} from "@angular/common/http";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: "login", component: LoginComponent},
  {path: "signin-oidc", component: CallbackComponent},
  {path: "tacos", component: TacoWatchComponent, canActivate: [AuthorizeGuard]},
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TacoWatchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AuthModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
