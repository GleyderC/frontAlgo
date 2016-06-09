'use strict';

var DashboardApp = angular.module('DashboardApp');


DashboardApp.controller('MarginCallDetailController', ['$scope','localStorageService', 'uiGridConstants',
    function ($scope, localStorageService, uiGridConstants) {

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

    $scope.gridTradesOptions = {
        showGridFooter: true,
        paginationPageSizes: [15, 50, 100, 200, 500],
        paginationPageSize: 5,
        enableColumnResizing: true,
        enableFiltering: true,
        rowHeight: 35, // set height to each row
        enableGridMenu: true,
        exporterCsvFilename: 'margin-call-trades.csv',
        exporterPdfDefaultStyle: {fontSize: 9},
        exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
        exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
        exporterPdfHeader: {text: "Margin Call - Trades", style: 'headerStyle'},
        exporterPdfFooter: function (currentPage, pageCount) {
            return {text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle'};
        },
        exporterPdfCustomFormatter: function (docDefinition) {
            docDefinition.styles.headerStyle = {fontSize: 22, bold: true};
            docDefinition.styles.footerStyle = {fontSize: 10, bold: true};
            return docDefinition;
        },
        exporterPdfOrientation: 'portrait',
        exporterPdfPageSize: 'LETTER',
        exporterPdfMaxGridWidth: 450,
        exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
        }
    };
    $scope.gridTradesOptions.columnDefs = [
        {field: 'TradeId', width: 90,
            sort: {
                direction: uiGridConstants.ASC,
                priority: 0
            }
        },
        {field: 'type'},
        {field: 'subType'},
        {field: 'description' },
        {field: 'notional' },
        {field: 'currency' },
        {field: 'npvCurr', name:'npv (Curr)' },
        {field: 'npvEur', name:'npv (Eur)' },
        {field: 'npvCounterParty', name:'npv (Counterparty)' }


    ];
}]);
