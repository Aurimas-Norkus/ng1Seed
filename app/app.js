'use strict';

angular
  .module('appCore', [
    'ngRoute',
    'templates'
  ]).config(function ($routeProvider) {
  $routeProvider
    .when('/:page', {"templateUrl": 'views/base.html', "controller": 'PageController as vm'})
    .when('/:page/:nr', {"templateUrl": 'views/base.html', "controller": 'PageController as vm'})
    .when('/', {"redirectTo": "/home"})
});
