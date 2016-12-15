'use strict';

var DashboardApp = angular.module('DashboardApp');


DashboardApp.controller('DealEntryListController', ['TradeDealEntryService', '$scope',
    '$timeout', 'localStorageService', 'uiGridConstants',
    function (TradeDealEntryService, $scope, $timeout, localStorageService, uiGridConstants) {

        /* Cargando datos en DealEntry ui-grid*/
        $scope.DealEntry = [];
        $scope.gridPendingProposalOptions = {
            showGridFooter: true,
            paginationPageSizes: [12, 50, 100, 200, 500],
            paginationPageSize: 12,
            enableColumnResizing: true,
            enableFiltering: true,
            rowHeight: 35, // set height to each row
            enableGridMenu: true,
            exporterCsvFilename: 'DealEntry.csv',
            exporterPdfDefaultStyle: {fontSize: 9},
            exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
            exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
            exporterPdfHeader: {text: "DealEntry", style: 'headerStyle'},
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
                {field: 'trader',
                    sort: {
                        direction: uiGridConstants.ASC,
                        priority: 0
                    }
                },
                {field: 'desk'},
                {field: 'dateTime' },
                {field: 'notional' },
                {field: 'principal' },
                {field: 'counterParty'},
                {field: 'hedge'},
                {field: 'status'},
                {
                    name: 'Take',
                    cellTemplate: '<div class="text-center"> ' +
                    '<a class="btn btn-sm green-jungle uigrid-btn" ng-click="grid.appScope.editRow(row)" ><i class="fa fa-hand-pointer-o" style="font-size: 12px;"></i></a> ' +
                    '</div>',
                    enableColumnMenu: false,
                    width: 180,
                    enableFiltering: false,
                    enableSorting: false
                }
            ]
        };
        $scope.gridPendingProposalOptions.data = [];
        $scope.gridPendingProposalOptions.addNewRow = function (row) {
            $scope.gridPendingProposalOptions.data.push(row);
            return row;
        }
        $scope.DealEntry = [{trader:"Juan Lopez", desk:"IRS-ABC", dateTime:"Today 12:34", notional: "100,000.00 EUR",
            principal: "Santander Brasil", counterParty:"Telefónica", hedge:"SwaClear", status:"Booked"},
            {trader:"Joaquin Gomez", desk:"IRS-ABC", dateTime:"Today 12:34", notional: "100,000.00 EUR",
                principal: "Santander Spain", counterParty:"Banki", hedge:"SwaClear", status:"Proposal"}];

        $scope.gridPendingProposalOptions.data = $scope.DealEntry;

        $scope.addDealEntry = function () {

            $scope.$workspaceTabsMgm.addTabByID({
                head: {
                    icon: 'fa fa-desktop',
                    text: 'New Deal Entry',
                },
                templateUrl: paths.views + "/trades/deal_entry/proposal.html",
                parameters: {
                    AddDealEntryGrid: $scope.gridPendingProposalOptions.addNewRow
                },
                closable: true,
                autoload: true
            }, 'trades');

            //buildLegalData();

        }

        // Edit DealEntry
        $scope.editRow = function (row) {

            $scope.$workspaceTabsMgm.addTabByID({
                head: {
                    icon: 'icon-graph',
                    text: 'Editing Deal Entry',
                },
                templateUrl: paths.views + "/trades/deal_entry/proposal.html",
                parameters: {
                    DealEntry: row.entity
                },
                closable: true,
                autoload: true
            }, 'trades');

        };
        // Delete DealEntry
        $scope.deleteRow = function (grid, row) {

            var index = $scope.gridPendingProposalOptions.data.indexOf(row.entity);
            $scope.gridPendingProposalOptions.data.splice(index, 1);
            TradeDealEntryService.delete(row.entity.id);

        }

        $scope.gridTradeBlotterOptions = {
            showGridFooter: true,
            paginationPageSizes: [12, 50, 100, 200, 500],
            paginationPageSize: 12,
            enableColumnResizing: true,
            enableFiltering: true,
            rowHeight: 35, // set height to each row
            enableGridMenu: true,
            exporterCsvFilename: 'DealEntry.csv',
            exporterPdfDefaultStyle: {fontSize: 9},
            exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
            exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
            exporterPdfHeader: {text: "DealEntry", style: 'headerStyle'},
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
                {field: 'trader',
                    sort: {
                        direction: uiGridConstants.ASC,
                        priority: 0
                    }
                },
                {field: 'desk'},
                {field: 'dateTime' },
                {field: 'notional' },
                {field: 'principal' },
                {field: 'counterParty'},
                {field: 'hedge'},
                {field: 'status'},
                {
                    name: 'Actions',
                    cellTemplate: paths.tpls + '/ActionsButtonsTpl.html',
                    enableColumnMenu: false,
                    width: 120,
                    enableFiltering: false
                }
            ]
        };
        $scope.gridTradeBlotterOptions.data = [];
        $scope.gridTradeBlotterOptions.addNewRow = function (row) {
            $scope.gridTradeBlotterOptions.data.push(row);
            return row;
        }

        $scope.gridTradeBlotterOptions.data = $scope.DealEntry;

    }]);
