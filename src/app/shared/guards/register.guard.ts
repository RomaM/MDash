import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Injectable} from '@angular/core';
import {ProfilesService} from '../services/profiles.service';

@Injectable({
  providedIn: 'root'
})

export class RegisterGuard implements CanActivate {
  constructor(private router: Router, private profileService: ProfilesService) {}

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean | UrlTree {
    if (this.profileService.currentProfileSubject) {
      return true;
    } else {
      return this.router.parseUrl('/auth');
    }
  }
}
