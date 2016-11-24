import fetch from '../../service/fetch';
import $http from './http';
import $auth from './auth';
import $app from './app';
import $conference from './conference';

import settings from '../../settings';
import store from '../../store';

const http = $http({fetch, store}, settings);
const auth = $auth({http});
const conference = $conference({http});
const app = $app({http});

export default {
  auth,
  conference,
  app
};
