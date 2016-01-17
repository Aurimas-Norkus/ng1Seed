/**
 * Created by Aurimas on 1/17/2016.
 */
'use strict';

angular
  .module('appCore')
  .service('Api', function ($http) {

    var that = this;

    //-------------------------------------------------------------
    this.getConfig = function (src) {
      return $http.get('scripts/json/' + src + '.json')
        .then(function (response) {
          return response.data;
        });
    };
  });
