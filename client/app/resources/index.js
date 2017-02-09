'use strict';

import angular from 'angular';
import routes from './resources.routes';
import Auth from '../../components/auth/auth.service';



export default angular.module('enterpriseDevApp.resources', ['enterpriseDevApp.auth', 'ngRoute'])
  .config(routes)
  .controller('ResourcesController', ['$scope', '$http', 'Auth', '$routeParams', function($scope, $http, Auth, $routeParams) {
    var resources = {};

    var id = $routeParams.Id;
    var user_id;

    resources.getAll = function(id) {
      return $http.get('/api/resources/user/' + id);
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
