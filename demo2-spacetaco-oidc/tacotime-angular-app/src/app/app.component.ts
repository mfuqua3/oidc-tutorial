import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import AuthService from "./auth/auth.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent{
  title = 'Taco Time!';
  initializing: Observable<boolean>;

  constructor(authService : AuthService, private readonly router: Router) {
    this.initializing = authService.initializing$;
  }
}
