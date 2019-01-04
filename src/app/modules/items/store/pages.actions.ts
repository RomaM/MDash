import {Action} from '@ngrx/store';
import {PageDetailsModel} from '../../../shared/models/page-detail.model';

export enum PageActionTypes {
  FETCH_PAGES = '[Pages] FETCH',
  FETCH_PAGES_SUCCESS = '[Pages] FETCH SUCCESS',
  PUSH_PAGES = '[Pages] PUSH',
  SET_PAGES = '[Pages] SET',
  ADD_PAGE = '[Pages] Add',
  DELETE_PAGE = '[Pages] Delete',
  UPDATE_PAGE = '[Pages] Change',
}

export class FetchPagesAction implements Action {
  readonly type = PageActionTypes.FETCH_PAGES;
}

export class FetchSuccessAction implements Action {
  readonly type = PageActionTypes.FETCH_PAGES_SUCCESS;
}

export class PushPagesAction implements Action {
  readonly type = PageActionTypes.PUSH_PAGES;
}

export class SetPagesAction implements Action {
  readonly type = PageActionTypes.SET_PAGES;

  constructor(public payload: PageDetailsModel[]) {}
}

export class AddPageAction implements Action {
  readonly type = PageActionTypes.ADD_PAGE;

  constructor(public payload: PageDetailsModel) {}
}

export class DeletePageAction implements Action {
  readonly type = PageActionTypes.DELETE_PAGE;

  constructor(public payload: number) {}
}

export class UpdatePageAction implements Action {
  readonly type = PageActionTypes.UPDATE_PAGE;

  constructor(public payload: {id: number, page: PageDetailsModel[]}) {}
}

export type PageActions =
  FetchPagesAction |
  FetchSuccessAction |
  PushPagesAction |
  SetPagesAction |
  AddPageAction |
  DeletePageAction |
  UpdatePageAction;
