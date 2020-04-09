import { combineReducers } from 'redux';
import registration from './registration';
import apiReducer from './api';
import dashboardReducer from './dashboard';

export default combineReducers({
  registration,
  apiReducer,
  dashboardReducer,
});
