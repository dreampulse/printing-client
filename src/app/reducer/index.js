import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import $app from './app';
import $modal from './modal';

const app = $app();
const modal = $modal();

const rootReducer = combineReducers({
  app,
  modal,
  routing: routerReducer
});

export default rootReducer;
