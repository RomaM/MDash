import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {UserDetailsModel} from '../models/user-details.model';
import {from} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ProfilesService {
  constructor(private authService: AuthService, private httpClient: HttpClient) {}

  getUserProfile(email: string) {
    const token$ = from(this.authService.getToken());

    token$.pipe(
      switchMap((token) => {
        return this.httpClient.get<any>(
          `https://funnelsdetails.firebaseio.com/users/.json?auth=${token}`,
          {
            observe: 'body',
            responseType: 'json'
          });
      })
    );
  }

  addUserProfile(userProfile: UserDetailsModel) {
    return this.httpClient.post<any>('https://funnelsdetails.firebaseio.com/users.json', userProfile);
  }
}

