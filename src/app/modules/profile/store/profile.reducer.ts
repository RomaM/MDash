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
    case ProfileActions.ProfileActionTypes.LOADING_PROFILE:
      return {
        ...state,
        loadedProfile: action.payload
      };
    case ProfileActions.ProfileActionTypes.EDIT_PROFILE:
      return {
        ...state,
        editedMode: action.payload.editedMode,
        selectedId: action.payload.selectedId
      };
    default:
      return state;
  }
}
