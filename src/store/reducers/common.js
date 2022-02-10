import agent from 'agent';
import {
  LOAD_APP,
  SET_CURRENT_USER,
  LOAD_PROFILE_FULFILLED,
} from 'constants/actionTypes';

const initialState = {
  profile: null,
  currnetUser: null
};

export default (state=initialState, action)=> {
  switch (action.type) {
    case LOAD_APP:
      return {
        ...state, 
        currentUser: action.payload ? 
        action.payload.user : null
      }

    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload
      }

    case LOAD_PROFILE_FULFILLED: 
      return {
        ...state,
        profile: action.payload.profile
      }
  
    default:
      return state;
  }
}