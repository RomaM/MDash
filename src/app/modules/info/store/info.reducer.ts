import {InfoActions, InfoActionsTypes, InfoDetails} from './info.actions';
import {act} from '@ngrx/effects';

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
    case InfoActionsTypes.LOAD_INFO_SUCCESS: {
      return {
        ...state,
        loaded: action.payload.loaded,
        linkList: action.payload.linkList
      };
    }
    case InfoActionsTypes.ADD_INFO_SUCCESS: {
      return {
        ...state,
        linkList: [...state.linkList, action.payload]
      };
    }
    case InfoActionsTypes.DELETE_INFO_SUCCESS: {
      let newList = [...state.linkList];
      newList = newList.filter(elem => elem.key !== action.payload);
      return {
        ...state,
        linkList: [...newList]
      };
    }
    case InfoActionsTypes.UPDATE_INFO_SUCCESS: {
      let newList = [...state.linkList];
      newList = newList.map(elem => {
        if (elem.key === action.payload.key) { elem = action.payload; }
        return elem;
      });
      return {
        ...state,
        linkList: [...newList]
      };
    }
    case InfoActionsTypes.EDIT_INFO: {
      return {
        ...state,
        editedMode: action.payload.editedMode,
        selectedID: action.payload.selectedID
      };
    }
    default: {
      return {
        ...state
      };
    }
  }
}
