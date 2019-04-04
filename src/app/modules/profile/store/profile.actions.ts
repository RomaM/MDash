import {Action} from '@ngrx/store';
import {UserDetailsModel} from '../../../shared/models/user-details.model';

export enum ProfileActionTypes {
  LOAD_PROFILE = '[Profile] Load',
  LOADING_PROFILE = '[Profile] Loading',
  EDIT_PROFILE = '[Profile] Edit',
  ADD_PROFILE = '[Profile] Add',
  REGISTER_USER = '[Profile] User',
}

export class LoadProfile implements Action {
  readonly type = ProfileActionTypes.LOAD_PROFILE;
}

export class LoadingProfile implements Action {
  readonly type = ProfileActionTypes.LOADING_PROFILE;

  constructor(public payload: boolean) {}
}

export class RegisterUser implements Action {
  readonly type = ProfileActionTypes.REGISTER_USER;

  constructor(public payload: {profile: UserDetailsModel, password: string}) {}
}

export class AddProfile implements Action {
  readonly type = ProfileActionTypes.ADD_PROFILE;

  constructor(public payload: UserDetailsModel) {}
}

export class EditProfile implements Action {
  readonly type = ProfileActionTypes.EDIT_PROFILE;

  constructor(public payload: {selectedId: number, editedMode: boolean}) {}
}

export type ProfileActions =
  LoadProfile |
  LoadingProfile |
  AddProfile |
  EditProfile |
  RegisterUser;
