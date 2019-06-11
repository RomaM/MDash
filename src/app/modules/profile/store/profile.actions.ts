import {Action} from '@ngrx/store';
import {UserDetailsModel} from '../../../shared/models/user-details.model';

export enum ProfileActionTypes {
  LOAD_PROFILE = '[Profile] Load',
  LOADING_PROFILE = '[Profile] Loading',
  REGISTER_USER = '[Profile] User',
  EDITED_PROFILE = '[Profile] Edited',
  ADD_PROFILE = '[Profile] Add',
  UPDATE_PROFILE = '[Profile] Update',
  DELETE_PROFILE = '[Profile] Delete'
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

  constructor(public payload: {profile: UserDetailsModel, password: string, fullName: string}) {}
}

export class AddProfile implements Action {
  readonly type = ProfileActionTypes.ADD_PROFILE;

  constructor(public payload: UserDetailsModel) {}
}

export class UpdateProfile implements Action {
  readonly type = ProfileActionTypes.UPDATE_PROFILE;

  constructor(public payload: {key: string, profile: UserDetailsModel}) {}
}

export class EditedProfile implements Action {
  readonly type = ProfileActionTypes.EDITED_PROFILE;

  constructor(public payload: {selectedId: any, editedMode: boolean}) {}
}

export class DeleteProfile implements Action {
  readonly type = ProfileActionTypes.DELETE_PROFILE;

  constructor(public payload: number) {}
}

export type ProfileActions =
  LoadProfile |
  LoadingProfile |
  RegisterUser |
  AddProfile |
  UpdateProfile |
  EditedProfile |
  DeleteProfile;
