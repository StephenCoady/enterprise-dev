'use strict';

import angular from 'angular';
import {
  UtilService
} from './util.service';

export default angular.module('enterpriseDevApp.util', [])
  .factory('Util', UtilService)
  .name;
