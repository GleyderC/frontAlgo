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
				{ name :"haircut", field : "haircut",cellFilter: 'number:0', cellClass:'collateral-money' },
				{ name :"quantity", field : "quantity",cellFilter: 'number:0', cellClass:'collateral-money' },
				{ name :"lotSize", field : "lotSize"},
				{ name :"notional", field : "notional",cellFilter: 'number:0', cellClass:'collateral-money' },
				{ name :"price", field : "price",cellFilter: 'number:0', cellClass:'collateral-money' },
				{ name :"Amount", field : "valueInBaseCurrency",cellFilter: 'number:0', cellClass:'collateral-money' },
				{ name :"moodysRating", field : "moodysRating"},
				{ name: "Action",   cellTemplate : '<div class="text-center"> <a ng-click="grid.appScope.post(row.entity)" href="#!" aria-label="Add"><i class="fa fa-hand-pointer-o " aria-hidden="true"></i> </a>'  }
	],
		onRegisterApi  : function(gridApi){
			
		}
	};
	$scope.post = function(entity){
		var index = $scope.gridMCCsaPool.data.indexOf(entity); 
    	$scope.gridMCCsaPool.data.splice(index, 1);

	};
	MarginCallService.getDetail($scope.currentMarginCall.marginCalls[0].id).then(function (result) {
        $scope.pool  =  result.data.dataResponse.poolDisplays;
        $scope.gridMCCsaPool.data = $scope.pool;
    });
	$scope.$watchCollection('$parent.pool', function (newPool, oldPool) {
	    if (newPool === oldPool) {
	        return false;
	        
	    }
	    $scope.gridMCCsaPool.data  = newPool;
	});
}]);