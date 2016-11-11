'use strict';

var DashboardApp = angular.module('DashboardApp');


DashboardApp.controller('CCPsIMDFCurrenciesController', ['$scope', '$request', '$interval', '$log','localStorageService',
    function ($scope, $request, $interval, $log, localStorageService) {

    $scope.CCPsIMDFCurrencies ={}
    $scope.CCPsIMDFCurrencies.currencyList = localStorageService.get("CurrencyEnum");

    $scope.CCPsIMDFCurrencies.gridOptions = {

        columnDefs: [
            {
                field: 'preferedCurrency',
            },
            {
                width: 250,
                arrayCurrency: $scope.CCPsIMDFCurrencies.currencyList,
                field: 'currency',
                cellTemplate:
                '<ui-select ng-model="MODEL_COL_FIELD" theme="select2" append-to-body="true" style="display: block;">'+
                '<ui-select-match placeholder="Choose...">{{ COL_FIELD.key }}</ui-select-match>,'+
                '<ui-select-choices repeat="item in col.colDef.arrayCurrency | filter: $select.search">'+
                '<span>{{ item.key }}</span>'+
                '</ui-select-choices>'+
                '</ui-select>'
            }
        ],
        enableGridMenu: true,
        enableSelectAll: true,
        exporterCsvFilename: 'myFile.csv',
        exporterPdfDefaultStyle: {fontSize: 9},
        exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
        exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
        exporterPdfHeader: {text: "My Header", style: 'headerStyle'},
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
        exporterPdfMaxGridWidth: 500,
        exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
        }
    };

    $scope.CCPsIMDFCurrencies.gridOptions.data = [
        {
            preferedCurrency : "IM Preferred currency",
            currency : {key: "GBP"}
        },
        {
            preferedCurrency : "Buffer Preferred currency",
            currency : {key: "USD"}
        },
        {
            preferedCurrency : "Default Fund Preferred currency",
            currency : {key: "EUR"}
        },
        {
            preferedCurrency: "Intraday Preferred currency",
            currency: {key: "GBP"}
        }

    ];

}]);
