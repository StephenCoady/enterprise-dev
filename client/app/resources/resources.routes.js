'use strict';

export default function routes($routeProvider) {
  'ngInject';

  $routeProvider.when('/resources', {
    template: require('./resources.html'),
    controller: 'ResourcesController',
    controllerAs: 'resources',
    authenticate: true
  });
}
