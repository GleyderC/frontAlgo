'use strict';

var DashboardApps = angular.module('DashboardApp');


DashboardApps.controller('ScheduledTaskListController', [ '$scope',
    'toastr','$timeout', 'localStorageService', 'uiGridConstants','ModalService','ScheduledTaskFactory',
    function ($scope,$toastr, $timeout, localStorageService,
              uiGridConstants,$modal,ScheduledTaskFactory) {



        $scope.ScheduledTasks = [];
        $scope.gridScheduledTaskListOptions = {
            showGridFooter: true,
            paginationPageSizes: [12, 50, 100, 200, 500],
            paginationPageSize: 12,
           // enableColumnResizing: true,
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
                {field: 'id', enableCellEdit: false, width: 40},
                {name: 'Name(Type)', enableCellEdit: false,cellTemplate:"<div>{{row.entity.name}}({{row.entity.type}})</div>"},
                {field: 'to_email', enableCellEdit: false},
                {name: 'TCP/URL', enableCellEdit: false, cellTemplate:"<div>{{row.entity.to_tcp}}-{{row.entity.to_user}}</div>"},
                {field: 'securities_description', enableCellEdit: false},
                {field: 'classname', enableCellEdit: false},
                {field: 'timestamp', enableCellEdit: false},
                {field: 'cronjob', enableCellEdit: false},
                {field: 'active',

                    width: 80,
                    enableCellEdit: false,
                    cellTemplate:'' +
                    '<div ng-if="row.entity.active ==\'true\'" style=\"text-align: center;\"><span class=\"fa fa-check\"></span></div>' +
                    '<div ng-if="row.entity.active ==\'false\'" style=\"text-align: center;\"><span class=\"fa fa-ban\"></span></div>'},
                {
                    width: 150,
                    name: "Action",
                    enableCellEdit: false,
                    cellTemplate : '' +
                    '<div class="text-center"> <a ng-click="" title="View" href="#!" aria-label="View"> <button ng-click="grid.appScope.mensajeView()" class="btn btn-sm btn-primary uigrid-btn"> <i class="fa fa-file-text" aria-hidden="true"></i></button> </a>' +
                    '<a ng-click="" href="#!" title="Edit Task" aria-label="Edit Task"> <button  ng-click="grid.appScope.editRows(row)" class="btn btn-sm btn-warning uigrid-btn"> <i class="fa fa-suitcase " aria-hidden="true"></i></button> </a></div>'

                }

            ]
        };
        $scope.editRows = function (row) {
            $scope.$workspaceTabsMgm.addTabByID({
                head: {
                    icon: 'icon-graph',
                    text: 'Task Selected',
                },
                templateUrl: paths.views + "/integration_reporting/ScheduledTask/scheduled_task_edit.html",
                parameters: {
                    ScheduledTaskListSelected: row.entity
                },
                closable: true,
                autoload: true
            }, 'integration_reporting');

        };

        $scope.NewScheduledTask = function () {
            console.log();
            $scope.$workspaceTabsMgm.addTabByID({
                head: {
                    icon: 'icon-graph',
                    text: 'Add New Scheduled Task',
                },
                templateUrl: paths.views + "/integration_reporting/ScheduledTask/scheduled_task_edit.html",
                parameters: {
                    ScheduledTaskListController: "newtask"
                },
                closable: true,
                autoload: true
            }, 'integration_reporting');

        };


        $scope.taskselect = {};

        $scope.gridScheduledTaskListOptions.data = ScheduledTaskFactory.getTasklistcreated();
    }]);

DashboardApp.factory('ScheduledTaskFactory',function(){
    var data = {
    tasklistcreated : [
        { id:"01", name: 'Task 1', type: "PR" , report_id:"223" , to_email:"juan@gmail.com" ,to_user:"" ,to_password:"" ,to_tcp:"" ,securities_description:"" ,classname:"",timestamp:"01/01/2017" ,cronjob:"* * * * 1" ,active:"true"},
        { id:"02", name: 'Task 2', type: "PI" , report_id:"" , to_email:"" ,to_user:"juanftp@ftp.com" ,to_password:"123456" ,to_tcp:"FTP" ,securities_description:"Trades_valuation_excel_attached_on_margin_call_insuase_email" ,classname:"",timestamp:"02/02/2017" ,cronjob:"1-3 * * * *" ,active:"true"},
        { id:"03", name: 'Task 3', type: "CT" , report_id:"" , to_email:"" ,to_user:"" ,to_password:"" ,to_tcp:"" ,securities_description:"" ,classname:"com.myBank.customClasses.TaskX",timestamp:"03/03/2017" ,cronjob:"* * * * *" ,active:"true" },
        { id:"04", name: 'Task 4', type: "PR" , report_id:"23" , to_email:"" ,to_user:"www.juandiego.com/urluploadfiles" ,to_password:"123321" ,to_tcp:"HTTP" ,securities_description:"" ,classname:"com.myBank.customClasses.TaskX",timestamp:"03/03/2017" ,cronjob:"* * * * *" ,active:"false" },
    ]};
    return {
        getTasklistcreated: function () {
            return data.tasklistcreated;
        },
        setTasklistcreated: function (values) {
            data.tasklistcreated = values;
        }
    };

});