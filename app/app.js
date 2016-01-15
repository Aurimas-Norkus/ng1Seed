'use strict';

angular
  .module('appCore', [
    'ngRoute'
  ]).config(function ($routeProvider) {
  $routeProvider
    .when('/:page', {"templateUrl": 'views/base.html', "controller": 'PageCtrl'})
    .when('/:page/:nr', {"templateUrl": 'views/base.html', "controller": 'PageCtrl'})
    .when('/', {"redirectTo": "/home"})
});
