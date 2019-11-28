import {Action} from '@ngrx/store';

export interface InfoDetails {
  key: string;
  name: string;
  link: string;
  details?: any;
}

export enum InfoActionsTypes {
  LOAD_INFO = '[Info] Load',
  LOADING_INFO = '[Info] Loading',
  EDITED_INFO = '[Info] Edited',
  ADD_INFO = '[Info] Add',
  SAVE_INFO = '[Info] Save',
  DELETE_INFO = '[Info] Delete',
  UPDATE_INFO = '[Info] Update',
}

export class LoadInfo implements Action {
  readonly type = InfoActionsTypes.LOAD_INFO;
}

export class LoadingInfo implements Action {
  readonly type = InfoActionsTypes.LOADING_INFO;
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

export class SaveInfo implements Action {
  readonly type = InfoActionsTypes.SAVE_INFO;
  constructor(public payload: InfoDetails) {}
}

export class DeleteInfo implements Action {
  readonly type = InfoActionsTypes.DELETE_INFO;
  constructor(public payload: number) {}
}

export class UpdateInfo implements Action {
  readonly type = InfoActionsTypes.UPDATE_INFO;
  constructor(public payload: {selectedID: number, infoDetails: InfoDetails}) {}
}

export type InfoActions =
  LoadInfo |
  LoadingInfo |
  AddInfo |
  SaveInfo |
  EditedInfo |
  DeleteInfo |
  UpdateInfo;
