'use strict';

var DashboardApp = angular.module('DashboardApp');

DashboardApp.controller('BoViewController', ['$scope','localStorageService', 'uiGridConstants',
    'toastr','TradeService',
    function ($scope, localStorage,uiGridConstants,$toastr,TradeService) {

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
                {field: 'Trader'},
                {field: 'Desk'},
                {field: 'DateTime'},
                {field: 'Notional'},
                {field: 'Principal'},
                {field: 'Client'},
                {field: 'Counterparty'},
                {field: 'Mercado'},
                {field: 'Producto'},
                {field: 'Vencimiento'},
                {field: 'Precio'},
                {field: 'Sentido'},
                {field: 'Status'},
                {name: "Action",
                    cellTemplate : '<div class="text-center"> <a aria-label="Edit"> <button class="btn btn-sm btn-primary uigrid-btn" ng-click="grid.appScope.editRow(row)"> <i class="fa fa-file-text" aria-hidden="true"></i></button> </a>'
                }
            ]
        };
        $scope.gridTradeStatusOptions.data = [];
        $scope.gridTradeStatusOptions.data=TradeService.getTestdata();

        $scope.mensajeView = function() {
            $toastr.info("Edit Trade","Information",{closeButton: true});
        };


        $scope.editRow = function (row) {

            $scope.$workspaceTabsMgm.addTabByID({
                head: {
                    icon: 'icon-graph',
                    text: 'Editing Trade Status',
                },
                templateUrl: paths.views + "/trades/bo_view/trade_status_edit.html",
                parameters: {
                    BoViewController: row.entity
                },
                closable: true,
                autoload: true
            }, 'back_office');

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
        $scope.gridCashFlowViewOptions.data=TradeService.getTestdata();

        $scope.mensajeViewCashFlow = function() {
            $toastr.info("Edit CashFlow","Information",{closeButton: true});
        };

    }]);