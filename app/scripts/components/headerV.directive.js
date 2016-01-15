/**
 * Created by Aurimas on 1/15/2016.
 */
'use strict';

angular.module('appCore')
  .directive('headerV', function () {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'views/components/header.html',
      scope: {
        data: '=header'
      },
      link: function (scope, element, attrs) {

      }
    }
  });
