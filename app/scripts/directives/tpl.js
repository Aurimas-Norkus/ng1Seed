'use strict';

angular
  .module('appCore')
  .directive('tpl', function ($compile, $http, $templateCache, $timeout, Global, Modal, Tpl) {
    return {
      restrict: 'A',
      replace: false,
      scope: {
        data: '=tpl'
      },
      controller: function ($scope) {
        //-------------------------------------------------------------
        this.scope = $scope;

      },
      compile: function compile(element, attrs) {
        return {
          pre: function preLink(scope, iElement, iAttrs) {
          },
          post: function postLink(scope, iElement, iAttrs) {

            //-------------------------------------------------------------
            scope.setData = function (data) {
              if (data) {
                if (data.name) {

                  var objData = Global.data;
                  var saved = Global.savedData;
                  var tmp = Global.tmpData;
                  var path = data.name.split('.');
                  var name = path.pop();

                  for (var i = 0; path[i]; i++) {
                    if (!objData['|' + path[i]])
                      objData['|' + path[i]] = {};

                    if (saved && saved[path[i]] != undefined)
                      saved = saved[path[i]];
                    else
                      saved = undefined;

                    objData = objData['|' + path[i]];
                  }

                  if (saved && saved[name] != undefined)
                    data.value = saved[name];

                  if (tmp && tmp[name] != undefined)
                    data.value = tmp[name];

                  objData['|' + name] = data;
                }
              }
            };

            //-------------------------------------------------------------
            scope.set = function (data) {
              for (var j in data) {
                var saved = Global.savedData;
                var path = data[j].split('.');
                var name = path.pop();

                for (var i = 0; path[i]; i++) {
                  if (saved && saved[path[i]] != undefined)
                    saved = saved[path[i]];
                  else
                    saved = undefined;
                }

                if (saved && saved[name] != undefined)
                  scope.data[j] = saved[name];
              }
            }

            //-------------------------------------------------------------
            scope.singleInit = function () {
              if (scope.data.set)
                scope.set(scope.data.set);

              if (scope.data.name)
                scope.setData(scope.data);

              if (scope.data.value != undefined)
                scope.selectFromValue(scope.data.value, scope.data);

              if (scope.data.tpl) {

                scope.extendFunctions();

                if (typeof scope.init == 'function')
                  scope.init();

                scope.render();
              }

            };

            //-------------------------------------------------------------
            scope.render = function () {
              var templateUrl = 'views/sections/' + scope.data.tpl + '.html';

              /**
               * http request to get template moved to Global and does cache and compile
               * @param  {string} scope.data.tpl
               */
              Global.compiledTpl(scope.data.tpl, scope.data.debugMode).then(function (compiled) {
                scope.global = Global;
                scope.modal = Modal;

                compiled(scope, function (clonedElement) {
                  iElement.append(clonedElement)
                  // console.log('-- time:', new Date - startingTime, 'ms');
                });
              });
            }

            //-------------------------------------------------------------
            scope.selectFromValue = function (value) {

              if (angular.isArray(scope.data.list))
                for (var i = 0; scope.data.list[i]; i++)
                  if (scope.data.list[i].value == value)
                    return scope.select(scope.data.list[i]);
              if (value == undefined)
                return scope.select({});
            };

            //-------------------------------------------------------------
            scope.select = function (item) {
              if (scope.data.loading || (scope.data.is && scope.data.is.loading))
                return false;

              scope.data.value = item.value;

              if (scope.data.children && item.children)
                scope.data['class'] = 'no-animate';
              else
                delete scope.data['class'];


              $timeout(function () {

                if (typeof item.children == 'object')
                  scope.data.children = angular.copy(item.children);

                if (typeof item.children == 'string')
                  if (!scope.data.selected || scope.data.selected.children != item.children)
                    scope.data.children = angular.copy(scope.data[item.children]);

                if (item.children == undefined)
                  delete scope.data.children;

                scope.data.selected = item;
              });
            };


            //-------------------------------------------------------------
            scope.extendFunctions = function () {
              if (Tpl.byTemplateName[scope.data.tpl])
                angular.extend(scope, Tpl.byTemplateName[scope.data.tpl]);

              if (Tpl.byName[scope.data.name])
                angular.extend(scope, Tpl.byName[scope.data.name]);

              return;
            };

            //-------------------------------------------------------------
            scope.singleInit();

            //-------------------------------------------------------------
            scope.destroy = function () {
              if (scope.data && scope.data.name) {
                var name = scope.data.name;
                var path = name.split('.');
                var baseName = path.pop();
                var data = Global.data;
                var saved = Global.savedData;
                for (var i = 0; path[i]; i++) {
                  data = data['|' + path[i]];
                  if (typeof saved == 'object')
                    saved = saved[path[i]];
                }

                if (typeof saved == 'object')
                  saved[baseName] = undefined;

                if (typeof data == 'object' && typeof data['|' + baseName] == 'object') {
                  data['|' + baseName].value = undefined;
                  delete data['|' + baseName].ngModel;
                }

                console.log('destroy: --> ', scope.data.tpl, scope.data.name);
              }
            };


            //-------------------------------------------------------------
            scope.$on('$routeChangeStart', function (next, current) {
              scope.doNotDestroy = true;
            });

            //-------------------------------------------------------------
            scope.$on('$destroy', function () {
              if (!scope.doNotDestroy && !scope.data.doNotDestroy)
                scope.destroy();
            });

            //-------------------------------------------------------------
          }
        };
      }

    };
  });
