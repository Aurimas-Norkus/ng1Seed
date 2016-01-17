'use strict';

angular
  .module('appCore', [
    'ngRoute',
    'templates'
  ]).config(function ($routeProvider) {
  $routeProvider
    .when('/:page', {"templateUrl": 'views/base.html', "controller": 'PageController'})
    .when('/:page/:nr', {"templateUrl": 'views/base.html', "controller": 'PageController'})
    .when('/', {"redirectTo": "/home"})
});
