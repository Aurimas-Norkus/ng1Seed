/**
 * Created by Aurimas on 1/15/2016.
 */
angular
  .module('appCore')
  .controller('MainCtrl', function ($rootScope, $scope, $location, $log) {

    /* jshint validthis: true */
    var vm_m = this;

    // Navigation data
    vm_m.navigation = {
      nav: [
        {
          url: '/home',
          title: 'Home view',
          class: ''
        },
        {
          url: '/login',
          title: 'Login view',
          class: ''
        }
      ]
    };

    // Header data
    vm_m.header = {
      title:'NG Seed Application'
    };
  });
