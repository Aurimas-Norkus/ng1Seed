'use strict';

/**
 * Template functions
 * @param  {object} Global
 * @return {object}
 */
angular
  .module('appCore')
  .service('Tpl', function (Global, Modal, $log) {
    /**
     * custom function by name
     * @type {Object}
     */
    this.byName = {
      debugMode: {
        init: function () {
          var debugMode = localStorage.getItem('debugMode');
          if (!debugMode)
            debugMode = 'off';
          this.data.value = debugMode;
        },
        select: function (item) {
          this.data.value = item.value;
          localStorage.setItem('debugMode', item.value);
        }
      }

    };
    this.byTemplateName = {
      'button/buttons': {
        byValue: {
          reset: function () {
            Global.clearData();
            Global.redirect('/home');
            Modal.close();
          },
          login: function (data) {
            $log.debug('Login', Global.data['|login']['|form']);
          }
        }
      }
    };

  });
