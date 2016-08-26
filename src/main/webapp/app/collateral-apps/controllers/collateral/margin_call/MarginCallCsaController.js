'use strict';

var DashboardApp = angular.module('DashboardApp');

DashboardApp.controller('MarginCallCsaController', ['$scope', 'uiGridConstants', 'MarginCallService','$timeout','SecurityService','ModalService',
    function ($scope, uiGridConstants, MarginCallService, $timeout,Security,ModalService) {
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
				{ name: "coupon",  field : "coupon" } ,
				{ name: "frequency",  field : "frequency" } ,
				{ name: "quantity",  field : "quantity" } ,
				{ name: "lotSize",  field : "lotSize" } ,
				{ name: "notional",  field : "notional" } ,
				{ name: "price",  field : "price" } ,
				{ name: "amount",  field : "amount" } ,
				{ name: "npvBaseCurrency",  field : "npvBaseCurrency" } ,
				{ name: "baseCurrrency",  field : "baseCurrrency" } ,
				{ name: "SPrating",  field : "SPrating" } ,
				{ name: "folder",  field : "folder" } 
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
            	                templateUrl: paths.views + "/configuration/Security/modal_form.html",
            	                size: 'lg',
            	                rendered: function () {
            	                    App.initComponents();
            	                },
            	                controllerAs: 'SecurityController'
            	                    
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
					{ name: "coupon",  field : "coupon" } ,
					{ name: "frequency",  field : "frequency" } ,
					{ name: "quantity",  field : "quantity" } ,
					{ name: "lotSize",  field : "lotSize" } ,
					{ name: "notional",  field : "notional" } ,
					{ name: "price",  field : "price" } ,
					{ name: "amount",  field : "amount" } ,
					{ name: "npvBaseCurrency",  field : "npvBaseCurrency" } ,
					{ name: "baseCurrrency",  field : "baseCurrrency" } ,
					{ name: "SPrating",  field : "SPrating" } ,
					{ name: "folder",  field : "folder" } 
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
	            	                templateUrl: paths.views + "/configuration/Security/modal_form.html",
	            	                size: 'lg',
	            	                rendered: function () {
	            	                    App.initComponents();
	            	                },
	            	                controllerAs: 'SecurityController'
	            	                    
	            	            });
	            			}
	            		});
	            		}
					});        
				}
	};
	$scope.$watchCollection('$parent.post',function(newV,oldV){
			if(oldV == newV){
				return false;
			}
			$scope.gridMCCsaAllocPosted.data = newV;
//			angular.forEach($scope.gridMCCsaAllocPosted.data, function(row) {
//			    row.getNotional= function() {
//			      return row.lotSize * row.quantity;
//			    };
//			    row.getAmount = function() {
//			      return row.getNotinal() * row.price;
//			    };
//			  });
	});
	$scope.$watchCollection('$parent.receive',function(newV,oldV){
		if(oldV == newV){
			return false;
		}
		$scope.gridMCCsaAllocReceived.data = newV;
//		angular.forEach($scope.gridMCCsaAllocReceived.data, function(row) {
//		    row.getNotional= function() {
//		      return row.lotSize * row.quantity;
//		    };
//		    row.getAmount = function() {
//			      return row.getNotinal() * row.price;
//			    };
//		    
//		  });
	});
}]);