'use strict';

import angular from 'angular';
import routes from './resources.routes';
import Auth from '../../components/auth/auth.service';



export default angular.module('enterpriseDevApp.resources', ['enterpriseDevApp.auth', 'ngRoute'])
  .config(routes)
  .controller('ResourcesController', ['$scope', '$http', 'Auth', '$routeParams', '$route', function($scope, $http, Auth, $routeParams, $route) {
    var resources = {};

    var id = $routeParams.Id;
    var user_id;

    resources.getAll = function(id) {
      return $http.get('/api/resources/user/' + id);
    };
    
    resources.create = function(resource){
      return $http.post('/api/resources/', resource);
    };
    
    $scope.createResource = function(resource){
      resource.createdBy = user_id;
      resources.create(resource)
      .then(function(){
        $route.reload();
      });
    };

    
    Auth.getCurrentUser().then(function(user){
      user_id = user._id;
    }).then(function(){
      resources.getAll(user_id).then(function(response) {
        $scope.resources = response.data;
      }, function(error) {
        console.log(error);
      });
    });

  }])
  .name;
