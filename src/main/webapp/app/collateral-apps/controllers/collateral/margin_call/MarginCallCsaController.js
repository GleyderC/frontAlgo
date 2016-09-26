'use strict';

var DashboardApp = angular.module('DashboardApp');

DashboardApp.controller('MarginCallCsaController', ['$scope', 'uiGridConstants', 'MarginCallService','$timeout','SecurityService','ModalService','DataMCDetail',
    function ($scope, uiGridConstants, MarginCallService, $timeout,Security,ModalService,Data) {
	$scope.active=1;
	

	$scope.addSecurity = function() {
		if($scope.active ==2 ){
			$scope.$parent.receive.push({isin :""});
		}else{
			$scope.$parent.post.push({isin :""});
		}
		
		
		
	};
	
	$scope.gridMCCsaAllocPosted = {
			columnDefs: [
				{ name: "isin",  field : "isin",enableCellEdit:true } ,
				{ name: "currency",  field : "currency" } ,
				{ name: "sense",  field : "sense" } ,
				{ name: "description",  field : "description" } ,
				{ name: "coupon",    field : "coupon" ,cellClass: "collateral-money" ,cellFilter:'number:2'} ,
				{ name: "frequency",filter:"number:2",  field : "frequency" } ,
				{ name: "quantity",  field : "quantity",cellClass: "collateral-money" ,cellFilter:'number:0'} ,
				{ name: "lotSize",  field : "lotSize" ,cellClass: "collateral-money",cellFilter:'number:2'} ,
				{ name: "notional",  field : "notional" ,cellClass: "collateral-money",cellFilter:'number:2'} ,
				{ name: "price",  field : "price" ,cellClass: "collateral-money",cellFilter:'number:2'} ,
				{ name: "amount",  field : "amount" ,cellClass: "collateral-money",cellFilter:'number:2'} ,
				{ name: "npvBaseCurrency",  field : "npvBaseCurrency" ,cellClass: "collateral-money",cellFilter:'number:2'} ,
				{ name: "baseCurrrency",  field : "baseCurrrency" } ,
				{ name: "SPrating",  field : "SPrating" } ,
				{ name: "folder",  field : "folder" } ,
				{ name: "Action",   cellTemplate : '<div class="text-center"> <a ng-click="grid.appScope.remove(row.entity,grid)" href="#!" aria-label="Remove"><i class="fa fa-times red" aria-hidden="true"></i> </a>'  }
			],
			onRegisterApi  : function(gridApi){
				$scope.gridPostedApi = gridApi;
				gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {
            		if(newValue == oldValue){
            			return false;
            		}
            		if(colDef.name=="quantity" || colDef.name=="lotSize"){
            			rowEntity["notional"] = rowEntity["quantity"]  *rowEntity["lotSize"] ; 
            			rowEntity["amount"] = rowEntity["notional"]  *rowEntity["price"] ;
            		}
            		if(colDef.name=="price" ){
            			rowEntity["amount"] = rowEntity["notional"]  *rowEntity["price"] ;
            		}
            		if(colDef.name==="isin"){
            		Security.getByIsin(newValue).success(function(data){
            			if(data.hasOwnProperty("dataResponse")){
            				
		            			rowEntity["currency"] = data.dataResponse.currency;
		            			rowEntity["description"] = data.dataResponse.description;
		            			rowEntity["lotSize"] = data.dataResponse.lotSize;
		            			rowEntity["price"] = data.dataResponse.price;
            			}else{

            	            ModalService.open({
            	                templateUrl: paths.views + "/static_data/Security/modal_form.html",
            	                size: 'lg',
            	                rendered: function () {
            	                    App.initComponents();
            	                },
            	                controllerAs: 'SecurityController'
            	                    
            	            }).close(function(){
            	            	$scope.$parent.loadData();
            	            });
            			}
            		});
            		}
				});
			}
	};
	$scope.gridMCCsaAllocReceived = {
			columnDefs : [
					{ name: "isin",  field : "isin" } ,
					{ name: "currency",  field : "currency" } ,
					{ name: "sense",  field : "sense" } ,
					{ name: "description",  field : "description" } ,
					{ name: "coupon",  field : "coupon"   ,  cellClass:"collateral-money"} ,
					{ name: "frequency",  field : "frequency",cellClas:"collateral-money"} ,
					{ name: "quantity",  field : "quantity",cellClass:"collateral-money"} ,
					{ name: "lotSize",  field : "lotSize" , cellClass:"collateral-money"} ,
					{ name: "notional",  field : "notional",cellClass:"collateral-money"} ,
					{ name: "price",  field : "price" ,		cellClass:"collateral-money"} ,
					{ name: "amount",  field : "amount",	cellClass:"collateral-money" } ,
					{ name: "npvBaseCurrency",  field : "npvBaseCurrency" ,cellClass:"collateral-money"} ,
					{ name: "baseCurrrency",  field : "baseCurrrency", } ,
					{ name: "SPrating",  field : "SPrating" } ,
					{ name: "folder",  field : "folder" },
					{ name: "Action",   cellTemplate : '<div class="text-center"> <a ng-click="grid.appScope.remove(row.entity,grid)" href="#!" aria-label="Remove"><i class="fa fa-times red" aria-hidden="true"></i> </a>'  }
			 ],
			 onRegisterApi  : function(gridApi){
					$scope.gridReceivedApi = gridApi;
					gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {
	            		if(newValue == oldValue){
	            			return false;
	            		}
	            		if(colDef.name=="quantity" || colDef.name=="lotSize"){
	            			rowEntity["notional"] = rowEntity["quantity"]  *rowEntity["lotSize"] ; 
	            			rowEntity["amount"] = rowEntity["notional"]  *rowEntity["price"] ;
	            		}
	            		if(colDef.name=="price" ){
	            			rowEntity["amount"] = rowEntity["notional"]  *rowEntity["price"] ;
	            		}
	            		if(colDef.name==="isin"){
	            		Security.getByIsin(newValue).success(function(data){
	            			if(data.hasOwnProperty("dataResponse")){
	            				
			            			rowEntity["currency"] = data.dataResponse.currency;
			            			rowEntity["description"] = data.dataResponse.description;
			            			rowEntity["lotSize"] = data.dataResponse.lotSize;
			            			rowEntity["price"] = data.dataResponse.price;
	            			}else{

	            	            ModalService.open({
	            	                templateUrl: paths.views + "/static_data/Security/modal_form.html",
	            	                size: 'lg',
	            	                rendered: function () {
	            	                    App.initComponents();
	            	                },
	            	                controllerAs: 'SecurityController'
	            	                    
	            	            }).close(function(){
	            	            	$scope.$parent.loadData();
	            	            });
	            			}
	            		});
	            		}
					});        
				}
	};
	$scope.remove = function(entity,grid){
		var index = grid.options.data.indexOf(entity);
    	grid.options.data.splice(index, 1);
    	if(entity.sense==="RECEIVE"){ 
    		entity.sense = "POSTED";
    		$scope.$parent.Inventory.push(entity);
    		$scope.totalAmountAllocated =  $scope.totalAmountAllocated - entity.amount;
        	Data.setTotalAA($scope.totalAmountAllocated);
    	}
    	if(entity.sense==="PAY"){
    		entity.sense = "RECEIVED";
    		$scope.$parent.Inventory.push(entity);
    	}
		
	};
	$scope.$watchCollection('$parent.post',function(newV,oldV){
			if(oldV == newV){
				return false;
			}
			$scope.gridMCCsaAllocPosted.data = newV;
	});
	$scope.totalAmountAllocated  = 0;
	$scope.coverage  = 0  ;
    $scope.$watch(function () { return Data.getTotalAA(); }, function (newValue, oldValue) {
        if (newValue !== oldValue){
        	$scope.totalAmountAllocated = newValue;
        	$scope.coverage = $scope.$parent.dispute.disputeCalculations.agreedMargin - $scope.totalAmountAllocated;
        }
    });
	$scope.$watchCollection('$parent.receive',function(newV,oldV){
		if(oldV == newV){
			return false;
		}
		$scope.gridMCCsaAllocReceived.data = newV;
	});
	$scope.getBoderColor=  function(){
			if($scope.totalAmountAllocated >= $scope.$parent.dispute.disputeCalculations.agreedMargin){
				return 'border-green';
			}else{
				return 'border-red';
			}
	}
}]);