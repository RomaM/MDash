import {Action} from '@ngrx/store';

export enum ProfileActionTypes {
  LOAD_PROFILE = '[Profile] Load',
  LOADING_PROFILE = '[Profile] Loading',
  LOADING_PROFILES = '[Profile] Loading All',
  EDIT_PROFILE = '[Profile] Edit'
}

export class LoadProfile implements Action {
  readonly type = ProfileActionTypes.LOAD_PROFILE;
}

export class LoadingProfile implements Action {
  readonly type = ProfileActionTypes.LOADING_PROFILE;

  constructor(public payload: boolean) {}
}

export class LoadingProfiles implements Action {
  readonly type = ProfileActionTypes.LOADING_PROFILES;

  constructor(public payload: boolean) {}
}

export class EditProfile implements Action {
  readonly type = ProfileActionTypes.EDIT_PROFILE;

  constructor(public payload: {selectedId: number, editedMode: boolean}) {}
}

export type ProfileActions =
  LoadProfile |
  LoadingProfile |
  LoadingProfiles |
  EditProfile;
