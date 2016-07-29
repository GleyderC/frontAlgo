'use strict';

var DashboardApp = angular.module('DashboardApp');


DashboardApp.controller('SecurityController', [ '$scope',
    'localStorageService', 'SecurityService', 'uiGridConstants',
    function ( $scope, localStorageService, SecurityService, uiGridConstants ) {

        /* Cargando datos en legal entity ui-grid*/
        $scope.gridSecurityOptions = {
            showGridFooter: true,
            paginationPageSizes: [12, 50, 100, 200, 500],
            paginationPageSize: 12,
            enableColumnResizing: true,
            enableFiltering: true,
            rowHeight: 35, // set height to each row
            enableGridMenu: true,
            exporterCsvFilename: 'security.csv',
            exporterPdfDefaultStyle: {fontSize: 9},
            exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
            exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
            exporterPdfHeader: {text: "Security", style: 'headerStyle'},
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

        $scope.gridSecurityOptions.columnDefs = [
            {field: 'isin',
                sort: {
                    direction: uiGridConstants.ASC,
                    priority: 0
                }
            },
            {field: 'issuerLEI' },
            {field: 'collateralType.name'},
            {field: 'collateralType.fundingCost', cellFilter: 'number:0', cellClass:'collateral-money'  },
            {field: 'collateralCategory.name' },
            {field: 'issuer' },
            {field: 'country' },
            {field: 'price',cellFilter: 'number:0', cellClass:'collateral-money'  },
            {field: 'currency' },
            {field: 'description' },
            {field: 'interestRate',cellFilter: 'number:0', cellClass:'collateral-money'  },
            {field: 'lotSize',cellFilter: 'number:0', cellClass:'collateral-money'  },
            {field: 'priceBase',cellFilter: 'number:0', cellClass:'collateral-money' },
            {field: 'issuerType' }
        ];

        SecurityService.getAll().then(function (result) {
            $scope.Securities = result.data.dataResponse;


            $scope.gridSecurityOptions.data = $scope.Securities;

        });

    }]);