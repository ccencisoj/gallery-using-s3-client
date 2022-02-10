import { createStore, applyMiddleware } from 'redux';
import progressfy from './progressfy';
import promise from 'redux-promise-middleware';
import reducer from './reducer';
import thunk from 'redux-thunk';

const store = createStore(
  reducer, applyMiddleware(thunk, progressfy, promise));

export default store;