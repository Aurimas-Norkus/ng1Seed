/**
 * Created by Aurimas on 1/15/2016.
 */
'use strict';

angular
  .module('appCore')
  .controller('MainCtrl', function ($log) {

    /* jshint validthis: true */
    var vm = this;

    // Navigation data
    vm.navigation = {
      nav: [
        {
          url: 'home',
          title: 'Home view',
          class: ''
        },
        {
          url: 'login',
          title: 'Login view',
          class: ''
        }
      ]
    };

    // Header data
    vm.header = {
      title: 'NG Seed Application'
    };
  });
