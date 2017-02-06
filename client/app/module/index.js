'use strict';

import angular from 'angular';
import routes from './module.routes';
import Auth from '../../components/auth/auth.service';



export default angular.module('enterpriseDevApp.module', ['enterpriseDevApp.auth', 'ngRoute'])
  .config(routes)
  .controller('ModuleController', ['$scope', '$http', 'Auth', '$routeParams', function($scope, $http, Auth, $routeParams) {
    var modules = {};
    var resources = {};

    var id = $routeParams.Id;

    modules.getOne = function(id) {
      return $http.get('/api/modules/' + id);
    };

    modules.getOne(id).then(function(response) {
      return $scope.module = response.data[0];
    }, function(error) {
      console.log(error);
    });
    // 
    // resources.getAll = function(id) {
    //   return $http.get('/api/modules/' + id + '/resources');
    // }
    // 
    // resources.getAll(id).then(function(response) {
    //   return $scope.resources = response.data;
    // }, function(error) {
    //   console.log(error);
    // });

  }])
  .name;
