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
  currentProfileSubject = new BehaviorSubject<UserDetailsModel>(null);

  fetchUserProfiles() {
    const token$ = from(this.authService.getToken());

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
        this.profilesDataSubject.next(data);
        this.getProfileData(data);
        return data;
      })
    );
  }

  addUserProfile(userProfile: UserDetailsModel) {
    const token$ = from(this.authService.getToken());

    return token$.pipe(
      switchMap(token => {
        return this.httpClient.post<any>(
          `https://funnelsdetails.firebaseio.com/users.json?auth=${token}`, userProfile
        );
      }),
      map((key) => {
        console.log(key.name);
        const newProfiles = this.profilesDataSubject.value;
        newProfiles.push([key.name, userProfile]);
        this.profilesDataSubject.next(newProfiles);
      })
    );
  }

  getProfileData(profilesList: any[]) {
    const currentEmail = this.authService.userDataSubject.value.email;
    let profile = null;
    if (currentEmail) {
      profile = profilesList.filter(
        el => el[1].email === currentEmail
      );
    }
    this.currentProfileSubject.next(profile);
    console.log('Profile: ', profile);
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

