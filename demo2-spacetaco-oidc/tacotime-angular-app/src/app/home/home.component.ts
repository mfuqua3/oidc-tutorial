import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import AuthService from "../auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {

  constructor(authService : AuthService, private readonly router: Router) {
    authService.initializing$.subscribe((init)=>{
          router.navigate(["tacos"]);
    });
  }

}
