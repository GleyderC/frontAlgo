'use strict';
/* Collateral App */
var App = angular.module("App", ['ngAnimate', 'ui.bootstrap']);

App.config(['$sceDelegateProvider', function ($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        // Allow same origin resource loads.
        'self',
        // Allow loading from outer templates domain.
        'http://**.example.com/**'
    ]);
}]);

App.config(function ($sceProvider) {
    // Completely disable SCE.  For demonstration purposes only!
    // Do not use in new projects.
    //$sceProvider.enabled(false);
});

App.controller('appController', ['$scope', function ($scope) {

    $scope.tabMenu = {
        name: 'collateral-tabs',
        active: 0,
        tabList: [{
            head: {
                icon: '',
                text: 'Hola 1'
            },
            content: 'Content 1',
            closable: true
        },
            {
                head: {
                    icon: '',
                    text: 'Hola 2'
                },
                content: 'Content 2'
            },
            {
                head: {
                    icon: '',
                    text: 'Hola 3'
                },
                content: 'Hola tab 3 :D'
            }]
    };

}]);


App.directive('appTab', [function () {

    var TabDirective = {};

    TabDirective.restrict = "E";

    TabDirective.templateUrl = "tpl/TabManagementTemplate.html";

    //TabDirective.scope = true;

    //TabDirective.replace = true;

    TabDirective.link = function (scope, element, attrs) {

        element.on('click', function(){
           console.log("click")
        });
        element.on('contexMenu', function (e) {
            e.preventDefault();
            console.log("aki ta")
        });

        scope.$watch('$apply', function (newVal, oldVal) {
            //console.log("tam: " + scope.tabMenu.tabList.length)
            //scope.tabMenu.active = (scope.tabMenu.tabList.length - 1)
        });

        scope.addTab = function () {
            scope.tabMenu.tabList.push
            ({

                head: {
                    icon: 'glyphicon-map-marker',
                    text: 'Hola ' + (scope.tabMenu.tabList.length + 1)
                },
                content: 'Content ' + (scope.tabMenu.tabList.length + 1),
                templateUrl: 'demo.html',
                disabled: false //disable tab
            });
            //console.log("Agregando un tab")
            //console.log(scope.tabMenu.tabList)
        }

        scope.delTab = function (tab) {

            if (scope.tabMenu.tabList.length >= 0) {

                scope.tabMenu.tabList.splice(tab.$index,1);

            }

            //console.log("Eliminando un tab")
            //console.log(scope.tabMenu.tabList)
        }

        scope.delAllTabRight = function (tab) {

            if (scope.tabMenu.tabList.length >= 0) {

                scope.tabMenu.tabList.splice(tab.$index + 1);

            }

        }

        scope.delAllTabLeft = function (tab) {

            if (scope.tabMenu.tabList.length >= 0) {

                angular.forEach(scope.tabMenu.tabList, function(index, tab){

                    if(index >= tab.$index)
                        return false;

                    scope.tabMenu.tabList.splice(index);

                });

            }

        }

        scope.backTab = function () {
            if(scope.tabMenu.active > 0 )
                scope.tabMenu.active--;
        }

        scope.nextTab = function () {
            if(scope.tabMenu.active < (scope.tabMenu.tabList.length - 1) )
                scope.tabMenu.active++;
        }

    };

    return TabDirective;

}]);