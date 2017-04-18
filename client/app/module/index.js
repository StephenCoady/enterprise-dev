'use strict';

import angular from 'angular';
import routes from './module.routes';
import Auth from '../../components/auth/auth.service';



export default angular.module('enterpriseDevApp.module', ['enterpriseDevApp.auth', 'ngRoute'])
  .config(routes)
  .controller('ModuleController', ['$scope', '$http', 'Auth', '$routeParams', '$route', function($scope, $http, Auth, $routeParams, $route) {
    var modules = {};
    var resources = {};
    var dummyResources = [];
    $scope.resources = [];
    $scope.moduleResources = [];
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

    Auth.getCurrentUser().then(function(user) {
      user_id = user._id;
    }).then(function() {
      resources.getAll(user_id).then(function(response) {
        var allResources = response.data;
        $scope.resources = response.data;
        var moduleResources = $scope.module.resources;

        for (var i = 0; i < moduleResources.length; i++) {
          for (var j = 0; j < allResources.length; j++) {
            if (moduleResources[i].id === allResources[j]._id) {
              $scope.moduleResources.push(allResources[j])
            }
          }
        }
      }, function(error) {
        console.log(error);
      });
    });

    $scope.sortableOptions = {
      activate: function() {
        console.log("activate");
      },
      beforeStop: function() {
        console.log("beforeStop");
      },
      change: function() {
        console.log("change");
      },
      create: function() {
        console.log("create");
      },
      deactivate: function() {
        console.log("deactivate");
      },
      out: function() {
        console.log("out");
      },
      over: function() {
        console.log("over");
      },
      receive: function() {
        console.log("receive");
      },
      remove: function() {
        console.log("remove");
      },
      sort: function() {
        console.log("sort");
      },
      start: function() {
        console.log("start");
      },
      update: function(e, ui) {
        console.log("update");
        console.log($scope.resources);
      },
      stop: function(e, ui) {
        console.log("stop");
        console.log($scope.resources);
      }
    };

  }])
  .name;
