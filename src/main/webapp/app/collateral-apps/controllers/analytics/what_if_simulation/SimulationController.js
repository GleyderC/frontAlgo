'use strict';

var DashboardApp = angular.module('DashboardApp');

DashboardApp.controller('SimulationController', ['SimulationService', '$scope',
    '$timeout', 'localStorageService', 'uiGridConstants', 'DashboardService', '$q',
    function (SimulationService, $scope, $timeout, localStorageService, uiGridConstants, DashboardService, $q) {

        $scope.SimulationTabs = {
            tabList: [
                {
                    head: {
                        icon: 'icon-bag',
                        text: 'Trade Propusal Info'
                    },
                    templateUrl: paths.views + "/analytics/what_if_simulation/simulation_trade_propusal.html",
                    autoload: true
                },
                {
                    head: {
                        icon: 'glyphicon glyphicon-list-alt ',
                        text: 'Scenarios'
                    },
                    templateUrl: paths.views + "/analytics/what_if_simulation/scenarios.html",
                    autoload: true
                },
                {
                    head: {
                        icon: 'glyphicon glyphicon-saved',
                        text: 'Results'
                    },
                    templateUrl: paths.views + "/analytics/what_if_simulation/results.html",
                    autoload: true
                },
                {
                    head: {
                        icon: 'glyphicon glyphicon-saved',
                        text: 'Results (P&L Anual)'
                    },
                    templateUrl: paths.views + "/analytics/what_if_simulation/results_pl_anual.html",
                    autoload: true
                },
                {
                    head: {
                        icon: 'glyphicon glyphicon-saved',
                        text: 'Results (P&L Integrated)'
                    },
                    templateUrl: paths.views + "/analytics/what_if_simulation/results_pl_integrated.html",
                    autoload: true
                }
            ]
        };

    }]);