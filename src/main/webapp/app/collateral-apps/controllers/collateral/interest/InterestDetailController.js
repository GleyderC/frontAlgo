'use strict';

InterestCtrl.controller('InterestDetailController', 
		[ '$scope','uiGridConstants','AgreementsService','InterestService',
		function($scope, uiGridConstants,Agreements,Interest) {

			   $scope.$on('$includeContentLoaded', function () {

               });
			   $scope.currentContract = $scope.parameters;
			 /// Detail
            $scope.InterestDataContract = $scope.currentContract.collateralContract;
            $scope.InterestData = {};
            $scope.InterestDataGrid = [];
            $scope.InterestCumulative  = 0 ;
            $scope.InterestCumulativeAdjustment  = 0 ;
            $scope.InterestTotal  =  0 ;
            $scope.startDate = new Date($scope.currentContract.collateralContract.contractDate.iLocalMillis);
//            $scope.endDate 	 = new Date($scope.currentContract.endDate.iLocalMillis);
            
            $scope.reCalculateInterest = function(){
            	$scope.InterestCumulativeAdjustment = 0 ;
            	$scope.InterestDataGrid.forEach(function(v,k){
            		$scope.InterestCumulativeAdjustment += v.dailyAccrual
            		v.cumulative = $scope.InterestCumulativeAdjustment;
            	});
            };	
            
            
            Interest.getInterest(moment().format("YYYY-MM-DD"),
            					$scope.currentContract.collateralContract.internalId,
            					$scope.currentContract.collateralContract.baseCurrency,
            					$scope.currentContract.collateralLiabilityType)
	            			  
	                .success(function(data){
	                	$scope.InterestData   = data.dataResponse.ownInterestOnCashCollateral;
	                	$scope.InterestCumulative = 0;
	                	$scope.InterestTotal  = data.dataResponse.ownCalculatedTotalInterest;
	                	$scope.endDate 	 = new Date(data.dataResponse.endDate.iLocalMillis);
	                	$scope.InterestData.forEach(function(v,k){
	                    	$scope.InterestCumulative += v.interest;
	                    	if(v.isCompounding){
                                let basis = 0  ;
//	                    		   Interest(dailyAccrual) = AppliedRate  *  numDeDías(siempre 1) * (1/360 o 1/365) * (amount + acumuladoHastaLaFecha)
	                    		if(v.basisCalculationConvetion==="ACT_360"){
	                    			basis =  1/360; 
	                    		}else{
	                    			basis = 1/365;
	                    		}
	                    		var interest =  v.appliedRate  * 1 *(basis) *  (v.postedAmount + $scope.InterestAcumulative);
	                    	}else{
	                    		var interest =  v.interest;
	                    	}
	                		 $scope.InterestDataGrid.push({
	                    		 date : new Date(v.day.iLocalMillis), 
	                    		 currency : v.currency ,
	                    		 balance:  v.postedAmount,
	                    		 benchmark  :  v.appliedRate -( v.spread * 0.01),
	                    		 dailyAccrual : interest,
	                    		 spread : v.spread,
	                    		 applied : v.appliedRate,
	                    		 cumulative : $scope.InterestCumulative,
	                    		 basisCalculationConvention :v.basisCalculationConvention 
	                    	 })
	                	});
	                    	
            });
            
            $scope.gridInterest = {

                    enableFiltering: true,
                    data: $scope.InterestDataGrid,
                    columnDefs: [
                        {
                            name: 'Date',
                            field: 'date',
                            type : "date",
                            enableFiltering: false,
                            headerCellClass: $scope.highlightFilteredHeader,
                            enableCellEdit: false,
                            sort: {
                                direction: 'asc',
                                priority: 0
                            },
                            cellFilter: "date:'yyyy-MM-dd'", 
                            enableSorting:false
                        },
                        {
                            name: 'CCY',
                            enableFiltering: false,
                            field: 'currency',
                            enableCellEdit: false,
                            headerCellClass: $scope.highlightFilteredHeader
                        },	
                        {
                            name: 'Balance',
                            enableFiltering: false,
                            field: 'balance',
                            enableCellEditOnFocus : true, 
                            headerCellClass: $scope.highlightFilteredHeader,
                            cellFilter: 'currency:""', 
                            cellClass:'collateral-money'
                            
                        },
                        {
                            name: 'Benchmark %',
                            enableCellEditOnFocus : true, 
                            enableFiltering: false,
                            field: 'benchmark',
                            headerCellClass: $scope.highlightFilteredHeader,
                            
                        },
                        {
                            name: 'Spread %',
                            enableFiltering: false,
                            field: 'spread',
                            type:"number",
                            enableCellEditOnFocus: true,
                            headerCellClass: $scope.highlightFilteredHeader
                        },
                        {
                            name: 'Applied',
                            enableFiltering: false,
                            field: 'applied',
                            type:"number",
                            enableCellEdit: false,
                            headerCellClass: $scope.highlightFilteredHeader
                        },
                        {
                            name: 'Daily accrual',
                            enableFiltering: false,
                            field: 'dailyAccrual',
                            enableCellEdit: false,
                            headerCellClass: $scope.highlightFilteredHeader,
                            cellFilter: 'currency:""', 
                            type:"number"
                        },
                        {
                            name: 'Cumulative',
                            enableFiltering: false,
                            field: 'cumulative',
                            enableCellEdit: false,
                            headerCellClass: $scope.highlightFilteredHeader,
                            cellFilter: 'currency:""', cellClass:'collateral-money' 
                        },
                        {
                            name: 'Basis',
                            enableFiltering: false,
                            field: 'basisCalculationConvention',
                            enableCellEditOnFocus: true,	
                            editDropdownValueLabel: 'basis',
                            editableCellTemplate: 'ui-grid/dropdownEditor',
                        	editDropdownOptionsArray: [
                        	                           { id: 'ACT/360', basis: 'ACT/360' },
                        	                           { id: 'ACT/365', basis: 'ACT/365' }
                        	                           ],
                            headerCellClass: $scope.highlightFilteredHeader
                        }
            ]};
            $scope.isEdit   = false ;
            $scope.gridInterest.onRegisterApi = function(gridApi){
                $scope.gridApi = gridApi;
                gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {
                	$scope.reCalculateInterest();
                	colDef.cellClass = 'cell-modified';
                	$scope.isEdit  = true; 
                	$scope.$apply();
                	$scope.gridApi.core.refresh();
                	gridApi.core.notifyDataChange( uiGridConstants.dataChange.EDIT);
                  });

             };       

}]);