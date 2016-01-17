'use strict';

/**
 * Modal window services
 * @return {object}
 */
angular
  .module('appCore')
  .service('Modal', function() {
	this.header = 'Modal window';
	this.data = {};
});
