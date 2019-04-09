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
        return data;
      })
    );
  }

  getUserPrifile(email: string) {

  }

  addUserProfile(userProfile: UserDetailsModel) {
    return this.httpClient.post<any>('https://funnelsdetails.firebaseio.com/users.json', userProfile);
  }

  profilesData(data: any, key?: string) {
    if (key) {
      const newProfiles = this.profilesDataSubject.getValue();
      newProfiles.push([key, data]);
    } else {
      this.profilesDataSubject.next(data);
    }
  }
}

