'use strict';

var DashboardApp = angular.module('DashboardApp');

DashboardApp.controller('MarginCallPoolController', ['$scope', 'uiGridConstants', 'MarginCallService','$timeout',
    function ($scope, uiGridConstants, MarginCallService, $timeout) {

	$scope.gridMCCsaPool = {
			columnDefs :[
				{ name :"collateralLiabilityType", field : "collateralLiabilityType"},
				{ name :"isin", field : "isin"},
				{ name :"type", field : "type"},
				{ name :"country", field : "country"},
				{ name :"description", field : "description"},
				{ name :"haircut", field : "haircut"},
				{ name :"quantity", field : "quantity"},
				{ name :"lotSize", field : "lotSize"},
				{ name :"notional", field : "notional"},
				{ name :"price", field : "price"},
				{ name :"amount", field : "amount"},
				{ name :"moodysRating", field : "moodysRating"}
	],
	onRegisterApi  : function(gridApi){
		
	}

	};

	$scope.$parent.$watchCollection('pool', function (newPool, oldPool) {
	    if (newPool === oldPool) {
	        return false;
	        
	    }
	    $scope.gridMCCsaPool.data  = newPool;
	});
}]);