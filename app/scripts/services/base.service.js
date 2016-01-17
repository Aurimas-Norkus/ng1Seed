/**
 * Created by Aurimas on 1/17/2016.
 */
'use strict';

angular
  .module('appCore')
  .service('Base', function () {

    var that = this;

    this.pages = {
      login: {source: 'login'},
      home: {source: 'home', nav: {current: "home"}}
    };

  });
