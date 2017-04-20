'use strict';

import 'jquery';
import 'jquery-ui';
import angular from 'angular';
// import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';
import 'angular-ui-sortable';
import angularFileUpload from 'angular-file-upload';

const ngRoute = require('angular-route');

import uiBootstrap from 'angular-ui-bootstrap';
// import ngMessages from 'angular-messages';
// import ngValidationMatch from 'angular-validation-match';

import {
  routeConfig
} from './app.config';

import _Auth from '../components/auth/auth.module';
import account from './account';
import admin from './admin';
import home from './home';
import module from './module';
import resource from './resource';
import resources from './resources';
import navbar from '../components/navbar/navbar.component';
import footer from '../components/footer/footer.component';
import main from './main/main.component';
import constants from './app.constants';
import util from '../components/util/util.module';

import './app.css';

angular.module('enterpriseDevApp', [ngCookies, ngResource, ngSanitize, ngRoute, uiBootstrap, _Auth,
  account, admin, navbar, footer, main, constants, util, home, module, resource, resources, 'ui.sortable', 'angularFileUpload'])
  .config(routeConfig)
  .run(function($rootScope, $location, Auth) {
    'ngInject';
    // Redirect to login if route requires auth and you're not logged in

    $rootScope.$on('$stateChangeStart', function(event, next) {
      Auth.isLoggedIn(function(loggedIn) {
        if(next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  });

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['enterpriseDevApp'], {
      strictDi: true
    });
  });
