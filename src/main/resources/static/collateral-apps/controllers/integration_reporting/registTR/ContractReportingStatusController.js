'use strict';

var DashboardApp = angular.module('DashboardApp');

DashboardApp.controller('RegisTRContractReportingStatusController', ['$scope','localStorageService', 'uiGridConstants',
    'toastr', 'TestData',
    function ($scope, localStorage,uiGridConstants,$toastr,TestData) {

        $scope.gridContractOptions = {
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
                    '<div class="text-center"> <a ng-click="" title="View" href="#!" aria-label="View"> <button class="btn btn-sm btn-primary uigrid-btn"> <i class="fa fa-file-text" aria-hidden="true"></i></button> </a>' +
                    '<a ng-click="" href="#!" title="Report" aria-label="Report"> <button class="btn btn-sm btn-success uigrid-btn"> <i class="fa fa-play" aria-hidden="true"></i></button> </a>' +
                    '<a ng-click="" href="#!" title="Trade" aria-label="Trade"> <button class="btn btn-sm btn-warning uigrid-btn"> <i class="fa fa-suitcase " aria-hidden="true"></i></button> </a></div>'

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
        $scope.gridContractOptions.data=TestData.getTestdata();

    }]);

