import {InfoActions, InfoActionsTypes, InfoDetails} from './info.actions';

export interface State {
  loaded: boolean;
  editedMode: boolean;
  selectedID: number;
  linkList: InfoDetails[];
}

export const initialState: State = {
  loaded: false,
  editedMode: false,
  selectedID: -1,
  linkList: []
};

export function infoReducer(state = initialState, action: InfoActions): State {
  switch (action.type) {
    case InfoActionsTypes.LOADING_INFO: {
      return {
        ...state,
        loaded: action.payload.loaded,
        linkList: action.payload.linkList
      };
    }
    case InfoActionsTypes.SAVE_INFO: {
      console.log(action.payload);
      return {
        ...state,
        linkList: {...state.linkList, ...action.payload}
      };
    }
    default: {
      return {
        ...state
      };
    }
  }
}
