import {Action} from '@ngrx/store';

export interface InfoDetails {
  key: string;
  name: string;
  link: string;
  details?: any;
}

export enum InfoActionsTypes {
  LOAD_INFO = '[Info] Load',
  LOAD_INFO_SUCCESS = '[Info] Load Success',
  EDIT_INFO = '[Info] Edit',
  UPDATE_INFO = '[Info] Update',
  UPDATE_INFO_SUCCESS = '[Info] Update Success',
  ADD_INFO = '[Info] Add',
  ADD_INFO_SUCCESS = '[Info] Add Success',
  DELETE_INFO = '[Info] Delete',
  DELETE_INFO_SUCCESS = '[Info] Delete Success',
}

export class LoadInfo implements Action {
  readonly type = InfoActionsTypes.LOAD_INFO;
}

export class LoadInfoSuccess implements Action {
  readonly type = InfoActionsTypes.LOAD_INFO_SUCCESS;
  constructor(public payload: {loaded: boolean, linkList: InfoDetails[]}) {}
}

export class AddInfo implements Action {
  readonly type = InfoActionsTypes.ADD_INFO;
  constructor(public payload: InfoDetails) {}
}

export class AddInfoSuccess implements Action {
  readonly type = InfoActionsTypes.ADD_INFO_SUCCESS;
  constructor(public payload: InfoDetails) {}
}

export class DeleteInfo implements Action {
  readonly type = InfoActionsTypes.DELETE_INFO;
  constructor(public payload: string) {}
}

export class DeleteInfoSuccess implements Action {
  readonly type = InfoActionsTypes.DELETE_INFO_SUCCESS;
  constructor(public payload: string) {}
}

export class EditInfo implements Action {
  readonly type = InfoActionsTypes.EDIT_INFO;
  constructor(public payload: {selectedID: number, editedMode: boolean}) {}
}

export class UpdateInfo implements Action {
  readonly type = InfoActionsTypes.UPDATE_INFO;
  constructor(public payload: InfoDetails) {}
}

export class UpdateInfoSuccess implements Action {
  readonly type = InfoActionsTypes.UPDATE_INFO_SUCCESS;
  constructor(public payload: InfoDetails) {}
}

export type InfoActions =
  LoadInfo |
  LoadInfoSuccess |
  AddInfo |
  AddInfoSuccess |
  EditInfo |
  UpdateInfo |
  UpdateInfoSuccess |
  DeleteInfo |
  DeleteInfoSuccess;
