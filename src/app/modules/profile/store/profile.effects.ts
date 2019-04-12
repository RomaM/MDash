import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Router} from '@angular/router';
import {from, Observable, throwError} from 'rxjs';
import * as profileReducer from '../store/profile.reducer';
import * as ProfileActions from '../store/profile.actions';
import {map, switchMap, catchError, tap} from 'rxjs/operators';
import {AuthService} from '../../../shared/services/auth.service';
import {ProfilesService} from '../../../shared/services/profiles.service';

@Injectable()

export class ProfileEffects {
  constructor(private actions$: Actions,
              private router: Router,
              private authService: AuthService,
              private profilesService: ProfilesService) {}

  @Effect()
  fetchProfiles$ = this.actions$.pipe(
    ofType(<string>ProfileActions.ProfileActionTypes.LOAD_PROFILE),
    switchMap(() =>
      this.profilesService.fetchUserProfiles()
        .pipe(
          map(() => {
            return new ProfileActions.LoadingProfile(true);
          }),
          catchError( err => throwError(err))
        )
    )
  );

  @Effect()
  registerUser$ = this.actions$.pipe(
    ofType(<string>ProfileActions.ProfileActionTypes.REGISTER_USER),
    switchMap((action: ProfileActions.RegisterUser) =>
      from(this.authService.signUp(action.payload.profile.email, action.payload.password))
        .pipe(
          map( () => {
            return new ProfileActions.AddProfile(action.payload.profile);
          }),
          catchError(err => throwError(err))
        )
    ),
    tap(() => this.router.navigate(['/profile']))
  );

  @Effect({dispatch: false})
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

  @Effect()
  updateProfile$ = this.actions$.pipe(
    ofType(<string>ProfileActions.ProfileActionTypes.UPDATE_PROFILE),
    switchMap((action: ProfileActions.UpdateProfile) =>
      this.profilesService.updateUserProfile(action.payload.key, action.payload.profile)
        .pipe(
          map(data => {
            return new ProfileActions.EditedProfile({selectedId: null, editedMode: false});
          }),
          catchError(err => throwError(err))
        )
    ),
    tap(() => this.router.navigate(['/profile']))
  );
}
