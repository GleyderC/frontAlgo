'use strict';

/**
 * WORKSPACE TAB MENU
 */

angular.module('DashboardApp').directive('workspaceTabs', [function () {

    var TabDirective = {};

    TabDirective.restrict = "E";

    TabDirective.templateUrl = paths.tpls + "/TabManagementTemplate.html";

    TabDirective.link = function ($scope, element, attrs) {

        element.on('click', function(){
           //console.log("click")
        });
        element.on('contexMenu', function (e) {
            e.preventDefault();
        });

        $scope.$watch('$apply', function (newVal, oldVal) {
            //$scope.workspaceTabs.active = ($scope.workspaceTabs.tabList.length - 1)
        });

        $scope.workspaceTabs.addTab = function (tabConfig) {

            var globalTabConfig = {
                head: {
                    icon: 'glyphicon glyphicon-refresh glyphicon-refresh-animate',
                    text: ''
                },
                content: '',
                templateUrl: '',
                disabled: false,
                closable: false
            };

            if(!!tabConfig && typeof tabConfig === 'object')
            {

                if(!!tabConfig.head.text){
                    globalTabConfig.head.text = tabConfig.head.text;
                }

                if(!!tabConfig.content){
                    globalTabConfig.content = tabConfig.content;
                }

                if(!!tabConfig.templateUrl){
                    globalTabConfig.templateUrl = tabConfig.templateUrl;
                }

                if(!!tabConfig.disabled){
                    globalTabConfig.disabled = tabConfig.disabled;
                }

                if(!!tabConfig.closable){
                    globalTabConfig.closable = tabConfig.closable;
                }

            }

            $scope.workspaceTabs.tabList.push(globalTabConfig);

            $scope.workspaceTabs.active = $scope.workspaceTabs.tabList.length;

            $scope.$on('$includeContentLoaded', function (event,url) {

                $scope.workspaceTabs.active = $scope.workspaceTabs.tabList.length;

                if(!!tabConfig.head.icon){
                    $scope.workspaceTabs.tabList[$scope.workspaceTabs.tabList.length - 1].head.icon = tabConfig.head.icon;
                }
                else
                {
                    $scope.workspaceTabs.tabList[$scope.workspaceTabs.tabList.length - 1].head.icon = '';
                }

            });

        }

        $scope.workspaceTabs.closeTab = function ( tab, event ) {

            event.preventDefault();

            if ($scope.workspaceTabs.tabList.length >= 0) {

                $scope.workspaceTabs.tabList.splice(tab.$index,1);

            }

        }

        $scope.workspaceTabs.delAllTabRight = function (tab) {

            if ($scope.workspaceTabs.tabList.length >= 0) {

                $scope.workspaceTabs.tabList.splice(tab.$index + 1);

            }

        }

        $scope.workspaceTabs.delAllTabLeft = function (tab) {

            if ($scope.workspaceTabs.tabList.length >= 0) {

                angular.forEach($scope.workspaceTabs.tabList, function(index, tab){

                    if(index >= tab.$index)
                        return false;

                    $scope.workspaceTabs.tabList.splice(index);

                });

            }

        }

        $scope.workspaceTabs.backTab = function () {
            if($scope.workspaceTabs.active > 0 )
                $scope.workspaceTabs.active--;
        }

        $scope.workspaceTabs.nextTab = function () {
            if($scope.workspaceTabs.active < ($scope.workspaceTabs.tabList.length - 1) )
                $scope.workspaceTabs.active++;
        }

    };

    return TabDirective;

}]);