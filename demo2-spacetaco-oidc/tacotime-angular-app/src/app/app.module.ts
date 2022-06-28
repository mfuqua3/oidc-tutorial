import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {ClarityModule} from "@clr/angular";
import {AuthModule} from "./auth/auth.module";
import {TacoTimeModule} from "./tacotime/taco-time.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ClarityModule,
    AuthModule,
    TacoTimeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
