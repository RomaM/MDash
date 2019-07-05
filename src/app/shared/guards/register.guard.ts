import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {ProfilesService} from '../services/profiles.service';

@Injectable({
  providedIn: 'root'
})

export class RegisterGuard implements CanActivate {
  constructor(private router: Router, private profileService: ProfilesService) {}

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean | UrlTree {
    const currentProfile = this.profileService.profileSubject.value;
    if (currentProfile[1]['isSAdmin']) {
      return true;
    } else {
      return this.router.parseUrl('/');
    }
  }
}
