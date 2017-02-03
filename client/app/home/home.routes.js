'use strict';

export default function routes($routeProvider) {
  'ngInject';

  $routeProvider.when('/home', {
    template: require('./home.html'),
    controller: 'HomeController',
    controllerAs: 'home',
    authenticate: true
  });
}
