'use strict';

var DashboardApp = angular.module('DashboardApp');


DashboardApp.controller('MarginCallTradesController', ['$scope', 'uiGridConstants', 'MarginCallService',
    function ($scope, uiGridConstants, MarginCallService) {

        $scope.tabs = [
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
            {field: 'internalId', name:'TradeId', width: 90,
                sort: {
                    direction: uiGridConstants.ASC,
                    priority: 0
                }
            },
            {field: 'tradeType', name: 'type'},
            {field: 'tradeSubType', name:'subType'},
            {field: 'description' },
            {field: 'notional' },
            {field: 'currency' },
            {field: 'npvCurr', name:'Npv (Curr)' },
            {field: 'npvEur', name:'Npv (Eur)' },
            {field: 'npvCounterParty', name:'npv (Counterparty)'},
            {field: 'npvCounterParty', name:'Diff (%Npv)'}

        ];

        MarginCallService.getDetail($scope.MarginCall.marginCalls[0].id).then(function (result) {
            $scope.trades = result.data.dataResponse.trades;

            //console.log($scope.trades);
            $scope.gridTradesOptions.data = $scope.trades;


        });
}]);
