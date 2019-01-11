import * as PageActions from './pages.actions';

export interface State {
  loaded: boolean;
  selected: number;
  timestamp: number;
}

export const initialState: State = {
  loaded: false,
  selected: -1,
  timestamp: 1
};

export function pagesReducer(state = initialState, action: PageActions.PageActions): State {
  switch (action.type) {
    case PageActions.PageActionTypes.LOADING_PAGES: {
      return {
        ...state,
        loaded: action.payload
      };
    }
    case PageActions.PageActionTypes.ADD_PAGE: {
      return {
        ...state
      };
    }
    default: {
      return state;
    }
  }
}
