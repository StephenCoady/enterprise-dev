'use strict';

import angular from 'angular';
import routes from './resource.routes';
import Auth from '../../components/auth/auth.service';



export default angular.module('enterpriseDevApp.resource', ['enterpriseDevApp.auth', 'ngRoute'])
  .config(routes)
  .controller('ResourceController', ['$scope', '$http', 'Auth', '$routeParams', function($scope, $http, Auth, $routeParams) {
    var resources = {};

    var id = $routeParams.Id;

    resources.getOne = function(id) {
      return $http.get('/api/resources/' + id);
    };


    resources.getOne(id).then(function(response) {
      return $scope.resource = response.data[0];
    }, function(error) {
      console.log(error);
    });

  }])
  .name;
