import * as PageActions from './pages.actions';
import {PageDetailsModel} from '../../../shared/models/page-detail.model';

export interface State {
  loaded: boolean;
  editedMode: boolean;
  selectedID: number;
  timestamp: string;
}

export const initialState: State = {
  loaded: false,
  editedMode: false,
  selectedID: -1,
  timestamp: ''
};

export function pagesReducer(state = initialState, action: PageActions.PageActions): State {
  switch (action.type) {
    case PageActions.PageActionTypes.LOADING_PAGES: {
      return {
        ...state,
        loaded: action.payload
      };
    }
    case PageActions.PageActionTypes.EDITED_PAGE: {
      return {
        ...state,
        selectedID: action.payload.selectedID,
        editedMode: action.payload.editedMode
      };
    }
    case PageActions.PageActionTypes.SET_TIMESTAMP: {
      return {
        ...state,
        timestamp: action.payload
      };
    }
    default: {
      return state;
    }
  }
}
