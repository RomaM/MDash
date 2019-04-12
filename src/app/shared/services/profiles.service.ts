import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {UserDetailsModel} from '../models/user-details.model';
import {BehaviorSubject, from} from 'rxjs';
import {switchMap, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ProfilesService {
  constructor(private authService: AuthService, private httpClient: HttpClient) {}

  profilesDataSubject = new BehaviorSubject<any>(null);
  profileSubject = new BehaviorSubject<[string, UserDetailsModel]>(null);

  fetchUserProfiles() {
    const token$ = from(this.authService.getToken());
    const user = this.authService.userDataSubject.value;

    return token$.pipe(
      switchMap((token) => {
        return this.httpClient.get<any>(
          `https://funnelsdetails.firebaseio.com/users.json?auth=${token}`,
          {
            observe: 'body',
            responseType: 'json'
          });
      }),
      map(data => {
        data = Object.entries(data);
        const profile = this.getProfileData(data, user.email);
        this.profileSubject.next(profile);
        this.profilesDataSubject.next(data);
        // return data;
      })
    );
  }

  addUserProfile(userProfile: UserDetailsModel) {
    const token$ = from(this.authService.getToken());

    return token$.pipe(
      switchMap(token => {
        return this.httpClient.post<any>(
          `https://funnelsdetails.firebaseio.com/users.json?auth=${token}`,
          userProfile
        );
      }),
      map((key) => {
        const newProfiles = this.profilesDataSubject.value;
        newProfiles.push([key.name, userProfile]);
        this.profilesDataSubject.next(newProfiles);
      })
    );
  }

  updateUserProfile(key: string, userProfile: UserDetailsModel) {
    const token$ = from(this.authService.getToken());

    return token$.pipe(
      switchMap(token => {
        return this.httpClient.patch<any>(
          `https://funnelsdetails.firebaseio.com/users/${key}.json?auth=${token}`,
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
      })
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

  // profilesData(data: any, key?: string) {
  //   if (key) {
  //     const newProfiles = this.profilesDataSubject.getValue();
  //     newProfiles.push([key, data]);
  //     this.profilesDataSubject.next(newProfiles);
  //   } else {
  //     this.profilesDataSubject.next(data);
  //
  //     console.log(data)
  //     this.profileSubject.next(null);
  //   }
  // }
}

