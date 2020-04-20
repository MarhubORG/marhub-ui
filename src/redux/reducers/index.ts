import { combineReducers } from 'redux';
import registration from './registration';
import apiReducer from './api';
import dashboardReducer from './dashboard';
import userReducer from './users';

export default combineReducers({
  registration,
  apiReducer,
  dashboardReducer,
  userReducer,
});
