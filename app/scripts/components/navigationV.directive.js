/**
 * Created by Aurimas on 1/15/2016.
 */
'use strict';

angular.module('appCore')
  .directive('navigationV', function () {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'views/components/navigation.html',
      scope: {
        data: '=navigation'
      },
      link: function (scope, element, attrs) {

      }
    }
  });
