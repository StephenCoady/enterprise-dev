'use strict';

import angular from 'angular';
import routes from './home.routes';
import Auth from '../../components/auth/auth.service';



export default angular.module('enterpriseDevApp.home', ['enterpriseDevApp.auth', 'ngRoute'])
  .config(routes)
  .controller('HomeController', ['$scope', '$http', 'Auth', function($scope, $http, Auth) {

    var modules = {};
    var user = {};
    var user_id;
    
    modules.getAll = function(user_id) {
      return $http.get('/api/modules/' + user_id);
    };
    
    
    Auth.getCurrentUser().then(function(user){
      user_id = user._id;
    }).then(function(){
      modules.getAll(user_id).then(function(response) {
        $scope.modules = response.data;
      }, function(error) {
        console.log(error);
      });
    });
  }])
  .name;
