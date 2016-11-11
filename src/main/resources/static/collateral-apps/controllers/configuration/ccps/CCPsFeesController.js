'use strict';

var DashboardApp = angular.module('DashboardApp');


DashboardApp.controller('CCPsFeesController', ['CCPsService', '$scope', 'localStorageService',
    function (CCPsService, $scope, localStorageService) {

        $scope.CCPsFees = {};

        $scope.CCPsFees.houseBookingCurrencyList = localStorageService.get("CurrencyEnum");
        $scope.CCPsFees.houseAnnualCurrencyList = localStorageService.get("CurrencyEnum");

        $scope.CCPsFees.clientBookingCurrencyList = localStorageService.get("CurrencyEnum");
        $scope.CCPsFees.clientAnnualCurrencyList = localStorageService.get("CurrencyEnum");
    }]);
