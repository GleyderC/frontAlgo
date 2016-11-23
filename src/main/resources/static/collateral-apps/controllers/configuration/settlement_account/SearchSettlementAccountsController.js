'use strict';

var DashboardApp = angular.module('DashboardApp');


DashboardApp.controller('SearchSettlementAccountsController', ['SettlementAccountService', '$scope',
    '$timeout', 'localStorageService', 'uiGridConstants',
    function (SettlementAccountService, $scope, $timeout, localStorageService, uiGridConstants) {

        /* Cargando datos en SettlementAccounts ui-grid*/
        $scope.SettlementAccounts = [];
        $scope.gridSettlementAccountsOptions = {
            showGridFooter: true,
            paginationPageSizes: [12, 50, 100, 200, 500],
            paginationPageSize: 12,
            enableColumnResizing: true,
            enableFiltering: true,
            rowHeight: 35, // set height to each row
            enableGridMenu: true,
            exporterCsvFilename: 'SettlementAccounts.csv',
            exporterPdfDefaultStyle: {fontSize: 9},
            exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
            exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
            exporterPdfHeader: {text: "SettlementAccounts", style: 'headerStyle'},
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
                {field: 'internalId',
                    sort: {
                        direction: uiGridConstants.ASC,
                        priority: 0
                    }
                },
                {field: 'beneficiary.name', name: 'beneficiary'},
                {field: 'legalEntityPointOfView.name', name: 'legalEntityPointOfView'},
                {field: 'correspondant.name', name: 'correspondant'},
                {field: 'isCash'},
                {field: 'isSecurity'},
                {field: 'settlementAccountType'},
                {
                    name: 'Actions',
                    cellTemplate: paths.tpls + '/ActionsButtonsTpl.html',
                    enableColumnMenu: false,
                    width: 120,
                    enableFiltering: false
                }
            ]
        };
        $scope.gridSettlementAccountsOptions.data = [];
        
        SettlementAccountService.getAll().then(function (result) {
            $scope.SettlementAccounts = result.data.dataResponse;
            $scope.gridSettlementAccountsOptions.data = $scope.SettlementAccounts;
            console.log($scope.SettlementAccounts);
        });

        $scope.gridSettlementAccountsOptions.addNewRow = function (row) {
            $scope.gridSettlementAccountsOptions.data.push(row);
            return row;
        }


        $scope.addSettlementAccounts = function () {

            $scope.$workspaceTabsMgm.addTabByID({
                head: {
                    icon: 'fa fa-dot-circle-o',
                    text: 'New SettlementAccounts',
                },
                templateUrl: paths.views + "/configuration/SettlementAccounts/SettlementAccounts.html",
                parameters: {
                    AddSettlementAccountssGrid: $scope.gridSettlementAccountsOptions.addNewRow
                },
                closable: true,
                autoload: true
            }, 'configuration');

            //buildLegalData();

        }

        // Edit SettlementAccounts
        $scope.editRow = function (grid, row) {

            $scope.$workspaceTabsMgm.addTabByID({
                head: {
                    icon: 'icon-graph',
                    text: 'Editing SettlementAccounts',
                },
                templateUrl: paths.views + "/analytics/what_if_SettlementAccounts/SettlementAccounts.html",
                parameters: {
                    SettlementAccounts: row.entity
                },
                closable: true,
                autoload: true
            }, 'analytics');

        };
        // Delete SettlementAccounts
        $scope.deleteRow = function (grid, row) {

            var index = $scope.gridSettlementAccountsOptions.data.indexOf(row.entity);
            $scope.gridSettlementAccountsOptions.data.splice(index, 1);
            SettlementAccountService.delete(row.entity.id);

        }

    }]);
