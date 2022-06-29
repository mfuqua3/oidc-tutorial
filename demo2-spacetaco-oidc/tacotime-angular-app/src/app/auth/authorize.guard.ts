import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router'
import AuthService from "./auth.service";


@Injectable({
  providedIn: 'root'
})
export class AuthorizeGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router) {
  }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    console.log(route);
    const authorized = await this.authService.isAuthenticated();
    if (authorized) {
      return true;
    }
    return await this.router.navigate(['login']);
  }
}
