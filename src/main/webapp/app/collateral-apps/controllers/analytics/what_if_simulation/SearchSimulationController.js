'use strict';

var DashboardApp = angular.module('DashboardApp');


DashboardApp.controller('SearchSimulationController', ['SimulationService', '$scope',
    '$timeout', 'localStorageService', 'uiGridConstants',
    function (SimulationService, $scope, $timeout, localStorageService, uiGridConstants) {

        /* Cargando datos en simulation ui-grid*/
        $scope.Simulations = [];
        $scope.gridSimulationOptions = {
            showGridFooter: true,
            paginationPageSizes: [12, 50, 100, 200, 500],
            paginationPageSize: 12,
            enableColumnResizing: true,
            enableFiltering: true,
            rowHeight: 35, // set height to each row
            enableGridMenu: true,
            exporterCsvFilename: 'simulation.csv',
            exporterPdfDefaultStyle: {fontSize: 9},
            exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
            exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
            exporterPdfHeader: {text: "Simulation", style: 'headerStyle'},
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
                {field: 'DateTime' },
                {field: 'notional' },
                {field: 'principal' },
                {field: 'counterparty'},
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
        $scope.gridSimulationOptions.data = [];
        $scope.gridSimulationOptions.addNewRow = function (row) {
            $scope.gridSimulationOptions.data.push(row);
            return row;
        }
        $scope.Simulations = [{trader:"Juan Lopez", desk:"IRS-ABC", dateTime:"Today 12:34", notional: "100,000.00 EUR",
            principal: "Santander Brasil", counterParty:"Telefónica", hedge:"SwaClear", status:"Booked"},
            {trader:"Joaquin Gomez", desk:"IRS-ABC", dateTime:"Today 12:34", notional: "100,000.00 EUR",
                principal: "Santander Spain", counterParty:"Banki", hedge:"SwaClear", status:"Propusal"}];

        $scope.gridSimulationOptions.data = $scope.Simulations;


        /*SimulationService.getAll().then(function (result) {
            $scope.Simulations = result.data.dataResponse;

            $scope.Simulations.forEach(function (Simulation) {
                if (Simulation != null) {

                    angular.forEach(Simulation.roleList, function (rolLegal, key) {

                        angular.forEach(localStorageService.get('RolType'), function (rol) {
                            if (rolLegal.roleType != undefined && rolLegal.roleType.toUpperCase() == rol.name.toUpperCase()) {
                                Simulation.roleList[key].name = rol.name;
                                Simulation.roleList[key].key = rol.key;
                            }
                        });

                    });

                    //Insert mother Legal Entity
                    var MotherLegal = $scope.Simulations.filter(function (legal) {
                        if (legal.id == Simulation.motherSimulation)
                            return legal.name;
                        else return "";

                    });

                    if (MotherLegal[0]) {
                        Simulation.namemotherSimulation = MotherLegal[0].name;
                    }
                }

            });
            $scope.gridSimulationOptions.data = $scope.Simulations;

        });*/

        $scope.addSimulation = function () {

            $scope.$workspaceTabsMgm.addTabByID({
                head: {
                    icon: 'fa fa-desktop',
                    text: 'New Simulation',
                },
                templateUrl: paths.views + "/analytics/what_if_simulation/simulation.html",
                parameters: {
                    AddSimulationsGrid: $scope.gridSimulationOptions.addNewRow
                },
                closable: true,
                autoload: true
            }, 'analytics');

            //buildLegalData();

        }

        // Edit Simulation
        $scope.editRow = function (grid, row) {

            $scope.$workspaceTabsMgm.addTabByID({
                head: {
                    icon: 'icon-graph',
                    text: 'Editing Simulation',
                },
                templateUrl: paths.views + "/analytics/what_if_simulation/simulation.html",
                parameters: {
                    Simulation: row.entity
                },
                closable: true,
                autoload: true
            }, 'analytics');

        };
        // Delete Simulation
        $scope.deleteRow = function (grid, row) {

            var index = $scope.gridSimulationOptions.data.indexOf(row.entity);
            $scope.gridSimulationOptions.data.splice(index, 1);
            SimulationService.delete(row.entity.id);

        }

    }]);
