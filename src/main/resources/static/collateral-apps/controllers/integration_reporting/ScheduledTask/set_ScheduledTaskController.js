'use strict';

var DashboardApps = angular.module('DashboardApp');


DashboardApps.controller('setScheduledTaskController', [ '$scope',
    'toastr','$timeout', 'localStorageService', 'uiGridConstants','ModalService','MarginCallService','ScheduledTaskFactory',
    function ($scope,$toastr, $timeout, localStorageService,
              uiGridConstants,$modal,MarginCallService,ScheduledTaskFactory) {

        $scope.fileDefinitions= [];
        MarginCallService.getInputFilesDefinition().then(function (result) {

            $scope.fileDefinitions = result.data.dataResponse.fileDefinitions;
            $scope.fileDefinitions.selected = {};

        });
        //console.log($scope.parameters.ScheduledTaskListSelected.id);



        $scope.taskselect = {};
        $scope.tasklistcreated =ScheduledTaskFactory.getTasklistcreated();


        $scope.reportselect = {};
        $scope.reportslistcreated = [
            { name: 'Report 1',      email: 'juan@email.com',      date: "24/05/17" },
            { name: 'Report 2',      email: 'adam1@email.com',      date: "12/02/16" },
            { name: 'Report 3',      email: 'adam12@email.com',      date: "15/12/16" },
            { name: 'Report 4',      email: 'adam123@email.com',      date: "11/01/17" }

        ];
        $scope.myConfig = {
            allowMultiple: true
        };
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

        $scope.clear = function() {
            $scope.type.selected = undefined;
            $scope.howsend.selected = undefined;
            $scope.reportselect.selected = undefined;
            $scope.taskselect.selected = undefined;
        };

        function findValues(data, idToLookFor,valor) {
            var array = data;
            for (var i = 0; i < array.length; i++) {
                if (array[i][valor] == idToLookFor) {
                    return(array[i]);
                }
            }
        }

        if ($scope.parameters.ScheduledTaskListSelected!=null){
            $scope.taskselect.selected=$scope.parameters.ScheduledTaskListSelected;
            $scope.type.selected=findValues($scope.types,$scope.parameters.ScheduledTaskListSelected.type,"val");
            $("#scheduled-task-name").val($scope.parameters.ScheduledTaskListSelected.name);
        }else{
            console.log("vacio")
        }
        $scope.hola = function() {
            console.log($scope.parameters.ScheduledTaskListSelected.name);
        };

    }]);