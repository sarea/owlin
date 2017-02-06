/* global moment:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import owlinMain from './components/main';
import owlinAuth from './components/auth';


angular.module('owlin', [
  // 'ngAnimate',
  // 'ngCookies',
  // 'ngTouch',
  //'ngSanitize',
  //'ngMessages',
  //'ngAria',
  'ui.router',
  'ui.bootstrap',
  'toastr',
  'satellizer',
  owlinMain,
  owlinAuth
  ])
  .constant('API_URL', 'http://localhost:5000/')
  .constant('moment', moment)
  .config(config)
  .config(routerConfig)
  .run(runBlock)
