'use strict';

export default function routes($routeProvider) {
  'ngInject';

  $routeProvider.when('/modules/:Id', {
    template: require('./module.html'),
    controller: 'ModuleController',
    controllerAs: 'module',
    authenticate: true
  });
}
