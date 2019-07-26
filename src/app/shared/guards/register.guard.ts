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

    // todo: Add ProfilesService.fetchProfiles before get profileSubject

    const currentProfile = this.profileService.profileSubject.value;
    if (currentProfile && currentProfile[1]['isSAdmin']) {
      return true;
    } else {
      console.log(`[RegisterGuard] -> Current Profile: ${currentProfile}`);
      return this.router.parseUrl('/');
    }
  }
}
