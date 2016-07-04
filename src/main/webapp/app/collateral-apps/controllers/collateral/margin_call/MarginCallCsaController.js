'use strict';

var DashboardApp = angular.module('DashboardApp');

DashboardApp.controller('MarginCallCsaController', ['$scope', 'uiGridConstants', 'MarginCallService','$timeout',
    function ($scope, uiGridConstants, MarginCallService, $timeout) {
	
	$scope.gridMCCsaAllocPosted = {
			columnDefs: [
{ name: "isin",  field : "isin" } ,
{ name: "currency",  field : "currency" } ,
{ name: "sense",  field : "sense" } ,
{ name: "description",  field : "description" } ,
//{ name: "date",  field : "date" } ,
//{ name: "maturity",  field : "maturity" } ,
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
//{ name: "issuer",  field : "issuer" } ,
//{ name: "custody",  field : "custody" } ,
{ name: "folder",  field : "folder" } 
			             ],
		    onRegisterApi  : function(gridApi){
		    	
		    }
			
	};
	$scope.gridMCCsaAllocReceived = {
			columnDefs : [
{ name: "isin",  field : "isin" } ,
{ name: "currency",  field : "currency" } ,
{ name: "sense",  field : "sense" } ,
{ name: "description",  field : "description" } ,
//{ name: "date",  field : "date" } ,
//{ name: "maturity",  field : "maturity" } ,
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
//{ name: "issuer",  field : "issuer" } ,
//{ name: "custody",  field : "custody" } ,
{ name: "folder",  field : "folder" } 
			              ]
			
	};
	
	
	MarginCallService.getDetail($scope.currentMarginCall.marginCalls[0].id).success(function(result){
		
		$scope.gridMCCsaAllocPosted.data = result.dataResponse.postedCollateral;
		$scope.gridMCCsaAllocReceived.data = result.dataResponse.receivedCollateral;
	}) ;
}]);