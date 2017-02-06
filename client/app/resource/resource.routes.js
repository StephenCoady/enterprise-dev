'use strict';

export default function routes($routeProvider) {
  'ngInject';

  $routeProvider.when('/resources/:Id', {
    template: require('./resource.html'),
    controller: 'ResourceController',
    controllerAs: 'resource',
    authenticate: true
  });
}
