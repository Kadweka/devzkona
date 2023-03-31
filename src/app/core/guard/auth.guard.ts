import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private auth:AuthService
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.auth.isAuthenticated()) {
      console.log(this.auth.isAuthenticated,'AUTHENTICATE CENTERS');
      this.router.navigateByUrl('/auth');
      return false;
    }
    console.log(this.auth.isAuthenticated,"TESTING THE VIEWS!!!!!!!111");
    return true;
}
}