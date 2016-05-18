'use strict';

var DashboardApp = angular.module('DashboardApp')

DashboardApp.controller(
    'BilateralAgreementsController', [
        '$scope',
        '$document',
        '$timeout',
        '$request',
        'localStorageService',
        'DTOptionsBuilder',
        'DTColumnBuilder',
        function ($scope,
                  $document,
                  $timeout,
                  $request,
                  $localStorage,
                  DTOptionsBuilder,
                  DTColumnBuilder) {

            $scope.$on('$includeContentLoaded', function () {

            });

            $scope.workspaceTabs = {
                name: 'collateral-tabs',
                active: 0,
                tabList: []
            };

            $scope.addNewBillateralAgreement = function(){

                $scope.workspaceTabs.tabList.push(
                    {
                        head: {
                            icon: '',
                            text: 'New Billateral Agreement(' + ($scope.workspaceTabs.tabList.length + 1) +')'
                        },
                        content: 'Editing Billateral Agreement',
                        closable: true
                    }
                );

            };

            $scope.editBillateralAgreement = function(){

                $scope.workspaceTabs.tabList.push(
                    {
                        head: {
                            icon: '',
                            text: 'Editing Billateral Agreement (' + ($scope.workspaceTabs.tabList.length + 1) +')'
                        },
                        content: 'Editing Billateral Agreement',
                        closable: true
                    }
                );

            };

        }]);