/**
 * Created by Aurimas on 1/15/2016.
 */
'use strict';

angular
  .module('appCore')
  .controller('PageController', function ($route, $log, Api, Base, $scope) {
    /* jshint validthis: true */
    var vm = this;

    $log.debug('PageController', vm);
    $log.debug('$route.current.params.page', $route.current.params.page);

    vm.defaultPage = 'home';
    vm.page = $route.current.params.page || vm.defaultPage;
    // Loading new page
    vm.load = function () {
      vm.pageToLoad = Base.pages[vm.page] || Base.pages[vm.defaultPage];
      $log.debug('vm.pageToLoad', vm.pageToLoad);
      vm.loading = true;

      Api.getConfig(vm.pageToLoad.source).then(function (response) {
        vm.loading = false;
        if (angular.isArray(response))
          response = {children: response};
        vm.contents = response;
      });
    };

    vm.load();

    window.pageCtrl = vm;
  });
