'use strict';

var DashboardApp = angular.module('DashboardApp');


DashboardApp.controller('SearchProposalController', ['TradeService', '$scope',
    '$timeout', 'localStorageService', 'uiGridConstants',
    function (TradeService, $scope, $timeout, localStorageService, uiGridConstants) {

        /* Cargando datos en Proposal ui-grid*/
        $scope.Proposals = [];
        $scope.gridProposalOptions = {
            showGridFooter: true,
            paginationPageSizes: [12, 50, 100, 200, 500],
            paginationPageSize: 12,
            enableColumnResizing: true,
            enableFiltering: true,
            rowHeight: 35, // set height to each row
            enableGridMenu: true,
            exporterCsvFilename: 'Proposal.csv',
            exporterPdfDefaultStyle: {fontSize: 9},
            exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
            exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
            exporterPdfHeader: {text: "Proposal", style: 'headerStyle'},
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
                {field: 'Trader',
                    sort: {
                        direction: uiGridConstants.ASC,
                        priority: 0
                    }
                },
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
                {
                    name: 'Actions',
                    cellTemplate: paths.tpls + '/ActionsButtonsTpl.html',
                    enableColumnMenu: false,
                    width: 120,
                    enableFiltering: false
                }
            ]
        };
        $scope.gridProposalOptions.data = [];
        $scope.gridProposalOptions.addNewRow = function (row) {
            $scope.gridProposalOptions.data.push(row);
            return row;
        }
        /*$scope.Proposals = [{trader:"Juan Lopez", desk:"IRS-ABC", dateTime:"Today 12:34", notional: "100,000.00 EUR",
            principal: "Santander Brasil", counterParty:"Telefónica", hedge:"SwaClear", status:"Booked"},
            {trader:"Joaquin Gomez", desk:"IRS-ABC", dateTime:"Today 12:34", notional: "100,000.00 EUR",
                principal: "Santander Spain", counterParty:"Banki", hedge:"SwaClear", status:"Proposal"}];*/

        $scope.gridProposalOptions.data = TradeService.getTestdata();

        $scope.addProposal = function () {

            $scope.$workspaceTabsMgm.addTabByID({
                head: {
                    icon: 'fa fa-desktop',
                    text: 'New Proposal',
                },
                templateUrl: paths.views + "/trades/proposal/proposal.html",
                parameters: {
                    AddProposalsGrid: $scope.gridProposalOptions.addNewRow
                },
                closable: true,
                autoload: true
            }, 'back_office');

            //buildLegalData();

        }

        // Edit Proposal
        $scope.editRow = function (grid, row) {

            $scope.$workspaceTabsMgm.addTabByID({
                head: {
                    icon: 'icon-graph',
                    text: 'Editing Proposal',
                },
                templateUrl: paths.views + "/trades/proposal/proposal.html",
                parameters: {
                    Proposal: row.entity
                },
                closable: true,
                autoload: true
            }, 'back_office');

        };
        // Delete Proposal
        $scope.deleteRow = function (grid, row) {

            var index = $scope.gridProposalOptions.data.indexOf(row.entity);
            $scope.gridProposalOptions.data.splice(index, 1);
            ProposalService.delete(row.entity.id);

        }

    }]);
