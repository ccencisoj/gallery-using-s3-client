import { combineReducers } from 'redux';
import commonReducer from 'store/reducers/common';
import postListReducer from 'store/reducers/postList';

export default combineReducers({
  postList: postListReducer,
  common: commonReducer
});