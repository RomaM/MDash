import * as PageActions from './pages.actions';

export interface State {
  loaded: boolean;
  edited: boolean;
  selected: {};
  timestamp: number;
}

export const initialState: State = {
  loaded: false,
  edited: false,
  selected: {},
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
    case PageActions.PageActionTypes.EDITED_PAGE: {
      return {
        ...state,
        selected: action.payload.selected,
        edited: action.payload.edited
      };
    }
    default: {
      return state;
    }
  }
}
