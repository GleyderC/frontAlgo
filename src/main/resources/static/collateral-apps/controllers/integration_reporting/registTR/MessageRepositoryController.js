'use strict';

var DashboardApp = angular.module('DashboardApp');

DashboardApp.controller('RegisTRMessageRepositoryController', ['$scope','localStorageService', 'uiGridConstants',
    'toastr','TestData',
    function ($scope, localStorage,uiGridConstants,$toastr,TestData) {

        $scope.gridMessagesOptions = {
            columnDefs: [
                {
                    field: 'DateTime',
                    name: 'Date Time'
                },
                {
                    field: 'MessageType',
                    name: 'Message Type'
                },
                {
                    field: 'Direcction',
                    name: 'Direcction'
                },
                {
                    field: 'Format',
                    name: 'Format'
                },
                {
                    field: 'Description',
                    name: 'Description'
                },
                {
                    field: 'Status',
                    name: 'Status'
                },
                {
                    name: "Action",
                    cellTemplate : '<div class="text-center"> <a ng-click="" href="#!" aria-label="View"> <button class="btn btn-sm btn-primary uigrid-btn"> <i class="fa fa-file-text" aria-hidden="true"></i></button> </a>'

                }
            ],
            data: [],
            rowHeight: 35, // set height to each row
            enableHorizontalScrollbar : 0,
            enableVerticalScrollbar: 2,
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
            }
        };
        $scope.gridMessagesOptions.data=TestData.getTestdata();

    }]);

