import {Component} from '@angular/core';
import {ClrLoadingState} from "@clr/angular";
import AuthService from "../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginButtonState: ClrLoadingState = ClrLoadingState.DEFAULT;

  constructor(private readonly authService: AuthService) {
  }

  async login() {
    this.loginButtonState = ClrLoadingState.LOADING;
    try {
      await this.authService.signInRedirect();
    } finally {
      this.loginButtonState = ClrLoadingState.DEFAULT;
    }
  }

}
