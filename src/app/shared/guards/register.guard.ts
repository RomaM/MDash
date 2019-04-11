import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class RegisterGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean | UrlTree {
    const currentProfile = this.authService.userDataSubject.value;
    if (currentProfile.isSAdmin) {
      return true;
    } else {
      return this.router.parseUrl('/auth');
    }
  }
}
