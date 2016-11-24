import {routerActions} from 'react-router-redux';

import TYPE from '../type';

import $modal from './modal';

const modal = $modal({});

export default {
  modal,
  routerActions,
  foo: {
    bar: () => ({type: TYPE.APP.FOO_ACTION})
  }
};
