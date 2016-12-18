'use strict';

var DashboardApp = angular.module('DashboardApp');

DashboardApp.controller('DealEntryController', ['TradeDealEntryService', '$scope',
    '$timeout', 'localStorageService', 'uiGridConstants', 'DashboardService', '$q',
    function (TradeDealEntryService, $scope, $timeout, localStorageService, uiGridConstants, DashboardService, $q) {

        $scope.DealEntryTabs = {
            tabList: [
                {
                    head: {
                        icon: 'icon-bag',
                        text: 'Trade Proposal Info'
                    },
                    templateUrl: paths.views + "/trades/deal_entry/trade_proposal_info.html",
                    autoload: true
                }
            ]
        };

    }]);