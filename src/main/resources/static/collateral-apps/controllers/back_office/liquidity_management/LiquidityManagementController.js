'use strict';

var DashboardApp = angular.module('DashboardApp');

DashboardApp.controller('LiquidityManagementController', ['$scope','localStorageService', 'uiGridConstants', 
        '$timeout', 'toastr','LiquidityManagementService','$document',

    function ($scope, localStorage,uiGridConstants, $timeout,$toastr,LiquidityManagementService,$document) {
        $scope.gridData  = LiquidityManagementService.getAll();

		$scope.gridLiquidityManagement = {

            paginationPageSizes: [15, 50, 100, 200, 500],
            paginationPageSize: 10,
            // enableFiltering: false,
            
            data: $scope.gridData,
            columnDefs: [
                {
                    name: 'Fecha',
                    field: 'fecha',
                   
                   
                },
                {
                    name: 'Currency',
                    field: 'currency',
                    

                },
                {
                    name: '1 Business Day',
                    field: '1st_businessday',
                    cellClass : "collateral-money",
                    cellFilter:'number:2'
                },
                {
                    name: '2 Business Day',
                    field: '2nd_businessday',
                    cellClass : "collateral-money",
                    cellFilter:'number:2'
                },
                {
                    name: '3 Business Day',
                    field: '3rd_businessday',
                    cellClass : "collateral-money",
                    cellFilter:'number:2'
                },
                {
                    name: '4 Business Day',
                   	field: '4th_businessday',
                   	cellClass : "collateral-money",
                    cellFilter:'number:2'
                },
                {
                    name: '5 Business Day',
                    field: '5th_businessday',
                    cellClass : "collateral-money",
                    cellFilter:'number:2'
                },
                {
                    name: '2 Weeks Day',
                    field: '2_weeks',
                    cellClass : "collateral-money",
                    cellFilter:'number:2'
                },
                
                {
                    name: '2 Months',
                    field: '1_month',
                    cellClass : "collateral-money",
                    cellFilter:'number:2'
                },
                {
                    name: '6 Months',
                    field: '6_months',
                    cellClass : "collateral-money",
                    cellFilter:'number:2'
                },

                {
                    name: 'Action',
                    cellTemplate: '<div class="text-center"> <button class="btn btn-sm btn-primary uigrid-btn" ng-click="grid.appScope.selectLiquidity(row.entity);" ><i class="fa fa-eye"></i></button> </div>',
                    enableColumnMenu: false,
                    enableSorting: false,
                    enabledFilter: false,
                    width: 65
                }

            ],
            rowHeight: 45,
            enableGridMenu: true,
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
                
            }

        };
        $scope.liquidity = {} ;
        $scope.selectLiquidity  = function(row){
            let offset = 30;
            let duration = 1000;
            $scope.liquidity =  row ; 
            $document.scrollToElement(angular.element(document.getElementById("table-liquidity-detail")),offset,duration);

        }
        

	}]);