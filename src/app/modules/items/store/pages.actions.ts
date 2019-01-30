import {Action} from '@ngrx/store';
import {PageDetailsModel} from '../../../shared/models/page-detail.model';

export enum PageActionTypes {
  LOADING_PAGES = '[Pages] Loading',
  EDITED_PAGE = '[Pages] Edited Page',
  EDITED_MODE = '[Pages] Edited Mode',
  ADD_PAGE = '[Pages] Add',
  DELETE_PAGE = '[Pages] Delete',
  UPDATE_PAGE = '[Pages] Update',
}

export class LoadingPagesAction implements Action {
  readonly type = PageActionTypes.LOADING_PAGES;
  constructor(public payload: boolean) {}
}

export class EditedPagesAction implements Action {
  readonly type = PageActionTypes.EDITED_PAGE;
  constructor(public payload: {selected: string}) {}
}

export class EditedModeAction implements Action {
  readonly type = PageActionTypes.EDITED_MODE;
  constructor(public payload: {edited: boolean}) {}
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
  LoadingPagesAction |
  EditedPagesAction |
  EditedModeAction |
  AddPageAction |
  DeletePageAction |
  UpdatePageAction;
