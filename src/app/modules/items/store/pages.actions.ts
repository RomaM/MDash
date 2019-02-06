import {Action} from '@ngrx/store';
import {PageDetailsModel} from '../../../shared/models/page-detail.model';

export enum PageActionTypes {
  LOAD_PAGES = '[Pages] Load',
  LOADING_PAGES = '[Pages] Loading',
  EDITED_PAGE = '[Pages] Edited Page',
  ADD_PAGE = '[Pages] Add',
  DELETE_PAGE = '[Pages] Delete',
  UPDATE_PAGE = '[Pages] Update',
  UPDATE_TIMESTAMP = '[Pages] TIMESTAMP',
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
  constructor(public payload: number) {}
}

export class UpdatePage implements Action {
  readonly type = PageActionTypes.UPDATE_PAGE;

  constructor(public payload: {key: string, val: PageDetailsModel}) {}
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
  UpdatePage;
