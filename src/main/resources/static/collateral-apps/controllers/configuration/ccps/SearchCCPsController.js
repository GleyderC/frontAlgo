'use strict';

var DashboardApp = angular.module('DashboardApp');


DashboardApp.controller('SearchCCPsController', ['CCPsService', '$scope',
    '$timeout', 'localStorageService', 'uiGridConstants',
    function (CCPsService, $scope, $timeout, localStorageService, uiGridConstants) {

        /* Cargando datos en CCPs ui-grid*/
        $scope.CCPss = [];
        $scope.gridCCPsOptions = {
            showGridFooter: true,
            paginationPageSizes: [12, 50, 100, 200, 500],
            paginationPageSize: 12,
            enableColumnResizing: true,
            enableFiltering: true,
            rowHeight: 35, // set height to each row
            enableGridMenu: true,
            exporterCsvFilename: 'CCPs.csv',
            exporterPdfDefaultStyle: {fontSize: 9},
            exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
            exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
            exporterPdfHeader: {text: "CCPs", style: 'headerStyle'},
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
                {field: 'ccps',
                    sort: {
                        direction: uiGridConstants.ASC,
                        priority: 0
                    }
                },
                {field: 'xxx'},
                {field: 'xxx2' },
                {field: 'xxx3' },
                {field: 'xxx4' },
                {field: 'xxx5'},
                {
                    name: 'Actions',
                    cellTemplate: paths.tpls + '/ActionsButtonsTpl.html',
                    enableColumnMenu: false,
                    width: 120,
                    enableFiltering: false
                }
            ]
        };
        $scope.gridCCPsOptions.data = [];
        $scope.gridCCPsOptions.addNewRow = function (row) {
            $scope.gridCCPsOptions.data.push(row);
            return row;
        }
        $scope.CCPss = [{ccps:"SWAP Clear", desk:"IRS-ABC", dateTime:"Today 12:34", notional: "100,000.00 EUR",
            principal: "Santander Brasil", counterParty:"Telefónica", hedge:"SwaClear", status:"Booked"},
            {ccps:"EUREX", desk:"IRS-ABC", dateTime:"Today 12:34", notional: "100,000.00 EUR",
                principal: "Santander Spain", counterParty:"Banki", hedge:"SwaClear", status:"Proposal"},
            {ccps:"BME", desk:"IRS-ABC", dateTime:"Today 12:34", notional: "100,000.00 EUR",
                principal: "Santander Spain", counterParty:"Banki", hedge:"SwaClear", status:"Proposal"}];

        $scope.gridCCPsOptions.data = $scope.CCPss;

        $scope.addCCPs = function () {

            $scope.$workspaceTabsMgm.addTabByID({
                head: {
                    icon: 'fa fa-dot-circle-o',
                    text: 'New CCPs',
                },
                templateUrl: paths.views + "/configuration/ccps/ccps.html",
                parameters: {
                    AddCCPssGrid: $scope.gridCCPsOptions.addNewRow
                },
                closable: true,
                autoload: true
            }, 'configuration');

            //buildLegalData();

        }

        // Edit CCPs
        $scope.editRow = function (grid, row) {

            $scope.$workspaceTabsMgm.addTabByID({
                head: {
                    icon: 'icon-graph',
                    text: 'Editing CCPs',
                },
                templateUrl: paths.views + "/configuration/ccps/ccps.html",
                parameters: {
                    CCPs: row.entity
                },
                closable: true,
                autoload: true
            }, 'configuration');

        };
        // Delete CCPs
        $scope.deleteRow = function (grid, row) {

            var index = $scope.gridCCPsOptions.data.indexOf(row.entity);
            $scope.gridCCPsOptions.data.splice(index, 1);
            CCPsService.delete(row.entity.id);

        }

    }]);
