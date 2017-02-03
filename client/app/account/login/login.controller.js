'use strict';

export default class LoginController {
  user = {
    name: '',
    email: '',
    password: ''
  };
  errors = {
    login: undefined
  };
  submitted = false;
  



  /*@ngInject*/
  constructor(Auth, $location) {
    this.Auth = Auth;
    this.$location = $location;
    this.user.email = "test@example.com";
    this.user.password = "test";

  }

  login(form) {
    this.submitted = true;

    if(form.$valid) {
      this.Auth.login({
        email: this.user.email,
        password: this.user.password
      })
        .then(() => {
          // Logged in, redirect to home
          this.$location.path('/home');
        })
        .catch(err => {
          this.errors.login = err.message;
        });
    }
  }
}