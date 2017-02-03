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

  addModule() {
    if(this.newModule) {
      this.$http.post('/api/modules', {
        name: this.newModule
      });
      this.newModule = '';
    }
  }
 
  deleteModule(module) {
    this.$http.delete(`/api/modules/${module._id}`);
  }
}

export default angular.module('enterpriseDevApp.main', [ngRoute])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
