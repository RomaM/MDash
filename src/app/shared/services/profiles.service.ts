import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {UserDetailsModel} from '../models/user-details.model';
import {BehaviorSubject, from, Observable, of, throwError} from 'rxjs';
import {
  switchMap,
  map,
  catchError,
  exhaustMap,
  take,
  takeWhile,
  skipWhile,
  distinctUntilChanged,
  tap, shareReplay
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ProfilesService {
  constructor(private authService: AuthService, private httpClient: HttpClient) {}

  profilesDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  profileSubject: (BehaviorSubject<[string, UserDetailsModel]> | any)
    = new BehaviorSubject<[string, UserDetailsModel]>(null);

  getAsyncStringForTest() {
    return new Promise<string>((res, rej) => {
      setTimeout(() => {
        res('ASD');
      }, 2000);
    });
  }

  setCurrentProfile() {
    let profile = this.authService.userDataSubject.value;

    profile = this.getProfileData(this.profilesDataSubject.value, profile['email']);
    this.profileSubject.next(profile);
  }

  fetchUserProfiles(): Observable<any> {
    return this.httpClient.get<any>(
      `https://funnelsdetails.firebaseio.com/users.json`,
      {
        observe: 'body',
        responseType: 'json'
      })
      .pipe(
        map(data => {
          data = Object.entries(data);
          this.profilesDataSubject.next(data);
          console.log(this.profilesDataSubject.value);
          this.setCurrentProfile();
        }),
        catchError( err => throwError(`Profile Service: ${err}`))
      );
  }

  addUserProfile(userProfile: UserDetailsModel) {
    return this.httpClient.post<any>(
      `https://funnelsdetails.firebaseio.com/users.json`,
      userProfile
    ).pipe(
        map((key) => {
          const newProfiles = this.profilesDataSubject.value;
          newProfiles.push([key['name'], userProfile]);
          this.profilesDataSubject.next(newProfiles);
        }),
        catchError( err => of(`Profile Service: ${err}`))
      );
  }

  updateUserProfile(key: string, userProfile: UserDetailsModel) {
    return this.httpClient.patch<any>(
      `https://funnelsdetails.firebaseio.com/users/${key}.json`,
      userProfile
    ).pipe(
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
    return this.httpClient.delete<any>(
      `https://funnelsdetails.firebaseio.com/users/${key}.json`
    ).pipe(
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
