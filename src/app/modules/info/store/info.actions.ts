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
  EDITED_INFO = '[Info] Edited',
  ADD_INFO = '[Info] Add',
  ADD_INFO_SUCCESS = '[Info] Add Success',
  DELETE_INFO = '[Info] Delete',
  DELETE_INFO_SUCCESS = '[Info] Delete Success',
  UPDATE_INFO = '[Info] Update',
}

export class LoadInfo implements Action {
  readonly type = InfoActionsTypes.LOAD_INFO;
}

export class LoadInfoSuccess implements Action {
  readonly type = InfoActionsTypes.LOAD_INFO_SUCCESS;
  constructor(public payload: {loaded: boolean, linkList: InfoDetails[]}) {}
}

export class EditedInfo implements Action {
  readonly type = InfoActionsTypes.EDITED_INFO;
  constructor(public payload: {selectedID: number, editedMode: boolean}) {}
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

export class UpdateInfo implements Action {
  readonly type = InfoActionsTypes.UPDATE_INFO;
  constructor(public payload: {selectedID: number, infoDetails: InfoDetails}) {}
}

export type InfoActions =
  LoadInfo |
  LoadInfoSuccess |
  AddInfo |
  AddInfoSuccess |
  EditedInfo |
  DeleteInfo |
  DeleteInfoSuccess |
  UpdateInfo;
