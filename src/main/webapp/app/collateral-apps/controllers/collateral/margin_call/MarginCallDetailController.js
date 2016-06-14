'use strict';

var DashboardApp = angular.module('DashboardApp');


DashboardApp.controller('MarginCallDetailController', ['$scope', 'uiGridConstants', 'MarginCallService',
    function ($scope, uiGridConstants, MarginCallService) {

        $scope.tabs = [
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


        //$scope.test = "Test"
        $scope.MarginCall = $scope.currentMarginCall;
        //console.log($scope.MarginCall);

    }]);
