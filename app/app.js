'use strict';

angular
  .module('myApp', [
    'ngRoute',
    'myApp.view1',
    'myApp.view2',
    'myApp.version'
  ]).config(function ($routeProvider) {
  $routeProvider
    .when('/:page', {"templateUrl": 'views/base.html', "controller": 'PageCtrl'})
    .when('/:page/:nr', {"templateUrl": 'views/base.html', "controller": 'PageCtrl'})
    .when('/', {"redirectTo": "/home"})
});
