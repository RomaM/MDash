import {Action} from '@ngrx/store';
import {PageDetailsModel} from '../../../shared/models/page-detail.model';

export enum PageActionTypes {
  LOAD_PAGES = '[Pages] Load',
  LOADING_PAGES = '[Pages] Loading',
  EDITED_PAGE = '[Pages] Edited Page',
  ADD_PAGE = '[Pages] Add',
  DELETE_PAGE = '[Pages] Delete',
  UPDATE_PAGE = '[Pages] Update',
  SET_TIMESTAMP = '[Pages] Set Timestamp',
  GET_TIMESTAMP = '[Pages] Get Timestamp',
  UPDATE_TIMESTAMP = '[Pages] Update Timestamp',
}

export class LoadPages implements Action {
  readonly type = PageActionTypes.LOAD_PAGES;
}

export class LoadingPages implements Action {
  readonly type = PageActionTypes.LOADING_PAGES;
  constructor(public payload: boolean) {}
}

export class EditedPage implements Action {
  readonly type = PageActionTypes.EDITED_PAGE;
  constructor(public payload: {selectedID: number, editedMode: boolean}) {}
}

export class AddPage implements Action {
  readonly type = PageActionTypes.ADD_PAGE;
  constructor(public payload: PageDetailsModel) {}
}

export class DeletePage implements Action {
  readonly type = PageActionTypes.DELETE_PAGE;
  constructor(public payload: any) {}
}

export class UpdatePage implements Action {
  readonly type = PageActionTypes.UPDATE_PAGE;

  constructor(public payload: {key: string, val: PageDetailsModel}) {}
}

export class SetTimestamp implements Action {
  readonly type = PageActionTypes.SET_TIMESTAMP;

  constructor(public payload: string) {}
}

export class GetTimestamp implements Action {
  readonly type = PageActionTypes.GET_TIMESTAMP;
}

export class UpdateTimestamp implements Action {
  readonly type = PageActionTypes.UPDATE_TIMESTAMP;

  constructor(public payload: string) {}
}

export type PageActions =
  LoadPages |
  LoadingPages |
  EditedPage |
  AddPage |
  DeletePage |
  UpdatePage |
  GetTimestamp |
  SetTimestamp |
  UpdateTimestamp;
