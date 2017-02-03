import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './main.routes';

export class MainController {

  awesomeModules = [];
  newModule = '';

  /*@ngInject*/
  constructor($http) {
    this.$http = $http;
  }

  $onInit() {
    // this.$http.get('/api/modules')
    //   .then(response => {
    //     this.awesomeModules = response.data;
    //   });
  }
}

export default angular.module('enterpriseDevApp.main', [ngRoute])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
