'use strict';

InterestCtrl.controller('InterestDetailController', 
		[ '$scope','uiGridConstants','AgreementsService','InterestService',
		function($scope, uiGridConstants,Agreements,Interest) {
			
			 /// Detail
            $scope.InterestDataContract = {};
            $scope.InterestData = {};
            $scope.InterestDataGrid = [];
            $scope.InterestCumulative  = 0 ;
            $scope.InterestCumulativeAdjustment  = 0 ;
            $scope.InterestTotal  =  0 ;
            $scope.startDate = moment().format("YYYY-MM-DD").toString();
            $scope.calculateInterest = function(){
            	$scope.InterestCumulativeAdjustment = 0 ;
            	$scope.InterestDataGrid.forEach(function(v,k){
            		$scope.InterestCumulativeAdjustment += v.dailyAccrual
            		v.cumulative = $scope.InterestCumulativeAdjustment;
            	});
            };
         
	                Interest.getByCollateralContract(moment().format("YYYY-MM-DD"),$scope.currentContract.internalId)
	                .success(function(data){
	                	$scope.InterestData   = data.dataResponse;
	                    $scope.currency   =  $scope.InterestDataContract.baseCurrency;
//	                	$scope.currency  = Object.keys(data.dataResponse[0].ownInterestOnPostedCash.interestByStartDateAndCurrency[moment().format("YYYY-MM-DD")])[0];
//	                    $scope.postedAmount = data.dataResponse.ownInterestOnPostedCash.interestByStartDateAndCurrency[moment().format("YYYY-MM-DD")][$scope.currency].postedAmount;
	                    let interestByDate = $scope.InterestData.ownInterestOnPostedCash.interestByStartDateAndCurrency;
	                    let dateKeys = Object.keys(interestByDate);
	                    $scope.InterestTotal = data.dataResponse.ownCalculatedTotalPostedInterestByCurrency[$scope.currency];
	                    dateKeys.forEach(function(v,k){
	                    	let ccy = Object.keys(interestByDate[v])[0];//currency
	                    	$scope.InterestCumulative += interestByDate[v][ccy].interest;
	                    	 $scope.InterestDataGrid.push({
	                    		 date : v, 
	                    		 currency : ccy ,
	                    		 balance:  interestByDate[v][ccy].postedAmount,
	                    		 benchmark  :  interestByDate[v][ccy].appliedRate -( interestByDate[v][ccy].spread * 0.01),
	                    		 dailyAccrual : interestByDate[v][ccy].interest,
	                    		 spread : interestByDate[v][ccy].spread,
	                    		 applied : interestByDate[v][ccy].appliedRate,
	                    		 cumulative : $scope.InterestCumulative,
	                    		 basisCalculationConvention :interestByDate[v][ccy].basisCalculationConvention 
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
                        },
                        {
                            name: 'Action',
                            	enableFiltering: false,
                            	enableCellEdit: false,
                            	cellTemplate : "<div class='text-center'><a href='#!' ng-click='grid.appScope.edit(row)'  ><i class='fa fa-pencil'></i></a></div>"
                            	
                        }
            ]};
            $scope.saveRow = function( rowEntity ) {
                $scope.gridApi.rowEdit.setSavePromise( $scope.gridApi.grid, rowEntity );
                
              };
            $scope.edit = function(rowHtml){
            };
            
            $scope.gridInterest.onRegisterApi = function(gridApi){
                $scope.gridApi = gridApi;
                gridApi.rowEdit.on.saveRow($scope, $scope.saveRow);

                gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {
                	$scope.calculateInterest();
                	colDef.cellClass = 'cell-modified';
                	console.log(colDef);
                	$scope.$apply();
                	$scope.gridApi.core.refresh();
                	gridApi.core.notifyDataChange( uiGridConstants.dataChange.EDIT);
                  });

             };       

}]);