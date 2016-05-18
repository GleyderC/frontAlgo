'use strict';

/**
 * DEMO TAB MENU
    $scope.workspaceTabs = {
        name: 'collateral-tabs',
        active: 0,
        tabList: [{
            head: {
                icon: '',
                text: 'Hi 1'
            },
            content: 'Content 1',
            closable: true
        },
            {
                head: {
                    icon: '',
                    text: 'Hi 2'
                },
                content: 'Content 2'
            },
            {
                head: {
                    icon: '',
                    text: 'Hi 3'
                },
                content: 'Hi tab 3'
            }]
    };

}]);
 **/

angular.module('DashboardApp').directive('workspaceTabs', [function () {

    var TabDirective = {};

    TabDirective.restrict = "E";

    TabDirective.templateUrl = paths.tpls + "/TabManagementTemplate.html";

    TabDirective.link = function (scope, element, attrs) {

        element.on('click', function(){
           console.log("click")
        });
        element.on('contexMenu', function (e) {
            e.preventDefault();
            console.log("aki ta")
        });

        scope.$watch('$apply', function (newVal, oldVal) {
            //scope.workspaceTabs.active = (scope.workspaceTabs.tabList.length - 1)
        });

        scope.addTab = function () {
            scope.workspaceTabs.tabList.push
            ({

                head: {
                    icon: 'glyphicon-map-marker',
                    text: 'Hola ' + (scope.workspaceTabs.tabList.length + 1)
                },
                content: 'Content ' + (scope.workspaceTabs.tabList.length + 1),
                templateUrl: 'demo.html',
                disabled: false //disable tab
            });

        }

        scope.delTab = function ( tab, event ) {

            event.preventDefault();
            
            if (scope.workspaceTabs.tabList.length >= 0) {

                scope.workspaceTabs.tabList.splice(tab.$index,1);

            }
            
        }

        scope.delAllTabRight = function (tab) {

            if (scope.workspaceTabs.tabList.length >= 0) {

                scope.workspaceTabs.tabList.splice(tab.$index + 1);

            }

        }

        scope.delAllTabLeft = function (tab) {

            if (scope.workspaceTabs.tabList.length >= 0) {

                angular.forEach(scope.workspaceTabs.tabList, function(index, tab){

                    if(index >= tab.$index)
                        return false;

                    scope.workspaceTabs.tabList.splice(index);

                });

            }

        }

        scope.backTab = function () {
            if(scope.workspaceTabs.active > 0 )
                scope.workspaceTabs.active--;
        }

        scope.nextTab = function () {
            if(scope.workspaceTabs.active < (scope.workspaceTabs.tabList.length - 1) )
                scope.workspaceTabs.active++;
        }

    };

    return TabDirective;

}]);