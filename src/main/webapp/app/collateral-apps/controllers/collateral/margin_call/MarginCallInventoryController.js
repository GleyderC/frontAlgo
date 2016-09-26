'use strict';

var DashboardApp = angular.module('DashboardApp');


DashboardApp.controller('MarginCallInventoryController', ['$scope', 'uiGridConstants', 'MarginCallService','DataMCDetail',
    function ($scope, uiGridConstants, MarginCallService,Data) {
        $scope.gridInventoryOptions = {
            showGridFooter: true,
            paginationPageSizes: [15, 50, 100, 200, 500],
            paginationPageSize: 5,
            enableFiltering: false,
            rowHeight: 35, // set height to each row
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
            }
        };
        $scope.gridInventoryOptions.columnDefs = [
       
            { name: "isin",  field : "isin" } ,
            {	 name: "currency",  field : "currency" } ,
            { name: "sense",  field : "sense" } ,
            { name: "description",  field : "description" } ,
			{ name: "coupon",  field : "coupon" , cellClass: "collateral-money"} ,
			{ name: "frequency",  field : "frequency" } ,
			{ name: "quantity",  field : "quantity",cellFilter: 'number:0', cellClass:'collateral-money'  } ,
			{ name: "lotSize",  field : "lotSize" ,cellFilter:'number:2', cellClass:'collateral-money'} ,
			{ name: "notional",  field : "notional" ,cellFilter: 'number:2',cellClass:'collateral-money'} ,
			{ name: "price",  field : "price",cellFilter: 'number:2', cellClass:'collateral-money'  } ,
			{ name: "amount",  field : "amount" , cellFilter: 'number:0', cellClass:'collateral-money' } ,
			{ name: "npvBaseCurrency",  field : "npvBaseCurrency" ,cellFilter: 'number:0', cellClass:'collateral-money' } ,
			{ name: "SPrating",  field : "SPrating" } ,
			{ name: "Action",  cellTemplate : '<div class="text-center"> <a ng-click="grid.appScope.post(row.entity)" href="#!"><i class="fa fa-hand-pointer-o" aria-hidden="true"></i> </a>' },
        ];
        
        $scope.postEntity = {};
        $scope.recEntity = {};
        $scope.post = function(entity){
        	var index = $scope.gridInventoryOptions.data.indexOf(entity);
        	$scope.gridInventoryOptions.data.splice(index, 1);
        	if(entity.sense==="POSTED"){ 
        		entity.sense = "RECEIVE";
        		$scope.$parent.post.push(entity);
        		$scope.totalAmountAllocated =  $scope.totalAmountAllocated + entity.amount;
            	Data.setTotalAA($scope.totalAmountAllocated);
        	}
        	if(entity.sense==="RECEIVED"){
        		entity.sense = "PAY";
        		$scope.$parent.receive.push(entity);
        	}
        	
        };
        $scope.$watchCollection('$parent.Inventory', function (newInventory, oldInventory) {
            if (newInventory === oldInventory) {
                return false;
            }
            $scope.gridInventoryOptions.data  = newInventory; 
//            $scope.gridInventoryOptions.api.core.refresh();
//    		$scope.gridApi.core.notifyDataChange( uiGridConstants.dataChange.EDIT);
        });
}]);
