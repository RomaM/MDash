import * as ProfileActions from './profile.actions';

export interface State {
  loadedProfile: boolean;
  editedMode: boolean;
  selectedId: number;
}

export const initialState: State = {
  loadedProfile: false,
  editedMode: false,
  selectedId: -1
};

export function profileReducer(state = initialState, action: ProfileActions.ProfileActions): State {
  switch (action.type) {
    case ProfileActions.ProfileActionTypes.LOADING_PROFILE: {
      return {
        ...state,
        loadedProfile: action.payload
      };
    }
    case ProfileActions.ProfileActionTypes.EDITED_PROFILE: {
      return {
        ...state,
        selectedId: action.payload.selectedId,
        editedMode: action.payload.editedMode
      };
    }
    default: {
      return state;
    }
  }
}
