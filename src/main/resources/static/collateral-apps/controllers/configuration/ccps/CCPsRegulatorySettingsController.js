'use strict';

var DashboardApp = angular.module('DashboardApp');


DashboardApp.controller('CCPsRegulatorySettingsController', ['CCPsService', '$scope', 'localStorageService',
    function (CCPsService, $scope, localStorageService) {

        $scope.regulatorySettings = {};

        $scope.regulatorySettings.leverageRatioCashIM = false;
        $scope.regulatorySettings.leverageRatioNonCashIM = false;

        $scope.regulatorySettings.leverageRatioDefaultFund = false;
        $scope.regulatorySettings.leverageRatioNonDefaultFund = false;

        $scope.regulatorySettings.clientsLeverageCashIM = false;
        $scope.regulatorySettings.clientsLeverageNonCashIM = false;

        $scope.regulatorySettings.clientsLeverageDefaultFund = false;
        $scope.regulatorySettings.clientsLeverageNonDefaultFund = false;

        $scope.regulatorySettings.computeCapitalBCBS2012 = false;
        $scope.regulatorySettings.computeCapitalBCBS2012Percentage = 0;

        $scope.regulatorySettings.computeCapitalBCBS2014 = false;
        $scope.regulatorySettings.computeCapitalBCBS2014Percentage = 0;

    }]);
