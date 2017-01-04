'use strict';

var DashboardApp = angular.module('DashboardApp');

DashboardApp.controller('RegisTRTradeReportingStatusController', ['$scope','localStorageService', 'uiGridConstants',
    'toastr', 'TestData',
    function ($scope, localStorage,uiGridConstants,$toastr,TestData) {

        $scope.gridTradeOptions = {
            columnDefs: [
                {
                    field: 'TradeId',
                    name: 'Trade Id'
                },
                {
                    field: 'Status',
                    name: 'Status'
                },
                {
                    name: "Action",
                    cellTemplate : '' +
                    '<div class="text-center"> <a ng-click="" href="#!" title="View" aria-label="View"> <button class="btn btn-sm btn-primary uigrid-btn"> <i class="fa fa-file-text" aria-hidden="true"></i></button> </a>' +
                    '<a ng-click="" href="#!" title="Report" aria-label="Report"> <button class="btn btn-sm btn-success uigrid-btn"> <i class="fa fa-play" aria-hidden="true"></i></button> </a> </div>'

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
        $scope.gridTradeOptions.data=TestData.getTestdata();

    }]);

