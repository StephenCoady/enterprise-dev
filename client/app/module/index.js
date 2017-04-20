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
    $scope.rawScreens = [];
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

var tmpList = [];

$scope.sortingLog = [];

function createOptions (listName, otherListName) {
  var _listName = listName;
  var options = {
    placeholder: "app",
    connectWith: ".resources-container",
    dropOnEmpty: true,
    helper: function(e, item) {
      console.log("list " + _listName + ": helper");
      return item;
    },
    activate: function() {
        console.log("list " + _listName + ": activate");
    },
    beforeStop: function() {
        console.log("list " + _listName + ": beforeStop");
    },
    change: function() {
        console.log("list " + _listName + ": change");
    },
    create: function() {
        console.log("list " + _listName + ": create");
    },
    deactivate: function() {
        console.log("list " + _listName + ": deactivate");
    },
    out: function() {
        console.log("list " + _listName + ": out");
    },
    over: function() {
        console.log("list " + _listName + ": over");
    },
    receive: function(e, ui) {
        console.log("list " + _listName + ": receive");
    },
    remove: function(e, ui) {
        console.log("list " + _listName + ": remove");
    },
    sort: function() {
        console.log("list " + _listName + ": sort");
    },
    start: function() {
        console.log("list " + _listName + ": start");
    },
    stop: function() {
        console.log("list " + _listName + ": stop");
    },
    update: function(e, ui) {
        console.log("list " + _listName + ": update");        
    }
  };
  return options;
}

$scope.sortableOptionsList = [createOptions('A', 'B'), createOptions('B', 'A')];

  }])
  .name;
