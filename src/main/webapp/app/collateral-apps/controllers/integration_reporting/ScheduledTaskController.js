'use strict';

var DashboardApp = angular.module('DashboardApp');


DashboardApp.controller('SearchScheduledTaskController', ['ScheduledTaskService', '$scope', 'elementService',
    '$timeout', 'localStorageService', 'uiGridConstants','RowEditorModalService',
    function (ScheduledTaskService, $scope, elementService, $timeout, localStorageService,
              uiGridConstants,RowEditorModalService) {

        /* Cargando datos en ScheduledTask ui-grid*/
        $scope.ScheduledTasks = [];
        $scope.gridScheduledTaskOptions = {
            showGridFooter: true,
            paginationPageSizes: [12, 50, 100, 200, 500],
            paginationPageSize: 12,
            enableColumnResizing: true,
            enableFiltering: true,
            rowHeight: 35, // set height to each row
            enableGridMenu: true,
            exporterCsvFilename: 'scheduled_task.csv',
            exporterPdfDefaultStyle: {fontSize: 9},
            exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
            exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
            exporterPdfHeader: {text: "Scheduled Task", style: 'headerStyle'},
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
                {field: 'id', enableCellEdit: false, width: 110},
                {
                    field: 'scheduledTaskType', enableCellEdit: false,
                    sort: {
                        direction: uiGridConstants.ASC,
                        priority: 0
                    }
                },
                {field: 'time', enableCellEdit: false, cellFilter: "date:'hh:mm:ss'"},
                {field: 'standardReportType', enableCellEdit: false},
                {field: 'importDocumentType', enableCellEdit: false},
                {
                    name: 'Action',
                    cellTemplate: '<div class="text-center"> ' +
                    '<button class="btn btn-sm btn-primary uigrid-btn" ng-click="grid.appScope.editRow(grid, row)"><i class="fa fa-edit"></i></button>'+
                    '<button class="btn btn-sm btn-danger uigrid-btn" ng-click="grid.appScope.deleteRow(grid, row)"><i class="fa fa-trash-o"></i></button>'+
                    '<a title="Run Task" ng-click="grid.appScope.RunTask(row.entity)" class="btn btn-sm green-jungle uigrid-btn">' +
                    '   <i class="fa fa-play"></i>' +
                    '</a>' +
                    '<a title="View Log" ng-click="grid.appScope.ViewLog(grid, row)" class="btn btn-sm blue-madison uigrid-btn">' +
                    '   <i class="fa fa-eye"></i>' +
                    '</a>' +
                    '</div>',
                    enableColumnMenu: false,
                    width: 180,
                    enableFiltering: false,
                    enableSorting: false
                }
            ]
        };

        //set templateUrl with id modal edit
        RowEditorModalService.templateUrl = 'view-log.html';

        $scope.ViewLog = function (grid, row) {
            RowEditorModalService.openModal(grid, row, 'sm', true);
        }

        $scope.RunTask = function (task) {
            ScheduledTaskService.runTask(task.id).then(function (result) {
                let Task = result.data.dataResponse;
                if(Task != null){
                    console.log(Task.log);

                    let log = $scope.ScheduledTasks.filter(function (Task) {
                        return Task.TaskLog == Task.log;
                    });
                    console.log(log);
                }
            });

        }
        ScheduledTaskService.getAll().then(function (result) {
            let ScheduledTasks = result.data.dataResponse;

            ScheduledTasks.forEach(function (ScheduledTask) {
                if(ScheduledTask != null) {

                    ScheduledTask.time = new Date(ScheduledTask.actionTime.iLocalMillis).getTime();
                    $scope.ScheduledTasks.push(ScheduledTask);
                }

            })
            $scope.gridScheduledTaskOptions.data = $scope.ScheduledTasks;

        });

        $scope.addScheduledTask = function (element) {

            if (!element) {
                //toastr.warning('Your computer is about to explode!', 'Warning', {closeButton: true});
                console.log("Problemas al recibir el elemento");
                return false;
            }

            $scope.$workspaceTabsMgm.addTab({
                head: {
                    icon: 'fa fa-bank',
                    text: 'New Scheduled Task Entity',
                },
                templateUrl: paths.views + "/static_data/le_form_container.html",
                closable: true,
                autoload: true
            }, [3, 1]);

            //buildLegalData();

        }

        // Edit ScheduledTask
        $scope.editRow = function (grid, row) {

            $scope.$workspaceTabsMgm.addTab({
                head: {
                    icon: 'fa fa-bank',
                    text: 'Editing Scheduled Task',
                },
                templateUrl: paths.views + "/static_data/ScheduledTask/le_form_container.html",
                parameters: {
                    ScheduledTask: row.entity
                },
                closable: true,
                autoload: true
            }, [3, 1]);

        };

    }]);

DashboardApp.controller('ScheduledTaskController', ['ScheduledTaskService', '$scope', 'elementService',
    '$timeout', 'localStorageService', 'uiGridConstants',
    function (ScheduledTaskService, $scope, elementService, $timeout, localStorageService, uiGridConstants) {

        $scope.$on('$includeContentLoaded', function () {
            App.initAjax();
        });

        $scope.legalEntities = [];

        ScheduledTaskService.getAll().then(function (result) {
            let legalEntities = result.data.dataResponse;

            legalEntities.forEach(function (ScheduledTask) {

                if(ScheduledTask != null){
                    $scope.ScheduledTasks.push(ScheduledTask);

                }

            });

        });

        buildLegalData();

        function buildLegalData() {

            $scope.country = {selected: {id: -1}};

            $scope.ScheduledTask =
            {

            };
            $scope.isEditTask = false;

            //console.log($scope.legalEntities);

        }

        $scope.booleanValue = function (row) {
            return row.entity.isBranch ? 'Yes' : 'No';
        };

        $scope.saveScheduledTask = function (ScheduledTask) {

            if (!$scope.isEditLegal) {
                $scope.gridScheduledTaskOptions.data.push(ScheduledTask);
            }
            ScheduledTaskService.set(ScheduledTask, $scope.isEditLegal);

            buildLegalData();
        }

        // Delete ScheduledTask
        $scope.deleteRow = function (grid, row) {

            var index = $scope.gridScheduledTaskOptions.data.indexOf(row.entity);
            $scope.gridScheduledTaskOptions.data.splice(index, 1);
            ScheduledTaskService.delete(row.entity.id);

        }

        $scope.cancel = function () {
            buildLegalData();
        }

        //#### Editing a Legal Entity ####
        if (!$scope.parameters.ScheduledTask)
            return false;

        $scope.ScheduledTask = $scope.parameters.ScheduledTask;

        $scope.isEditTask = true;

    }]);
