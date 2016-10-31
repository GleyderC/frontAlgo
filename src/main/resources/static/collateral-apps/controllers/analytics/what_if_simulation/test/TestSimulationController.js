'use strict';

var DashboardApp = angular.module('DashboardApp');


DashboardApp.controller('TestSimulationController', ['SimulationService', '$scope',
    '$timeout', 'localStorageService', 'uiGridConstants',
    function (TestSimulationService, $scope, $timeout, localStorageService, uiGridConstants) {

        /* Cargando datos en TestSimulation ui-grid*/
        $scope.TestSimulations = [];
        $scope.gridTestSimulationOptions = {
            showGridFooter: true,
            paginationPageSizes: [12, 50, 100, 200, 500],
            paginationPageSize: 12,
            enableColumnResizing: true,
            enableFiltering: true,
            rowHeight: 35, // set height to each row
            enableGridMenu: true,
            exporterCsvFilename: 'TestSimulation.csv',
            exporterPdfDefaultStyle: {fontSize: 9},
            exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
            exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
            exporterPdfHeader: {text: "TestSimulation", style: 'headerStyle'},
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
                {field: 'description', Name:"TestName",
                    sort: {
                        direction: uiGridConstants.ASC,
                        priority: 0
                    }
                },
                {
                    name: 'Run',
                    cellTemplate: '<div class="text-center"> ' +
                    '<a class="btn btn-sm green-seagreen uigrid-btn" ng-click="grid.appScope.RunTest(row.entity)" ><i class="fa fa-caret-square-o-right"></i></a> ' +
                    '</div>',
                    enableColumnMenu: false,
                    width: 180,
                    enableFiltering: false,
                    enableSorting: false
                }
            ]
        };

        $scope.gridTestSimulationOptions.data = [];

        TestSimulationService.getAllTest().then(function (result) {

            let testDescription = result.data.dataResponse;

            if(testDescription){
                testDescription.forEach(function(test){
                    $scope.gridTestSimulationOptions.data.push(test);
                });
            }
            
        });
        // Edit TestSimulation
        $scope.RunTest = function (row) {
            TestSimulationService.RunTest(row);
        };
    }]);