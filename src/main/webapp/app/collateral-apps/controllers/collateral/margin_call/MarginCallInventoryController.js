'use strict';

var DashboardApp = angular.module('DashboardApp');


DashboardApp.controller('MarginCallInventoryController', ['$scope', 'uiGridConstants', 'MarginCallService',
    function ($scope, uiGridConstants, MarginCallService) {
        $scope.gridInventoryOptions = {
            showGridFooter: true,
            paginationPageSizes: [15, 50, 100, 200, 500],
            paginationPageSize: 5,
            enableColumnResizing: true,
            enableFiltering: false,
            rowHeight: 35, // set height to each row
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
            }
        };
        $scope.gridInventoryOptions.columnDefs = [
            /*ISIN
             Description
             Date
             Maturity
             Currency
             Coupon
             Frecuency
             Quantity
             Lot Size
             Notional
             Price
             Amount
             NPV (EUR)
             Moody’sRating
             S&P Rating
             Emisor
             Custody
             Folder
             Sense
             Coll Type
            {field: 'isin', width: 70,
                sort: {
                    direction: uiGridConstants.ASC,
                    priority: 0
                }
            },
            {field: 'description'},
            {field: 'date'},
            {field: 'maturity' },
            {field: 'currency' },
            {field: 'coupon' },
            {field: 'frequency' },
            {field: 'quantity', cellFilter: 'number:0', cellClass:'collateral-money'},
            {field: 'lotSize' },
            {field: 'notional', width: 90, cellFilter: 'currency:""', cellClass:'collateral-money'  },
            {field: 'price', width: 90, cellFilter: 'currency:""', cellClass:'collateral-money' },
            {field: 'amount', width: 90, cellFilter: 'currency:""', cellClass:'collateral-money'  },
            {field: 'npvBaseCurrency', displayName:'Npv ('+ $scope.currentMarginCall.contract.baseCurrency +')',
                width: 90, cellFilter: 'currency:""', cellClass:'collateral-money' },
            {field: 'SPrating', name: 'SPrating' },
            {field: 'issuer' },
            {field: 'custody' },
            {field: 'folder' },
            {field: 'sense' }
            */
            { name: "isin",  field : "isin" } ,
{	 name: "currency",  field : "currency" } ,
{ name: "sense",  field : "sense" } ,
{ name: "description",  field : "description" } ,
//{ name: "date",  field : "date" } ,
//{ name: "maturity",  field : "maturity" } ,
{ name: "coupon",  field : "coupon" } ,
{ name: "frequency",  field : "frequency" } ,
{ name: "quantity",  field : "quantity",cellFilter: 'number:0', cellClass:'collateral-money'  } ,
{ name: "lotSize",  field : "lotSize" } ,
{ name: "notional",  field : "notional" } ,
{ name: "price",  field : "price",cellFilter: 'number:0', cellClass:'collateral-money'  } ,
{ name: "amount",  field : "amount" , cellFilter: 'number:0', cellClass:'collateral-money' } ,
{ name: "npvBaseCurrency",  field : "npvBaseCurrency" ,cellFilter: 'number:0', cellClass:'collateral-money' } ,
{ name: "baseCurrrency",  field : "baseCurrrency" } ,
{ name: "SPrating",  field : "SPrating" } ,
//{ name: "issuer",  field : "issuer" } ,
//{ name: "custody",  field : "custody" } ,
//{ name: "folder",  field : "folder" },
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
        });
}]);
