import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClarityModule} from "@clr/angular";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ClarityModule,
    BrowserAnimationsModule
  ],
  exports: [
    ClarityModule,
    BrowserAnimationsModule
  ]
})
export class SharedModule { }
