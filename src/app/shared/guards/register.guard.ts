import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Injectable} from '@angular/core';
import {ProfilesService} from '../services/profiles.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class RegisterGuard implements CanActivate {
  constructor(private router: Router, private profileService: ProfilesService) {}

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.profileService.fetchUserProfiles().pipe(
      map(
        () => {
          const currentProfile = this.profileService.profileSubject.value;
          if (currentProfile && currentProfile[1]['isSAdmin']) {
            return true;
          } else {
            return this.router.parseUrl('/');
          }
        }
      )
    );
  }
}
