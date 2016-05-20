'use strict';

var DashboardApp = angular.module('DashboardApp')

DashboardApp.controller(
    'BilateralAgreementsController', [
        '$scope',
        '$document',
        '$timeout',
        '$request',
        'localStorageService',
        'DTOptionsBuilder',
        'DTColumnBuilder',
        'elementService',
        function ($scope,
                  $document,
                  $timeout,
                  $request,
                  $localStorage,
                  DTOptionsBuilder,
                  DTColumnBuilder,
                  elementService) {

            $scope.$on('$includeContentLoaded', function () {

            });

            $scope.workspaceTabs = {
                name: 'collateral-tabs',
                active: 0,
                tabList: []
            };

            $scope.addNewBillateralAgreement = function () {

                $scope.workspaceTabs.tabList.push(
                    {
                        head: {
                            icon: '',
                            text: 'New Billateral Agreement(' + ($scope.workspaceTabs.tabList.length + 1) + ')'
                        },
                        templateUrl: paths.views + "/configuration/BilateralAgreements/index.html",
                        closable: true
                    }
                );

                var offset = $("#container-tabs-bilateral-contract").offset().top;
                //elementService.scrollToElement("container-tabs-bilateral-contract", offset);
            };

            $scope.editBillateralAgreement = function () {

                $scope.workspaceTabs.tabList.push(
                    {
                        head: {
                            icon: '',
                            text: 'Editing Billateral Agreement (' + ($scope.workspaceTabs.tabList.length + 1) + ')'
                        },
                        templateUrl: paths.views + "/configuration/BilateralAgreements/index.html",
                        closable: true
                    }
                );

                var offset = $("#container-tabs-bilateral-contract").offset().top;
                //elementService.scrollToElement("container-tabs-bilateral-contract", offset);

            };

        }]);


DashboardApp.controller(
    'BAFormController', [
        '$scope',
        '$document',
        '$timeout',
        '$request',
        'localStorageService',
        'DTOptionsBuilder',
        'DTColumnBuilder',
        function ($scope,
                  $document,
                  $timeout,
                  $request,
                  $localStorage,
                  DTOptionsBuilder,
                  DTColumnBuilder) {

            $scope.$on('$includeContentLoaded', function () {

            });

            $scope.workspaceTabs = {
                name: 'collateral-tabs',
                active: 0,
                tabList: [
                    {
                        head: {
                            icon: 'glyphicon-blackboard',
                            text: 'Main'
                        },
                        templateUrl: paths.views + "/configuration/BilateralAgreements/le_bilateral_a_main.html"
                    },
                    {
                        head: {
                            icon: 'glyphicon-list-alt',
                            text: 'CSA Margin'
                        },
                        templateUrl: paths.views + "/configuration/BilateralAgreements/le_bilateral_a_csa_margins.html"
                    },
                    {
                        head: {
                            icon: 'glyphicons-piggy-bank',
                            text: 'Eligible currencies'
                        },
                        templateUrl: paths.views + "/configuration/BilateralAgreements/le_bilateral_a_eligible_currencies.html"
                    },
                    {
                        head: {
                            icon: 'glyphicon-eye-open',
                            text: 'Eligible securities'
                        },
                        templateUrl: paths.views + "/configuration/BilateralAgreements/le_bilateral_a_eligible_securities.html"
                    }
                ]
            };

        }]);

DashboardApp.controller('LEBillateralAgrEligibleCurrenciesController', ['$scope', '$request', '$interval', function ($scope, $request, $interval) {

    $scope.editRow = function (grid, row) {
        console.log("editing")
    }

    $scope.deleteRow = function (grid, row) {
        console.log("deleting")
    }

    $scope.gridOptions = {
        columnDefs: [
            {name: 'Currency'},
            {name: 'Type'},
            {name: 'Fixed Rate'},
            {name: 'Index'},
            {name: 'Tenor'},
            {name: 'Source'},
            {name: 'Factor'},
            {name: 'Compound'},
            {name: 'Included'},
            {name: 'Projected'},
            {name: 'Adjustment Currency'},
            {
                name: 'Actions',
                cellTemplate: paths.tpls + '/ActionsButtonsTpl.html',
                enableColumnMenu: false,
                width: 160
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
            // call resize every 500 ms for 5 s after modal finishes opening
            $interval( function() {
                $scope.gridApi.core.handleWindowResize();
            }, 1000, 10);
        }
    };

    $scope.gridOptions.data = [];

}]);

DashboardApp.controller('LEBillateralAgrEligibleSecuritiesController', ['$scope', '$request', '$interval', function ($scope, $request, $interval) {

    $scope.gridOptions = {

        columnDefs: [
            {
                field: 'collateralType',
                name: 'Collateral Type'
            },
            {
                name: 'Eligible',
                cellTemplate: '<input type="checkbox" />',
                enableColumnMenu: false
            },
            {
                name: 'Haircut',
                cellTemplate: '<input type="text" />',
                enableColumnMenu: false
            },
            {
                name: 'Haircut Type',
                cellTemplate: '<input type="text" />',
                enableColumnMenu: false
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
            // call resize every 500 ms for 5 s after modal finishes opening
            $interval( function() {
                $scope.gridApi.core.handleWindowResize();
            }, 1000, 10);
        }
    };

    $scope.gridOptions.data = [
        {
            collateralType: "USA Bonds",
        },
        {
            collateralType: "France Bonds",
        },
        {
            collateralType: "Equity Options",
        },
        {
            collateralType: "MBS",
        },
        {
            collateralType: "European Equity",
        }
    ];

}]);

