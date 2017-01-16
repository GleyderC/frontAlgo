'use strict';

var DashboardApps = angular.module('DashboardApp');


DashboardApps.controller('setScheduledTaskController', [ '$scope',
    'toastr','$timeout', 'localStorageService', 'uiGridConstants',
    function ($scope,$toastr, $timeout, localStorageService,
              uiGridConstants) {

        $scope.taskselect = {};
        $scope.tasklistcreated = [
            { name: 'Task 1', date: "24/05/17" , type:"PT" , id:"01"},
            { name: 'Task 2', date: "24/02/17" , type:"PT" , id:"02"},
            { name: 'Task 3', date: "22/02/17" , type:"CT" , id:"03"},
            { name: 'Task 4', date: "26/01/17" , type:"PT" , id:"04"},
            { name: 'Task 5', date: "12/02/17" , type:"CT" , id:"05"},

        ];


        $scope.reportselect = {};
        $scope.reportslistcreated = [
            { name: 'Reporte 1',      email: 'juan@email.com',      date: "24/05/17" },
            { name: 'Reporte 2',      email: 'adam1@email.com',      date: "12/02/16" },
            { name: 'Reporte 3',      email: 'adam12@email.com',      date: "15/12/16" },
            { name: 'Reporte 4',      email: 'adam123@email.com',      date: "11/01/17" },

        ];
        $scope.myConfig = {
            allowMultiple: true
        }
        $scope.howsend = {};
        $scope.howsends = [
            { name: 'Vía Email', val: 'email'},
            { name: 'Vía TCP/IP (SFTP,FTP,SCP,HTTP,HTTPS', val: "tcp" }
        ];

        $scope.type = {};
        $scope.types = [ // Taken from https://gist.github.com/unceus/6501985
            {name: 'Predefined Report', val: 'PR'},
            {name: 'Predefined Integration', val: 'PI'},
            {name: 'Custom Task', val: 'CT'}
         ];
    }]);