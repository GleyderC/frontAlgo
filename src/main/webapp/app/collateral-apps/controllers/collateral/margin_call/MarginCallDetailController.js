'use strict';

var DashboardApp = angular.module('DashboardApp');


DashboardApp.controller('MarginCallDetailController', ['$scope', 'uiGridConstants', 'MarginCallService','$timeout',
    function ($scope, uiGridConstants, MarginCallService, $timeout) {

        $scope.sendFlag = false;
        $scope.currentMarginCall = $scope.parameters;
        $scope.tabs1 = [
            {
                id: 'mc-csa-margin',
                title: 'CSA Margins',
                templateUrl: 'collateral-apps/views/collateral/margin_call/mc_csa_margin.html',
                icon: 'icon-call-in'
            },
            {
                id: 'mc-im-collateral-allocations',
                title: 'IM Collateral Allocations',
                templateUrl: 'collateral-apps/views/collateral/margin_call/mc_im_collateral_allocations.html',
                icon: ''
            },
            {
                id: 'mc-vm-collateral-allocations',
                title: 'VM Collateral Allocations',
                templateUrl: 'collateral-apps/views/collateral/margin_call/mc_vm_collateral_allocations.html',
                icon: ''
            },
            {
                id: 'mc-collateral-substitution',
                title: 'Collateral Substitution',
                templateUrl: 'collateral-apps/views/collateral/margin_call/mc_collateral_substitution.html',
                icon: ''
            },
            {
                id: 'messaging-repository',
                title: 'Messaging Repository',
                templateUrl: 'collateral-apps/views/collateral/margin_call/mc_messaging_repository.html',
                icon: ''
            }
        ];

        $scope.tabs2 = [
            {
                id: 'mc-trades',
                title: 'Trades (underlyings)',
                templateUrl: 'collateral-apps/views/collateral/margin_call/mc_trades.html',
                icon: ''
            },
            {
                id: 'mc-collateral-inventory',
                title: 'Collateral Inventory',
                templateUrl: 'collateral-apps/views/collateral/margin_call/mc_collateral_inventory.html',
                icon: ''
            }
        ];

        MarginCallService.getDetail($scope.currentMarginCall.marginCalls[0].id).then(function (result) {
            //$scope.marginCallTrade = result.data.dataResponse.marginCall;
            $scope.Trades = result.data.dataResponse.trades;
            $scope.Inventory = result.data.dataResponse.postedCollateral;
            $scope.Messages = result.data.dataResponse.marginCall.messages;
            $scope.MarginCallDetail = result.data.dataResponse;

            //console.log(result.data.dataResponse);

        });

        this.sendMargin = function () {
            $scope.sendFlag = true;
            //console.log($scope.sendFlag);
            var result = MarginCallService.sendIssueMarginCall($scope.MarginCallDetail.marginCall.id, "CSA").
                then(function (result) {
                    //console.log(result);
                    $scope.sendFlag = false;
            },
                function (error) {
                    console.error(error);
                    $scope.sendFlag = false;
                });

        }
    }]);
