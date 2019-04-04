import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {from, Observable, throwError} from 'rxjs';
import * as profileReducer from '../store/profile.reducer';
import * as ProfileActions from '../store/profile.actions';
import {map, switchMap, catchError, tap} from 'rxjs/operators';
import {AuthService} from '../../../shared/services/auth.service';
import {ProfilesService} from '../../../shared/services/profiles.service';

@Injectable()

export class ProfileEffects {
  constructor(private actions$: Actions,
              private authService: AuthService,
              private profilesService: ProfilesService) {}

  @Effect({dispatch: false})
  registerUser$ = this.actions$.pipe(
    ofType(<string>ProfileActions.ProfileActionTypes.REGISTER_USER),
    switchMap((action: ProfileActions.RegisterUser) =>
      from(this.authService.signUp(action.payload.profile.email, action.payload.password))
        .pipe(
          map( () => action),
          catchError(err => throwError(err))
        )
    ),
    switchMap((action: ProfileActions.RegisterUser) =>
      this.profilesService.addUserProfile(action.payload.profile)
        .pipe(
          map(data => {
            console.log(action);
            console.log(data);
          })
        )
    ),
    tap(() => console.log('TAP')),
    map((data) => {
      console.log('No error was found ', data);
    })
  );

  @Effect()
  addProfile$ = this.actions$.pipe(
    ofType(<string>ProfileActions.ProfileActionTypes.ADD_PROFILE),
    switchMap((action: ProfileActions.AddProfile) =>
      this.profilesService.addUserProfile(action.payload)
        .pipe(
          map(data => data),
          catchError(err => throwError(err))
        )
    )
  );
}
