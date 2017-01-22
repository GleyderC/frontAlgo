'use strict';

var DashboardApp = angular.module('DashboardApp');

DashboardApp.controller('BoViewController', ['$scope','localStorageService', 'uiGridConstants',
    'toastr','TestData',
    function ($scope, localStorage,uiGridConstants,$toastr,TestData) {

        $scope.gridTradeStatusOptions = {
            showGridFooter: true,
            paginationPageSizes: [12, 50, 100, 200, 500],
            paginationPageSize: 12,
            enableColumnResizing: true,
            enableFiltering: true,
            rowHeight: 35, // set height to each row
            enableGridMenu: true,
            exporterCsvFilename: 'TradeStatus.csv',
            exporterPdfDefaultStyle: {fontSize: 9},
            exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
            exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
            exporterPdfHeader: {text: "TradeStatus", style: 'headerStyle'},
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
            },
            columnDefs: [
                {
                    field: 'Trader',
                    name: 'Trader'
                },
                {
                    field: 'Desk',
                    name: 'Desk'
                },
                {
                    field: 'Date Time',
                    name: 'Date Time'
                },
                {
                    field: 'Notional',
                    name: 'Notional'
                },
                {
                    field: 'Principal',
                    name: 'Principal'
                },
                {
                    field: 'Client',
                    name: 'Client'
                },
                {
                    field: 'Counterparty',
                    name: 'Counterparty'
                },
                {
                    field: 'Mercado',
                    name: 'Mercado'
                },
                {
                    field: 'Producto',
                    name: 'Producto'
                },
                {
                    field: 'Vencimiento',
                    name: 'Vencimiento'
                },
                {
                    field: 'Precio',
                    name: 'Precio'
                },
                {
                    field: 'Sentido',
                    name: 'Sentido'
                },
                {
                    field: 'Status',
                    name: 'Status'
                },
                {
                    name: "Action",
                    cellTemplate : '<div class="text-center"> <a aria-label="Edit"> <button class="btn btn-sm btn-primary uigrid-btn" ng-click="grid.appScope.editRow(row)"> <i class="fa fa-file-text" aria-hidden="true"></i></button> </a>'
                }
            ]
        };
        $scope.gridTradeStatusOptions.data = [];
        $scope.gridTradeStatusOptions.data=TestData.getTestdata();

        $scope.mensajeView = function() {
            $toastr.info("Edit Trade","Information",{closeButton: true});
        };


        $scope.editRow = function (row) {

            $scope.$workspaceTabsMgm.addTabByID({
                head: {
                    icon: 'icon-graph',
                    text: 'Editing Trade Status',
                },
                templateUrl: paths.views + "/BackOffice/TradeStatusEdit.html",
                parameters: {
                    BoViewController: row.entity
                },
                closable: true,
                autoload: true
            }, 'trades');

        };

        ////////////////////////////////////////////////
        ////////////////////////////////////////////////
        ////////////////////////////////////////////////


        $scope.gridCashFlowViewOptions = {
            showGridFooter: true,
            paginationPageSizes: [12, 50, 100, 200, 500],
            paginationPageSize: 12,
            enableColumnResizing: true,
            enableFiltering: true,
            rowHeight: 35, // set height to each row
            enableGridMenu: true,
            exporterCsvFilename: 'TradeStatus.csv',
            exporterPdfDefaultStyle: {fontSize: 9},
            exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
            exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
            exporterPdfHeader: {text: "TradeStatus", style: 'headerStyle'},
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
            },
            columnDefs: [
                {
                    field: 'Trader',
                    name: 'Trader'
                },
                {
                    field: 'Desk',
                    name: 'Desk'
                },
                {
                    field: 'Date Time',
                    name: 'Date Time'
                },
                {
                    field: 'Notional',
                    name: 'Notional'
                },
                {
                    field: 'Principal',
                    name: 'Principal'
                },
                {
                    field: 'Client',
                    name: 'Client'
                },
                {
                    field: 'Counterparty',
                    name: 'Counterparty'
                },
                {
                    field: 'Mercado',
                    name: 'Mercado'
                },
                {
                    field: 'Producto',
                    name: 'Producto'
                },
                {
                    field: 'Vencimiento',
                    name: 'Vencimiento'
                },
                {
                    field: 'Precio',
                    name: 'Precio'
                },
                {
                    field: 'Sentido',
                    name: 'Sentido'
                },
                {
                    field: 'Status',
                    name: 'Status'
                },
                {
                    name: "Action",
                    cellTemplate : '<div class="text-center"> <a aria-label="Edit"> <button class="btn btn-sm btn-primary uigrid-btn" ng-click="grid.appScope.mensajeViewCashFlow()"> <i class="fa fa-file-text" aria-hidden="true"></i></button> </a>'
                }
            ]
        };
        $scope.gridCashFlowViewOptions.data = [];
        $scope.gridCashFlowViewOptions.data=TestData.getTestdata();

        $scope.mensajeViewCashFlow = function() {
            $toastr.info("Edit CashFlow","Information",{closeButton: true});
        };

    }]);

DashboardApp.factory('TestData',function(){
    var data = {
        TestData: [{"Trader":"Ramón","Desk":"FX","Date Time":"12/04/2017 12:34","Notional":10000000,"Principal":"Inversis","Client":"HedgeFund XXX","Counterparty":"BBVA","Mercado":"OTC","Producto":"FX_FWD EUR/USD 12/04/2018","Vencimiento":"12/04/2018","Precio":"1.23","Sentido":"COMPRA","Status":"B.O. POR VALIDAR"},
            {"Trader":"Ramón","Desk":"FX","Date Time":"12/04/2017 11:12","Notional":50000000,"Principal":"Inversis","Client":"","Counterparty":"BBVA","Mercado":"OTC","Producto":"FX_SPOT EUR/JPY","Vencimiento":"13/04/2017","Precio":"134.34","Sentido":"VENTA","Status":"B.O. CONFIRMADA"},
            {"Trader":"Juan","Desk":"FI_FX","Date Time":"12/04/2017 10:01","Notional":100000000,"Principal":"","Client":"HedgeFund XXX","Counterparty":"","Mercado":"EuroClear","Producto":"US TREASURY BOND 12/04/2034 1,2%","Vencimiento":"12/04/2034","Precio":"98.4","Sentido":"COMPRA","Status":"B.O. CONFIRMADA"},
            {"Trader":"Ramón","Desk":"DEPO_FX","Date Time":"12/04/2017 09:01","Notional":250000000,"Principal":"Inversis","Client":"","Counterparty":"SANTANDER","Mercado":"OTC","Producto":"DEPO USD 3M","Vencimiento":"12/07/2017","Precio":"0,01%","Sentido":"COMPRA","Status":"B.O. CONFIRMADA"}]
    };
    return {
        getTestdata: function () {
            return data.TestData;
        },
        setTestdata: function (values) {
            data.TestData = values;
        }
    };

});