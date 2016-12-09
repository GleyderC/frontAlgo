'use strict';

var DashboardApp = angular.module('DashboardApp');

DashboardApp.controller('ProposalController', ['TradeProposalService', '$scope',
    '$timeout', 'localStorageService', 'uiGridConstants', 'DashboardService', '$q',
    function (TradeProposalService, $scope, $timeout, localStorageService, uiGridConstants, DashboardService, $q) {

        $scope.ProposalTabs = {
            tabList: [
                {
                    head: {
                        icon: 'icon-bag',
                        text: 'Trade Proposal Info'
                    },
                    templateUrl: paths.views + "/trades/trade_proposal_info.html",
                    autoload: true
                },
                {
                    head: {
                        icon: 'icon-dollar',
                        text: 'Cash Flows'
                    },
                    templateUrl: paths.views + "/trades/proposal_cash_flows",
                    autoload: true
                }
            ]
        };

    }]);