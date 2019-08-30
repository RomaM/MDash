import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {UserDetailsModel} from '../models/user-details.model';
import {BehaviorSubject, from, of} from 'rxjs';
import {switchMap, map, catchError, exhaustMap, take, takeWhile} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ProfilesService {
  constructor(private authService: AuthService, private httpClient: HttpClient) {}

  profilesDataSubject = new BehaviorSubject<any>(null);
  profileSubject = new BehaviorSubject<[string, UserDetailsModel]>(null);

  fetchUserProfiles() {
    let userEmail = '';

    return this.authService.userDataSubject.pipe(
      takeWhile(data => this.profilesDataSubject.value === null),
      // take(1),
      exhaustMap(currUser => {
        userEmail = currUser.email;
        return this.httpClient.get<any>(
          `https://funnelsdetails.firebaseio.com/users.json`,
          {
            observe: 'body',
            responseType: 'json'
          });
      }),
      map(data => {
        data = Object.entries(data);
        const profile = this.getProfileData(data, userEmail);
        this.profileSubject.next(profile);
        this.profilesDataSubject.next(data);
        // return data;
      }),
      catchError( err => of(`Profile Service: ${err}`))
    );

  }

  addUserProfile(userProfile: UserDetailsModel) {
    return this.authService.userDataSubject.pipe(
        take(1),
        exhaustMap(currUser => {
          return this.httpClient.post<any>(
            `https://funnelsdetails.firebaseio.com/users.json`,
            userProfile
          );
        }),
        map((key) => {
          const newProfiles = this.profilesDataSubject.value;
          newProfiles.push([key['name'], userProfile]);
          this.profilesDataSubject.next(newProfiles);
        }),
        catchError( err => of(`Profile Service: ${err}`))
      );
  }

  updateUserProfile(key: string, userProfile: UserDetailsModel) {
    return this.authService.userDataSubject.pipe(
      take(1),
      exhaustMap(currUser => {
        return this.httpClient.patch<any>(
          `https://funnelsdetails.firebaseio.com/users/${key}.json`,
          userProfile
        );
      }),
      map((profile) => {
        const newProfiles = this.profilesDataSubject.value;
        newProfiles.map((el) => {
          if (el[1].email === profile.email) {
            el[1] = profile;
          }
        });
      }),
      catchError( err => of(`Profile Service: ${err}`))
    );

  }

  deleteUserProfile(key: number) {
    return this.authService.userDataSubject.pipe(
      take(1),
      exhaustMap(currUser => {
        return this.httpClient.delete<any>(
          `https://funnelsdetails.firebaseio.com/users/${key}.json`
        );
      }),
      map(() => {
        let newProfiles = this.profilesDataSubject.value;
        newProfiles = newProfiles.filter(el => el[0] !== key);
        this.profilesDataSubject.next(newProfiles);
      }),
      catchError( err => of(`Profile Service: ${err}`))
    );
  }

  getProfileData(profilesList: [string, UserDetailsModel][], currentEmail: string) {
    let profile: [string, UserDetailsModel] = [null, null];
    if (currentEmail) {
      profile = profilesList.find(
        el => el[1].email === currentEmail
      );
    }
    return profile;
  }
}
