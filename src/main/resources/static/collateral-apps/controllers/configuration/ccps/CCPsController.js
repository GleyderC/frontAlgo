'use strict';

var DashboardApp = angular.module('DashboardApp');


DashboardApp.controller('CCPsController', ['CCPsService', '$scope', 'localStorageService',
    function (CCPsService, $scope, localStorageService) {


        $scope.tabs = [
            {
                id: 'ccps-default-fund',
                title: 'Default Fund',
                templateUrl: 'collateral-apps/views/configuration/ccps/default_fund.html',
                icon: ''
            },
            {
                id: 'ccps-regulatory-settings',
                title: 'Regulatory Settings',
                templateUrl: 'collateral-apps/views/configuration/ccps/regulatory_settings.html',
                icon: ''
            },
            {
                id: 'ccps-im-df-currencies',
                title: 'IM/DF Currencies',
                templateUrl: 'collateral-apps/views/configuration/ccps/im_df_currencies.html',
                icon: ''
            },
            {
                id: 'ccps-elegible-currencies',
                title: 'Eligible Currencies',
                templateUrl: 'collateral-apps/views/configuration/ccps/elegible_currencies.html',
                icon: ''
            },
            {
                id: 'ccps-elegible-securities',
                title: 'Elegible Securities',
                templateUrl: 'collateral-apps/views/configuration/ccps/elegible_securities.html',
                icon: ''
            },
            {
                id: 'ccps-fees',
                title: 'Fees',
                templateUrl: 'collateral-apps/views/configuration/ccps/fees.html',
                icon: ''
            }
        ];
    }]);
