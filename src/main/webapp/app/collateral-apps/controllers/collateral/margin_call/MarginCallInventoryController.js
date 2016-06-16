'use strict';

var DashboardApp = angular.module('DashboardApp');


DashboardApp.controller('MarginCallInventoryController', ['$scope', 'uiGridConstants', 'MarginCallService',
    function ($scope, uiGridConstants, MarginCallService) {

        //console.log($scope.MarginCall.marginCalls[0].id);

        MarginCallService.getDetail($scope.MarginCall.marginCalls[0].id).then(function (result) {
            //$scope.marginCallTrade = result.data.dataResponse.marginCall;
            $scope.Inventory = result.data.dataResponse.postedCollateral;

            $scope.gridInventoryOptions.data = $scope.Inventory;


        });
        $scope.gridInventoryOptions = {
            showGridFooter: true,
            paginationPageSizes: [15, 50, 100, 200, 500],
            paginationPageSize: 5,
            enableColumnResizing: true,
            enableFiltering: true,
            rowHeight: 35, // set height to each row
            enableGridMenu: true,
            exporterCsvFilename: 'margin-call-inventory.csv',
            exporterPdfDefaultStyle: {fontSize: 9},
            exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
            exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
            exporterPdfHeader: {text: "Margin Call - inventory", style: 'headerStyle'},
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
        $scope.gridInventoryOptions.columnDefs = [
            /*ISIN
             Description
             Date
             Maturity
             Currency
             Coupon
             Frecuency
             Quantity
             Lot Size
             Notional
             Price
             Amount
             NPV (EUR)
             Moody’sRating
             S&P Rating
             Emisor
             Custody
             Folder
             Sense
             Coll Type*/
            {field: 'isin', width: 70,
                sort: {
                    direction: uiGridConstants.ASC,
                    priority: 0
                }
            },
            {field: 'description'},
            {field: 'date'},
            {field: 'maturity' },
            {field: 'currency' },
            {field: 'coupon' },
            {field: 'frequency' },
            {field: 'quantity', cellFilter: 'number:0', cellClass:'collateral-money'},
            {field: 'lotSize' },
            {field: 'notional', width: 90, cellFilter: 'currency:""', cellClass:'collateral-money'  },
            {field: 'price', width: 90, cellFilter: 'currency:""', cellClass:'collateral-money' },
            {field: 'amount', width: 90, cellFilter: 'currency:""', cellClass:'collateral-money'  },
            {field: 'npvBaseCurrency', name:'Npv ('+ $scope.MarginCall.contract.baseCurrency.toLowerCase()+')',
                width: 90, cellFilter: 'currency:""', cellClass:'collateral-money' },
            {field: 'SPrating', name: 'SPrating' },
            {field: 'issuer' },
            {field: 'custody' },
            {field: 'folder' },
            {field: 'sense' }

        ];


}]);
