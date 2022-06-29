import { Component, OnInit } from '@angular/core';
import AuthService from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html'
})
export class CallbackComponent implements OnInit {

  constructor(private readonly authService: AuthService, private readonly router: Router) { }

  ngOnInit(): void {
    this.authService.signinRedirectCallback()
      .then(()=>this.router.navigate([''],{replaceUrl: true}));
  }

}
