import { combineReducers } from 'redux';
import registration from './registration';
import apiReducer from './api';

export default combineReducers({
  registration,
  apiReducer,
});
