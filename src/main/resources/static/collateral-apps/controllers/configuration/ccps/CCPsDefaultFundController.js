'use strict';

var DashboardApp = angular.module('DashboardApp');


DashboardApp.controller('CCPsDefaultFundController', ['CCPsService', '$scope', 'localStorageService',
    function (CCPsService, $scope, localStorageService) {

        $scope.defaultFund = {};

        $scope.defaultFund.clientClearing = false;
        $scope.defaultFund.clientClearingPercentage = 0;

        $scope.defaultFund.houseAccount = false;
        $scope.defaultFund.houseAccountPercentage = 0;

    }]);
