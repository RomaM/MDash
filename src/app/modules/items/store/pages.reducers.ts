import * as PageActions from './pages.actions';
import {PageDetailsModel} from '../../../shared/models/page-detail.model';

export interface State {
  pages: PageDetailsModel[];
  selected: number;
  loaded: boolean;
}

export const initialState: State = {
  pages: [],
  selected: -1,
  loaded: false
};

export function pagesReducer(state = initialState, action: PageActions.PageActions): State {
  switch (action.type) {
    case PageActions.PageActionTypes.SET_PAGES:
      return {
        ...state,
        pages: action.payload
      };
      case PageActions.PageActionTypes.FETCH_PAGES_SUCCESS:
      return {
        ...state,
        loaded: true
      };
    case PageActions.PageActionTypes.ADD_PAGE: {
      return {
        ...state,
        pages: [...state.pages, action.payload]
      };
    }
    default: {
      return state;
    }
  }
}
