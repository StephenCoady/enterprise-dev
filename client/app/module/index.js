'use strict';

import angular from 'angular';
import routes from './module.routes';
import Auth from '../../components/auth/auth.service';



export default angular.module('enterpriseDevApp.module', ['enterpriseDevApp.auth', 'ngRoute'])
  .config(routes)
  .controller('ModuleController', ['$scope', '$http', 'Auth', '$routeParams', function($scope, $http, Auth, $routeParams) {
    var modules = {};
    var resources = {};
    var dummyResources = [];
    $scope.resources = [];
    var user_id;

    var id = $routeParams.Id;

    modules.getOne = function(id) {
      return $http.get('/api/modules/' + id);
    };

    modules.getOne(id).then(function(response) {
      return $scope.module = response.data[0];
    }, function(error) {
      console.log(error);
    });
    
    resources.getAll = function(id) {
      return $http.get('/api/resources/user/' + id);
    }
    
    resources.getOne = function(id) {
      return $http.get('/api/resources/' + id);
    }
    
    Auth.getCurrentUser().then(function(user){
      user_id = user._id;
    }).then(function(){
      resources.getAll(user_id).then(function(response) {
        var allResources = response.data;
        var moduleResources = $scope.module.resources;
        
        for (var i = 0; i < moduleResources.length; i++) {
          for (var j = 0; j < allResources.length; j++) {
            if (moduleResources[i].id === allResources[j]._id){
              $scope.resources.push(allResources[j])
            }
          }
        }
      }, function(error) {
        console.log(error);
      });
    });
    

  }])
  .name;
