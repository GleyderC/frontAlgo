'use strict';

/**
 * DEMO TAB MENU
    $scope.tabMenu = {
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

App.directive('appTab', [function () {

    var TabDirective = {};

    TabDirective.restrict = "E";

    TabDirective.templateUrl = "tpl/TabManagementTemplate.html";

    TabDirective.link = function (scope, element, attrs) {

        element.on('click', function(){
           console.log("click")
        });
        element.on('contexMenu', function (e) {
            e.preventDefault();
            console.log("aki ta")
        });

        scope.$watch('$apply', function (newVal, oldVal) {
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

        }

        scope.delTab = function (tab) {

            if (scope.tabMenu.tabList.length >= 0) {

                scope.tabMenu.tabList.splice(tab.$index,1);

            }
            
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