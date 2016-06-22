'use strict';

var DashboardApp = angular.module('DashboardApp')
//var InterestCtrl = AgreementsController
    DashboardApp.controller(
        'InterestController',
        [
            '$scope',
            '$document',
            '$timeout',
            '$request',
            '$interval',
            'localStorageService',
            'elementService',
            'uiGridConstants',
            'InterestService',
            'AgreementsService',
            function ($scope, $document, $timeout, $request,
                      $interval, $localStorage, elementService,
                      uiGridConstants,
                      Interest,
                      Agreements
                      ) {

                $scope.$on('$includeContentLoaded', function () {
                	
                });
                $scope.workspaceTabs = 
                {
                    name: 'interest-tabs',
                    active: true,
                    tabList: [{

                    	head: {
                        icon: 'fa fa-home',
                        text: "Main"
                    },
                    templateUrl: paths.views
                    + "/collateral/interest/interest_detail.html",
                    active: true
                }
                    ]
                };
                
                
                $scope.addInterestTab = function () {
                    $scope.workspaceTabs.addTab({
                            head: {
                                icon: 'icon-call-in font-dark font-green-haze',
                                text: 'Interest Detail',
                            },
                            templateUrl: paths.views
                            + "/collateral/interest/interest_detail.html",
                            closable: true
                        });

                };
              
                $scope.gridMainInterests = {
                        onRegisterApi: function(gridApi){
                            $scope.gridApi = gridApi;
                        },
                        columnDefs: [
                            {
                                name : 'Principal',
                                field: 'counterpartyA.name',
                                headerCellClass: $scope.highlightFilteredHeader
                            },
                            {
                                name : 'Fund/Clearing Broker',
                                field: 'ccpName',
                                enableFiltering:false	
                                
                            },
                            {
                                name : 'Counterparty',
                                field: 'counterpartyB.name',
                                headerCellClass: $scope.highlightFilteredHeader
                            },

                            {

                                name : 'Contract Type',
                                field: 'contractType',
                                headerCellClass: $scope.highlightFilteredHeader
                            },
                            {
                                name : 'Rating',
                                field: 'counterpartyB.riskProfile.SPRating',
                                enableFiltering: true,
                                width: 80
                            },
                            {
                                name : 'Margin Freq',
                                field: 'marginFrequency',
                                enableFiltering:false,
                                width: 80

                            },
//                            {
//                                field : "exposure",
//                                name: 'Exposure (EUR)',
//                                headerCellClass: $scope.highlightFilteredHeader,
//                                filter: {
//                                    term: '1',	
//                                    type: uiGridConstants.filter.SELECT,
//                                    selectOptions: [
//                                        { value: '1', label: 'EUR' },
//                                        { value: '2', label: 'USD' }
            //
//                                    ]
//                                }
//                            },
                            {
                                name : 'Exposure / Collateral',
                                 enableFiltering: false,
                             }  
                 ]
                };
                
                
                Agreements.getAll().success(function(data) {
                    $scope.gridMainInterests.data = data.dataResponse;
                    var arr = {}; 
                    arr["contractType"] = {}; 
                    arr["counterpartyB"] = {};
                    arr["counterpartyA"] = {};
                    data.dataResponse.forEach(function(v,k){
                    	if(v.hasOwnProperty("clearingMemberLegalEntity")){//CCPHouseAccount 
                    		v["counterpartyA"] 	= {};
                    		v["counterpartyA"]  = v.clearingMemberLegalEntity;
                    		v["counterpartyB"]  = {};
                    		v["counterpartyB"]["name"]= v.ccpName;
                    		v.ccpName  = "";
                    		//Be careful 
                    		//v["counterpartyB"]["riskProfile"]  = {};
                    		//v["counterpartyB"]["riskProfile"]["SPRating"]  = v.clearingMemberLegalEntity.riskProfile.SPRating;
                    	}
                    	if(v.hasOwnProperty("client") && v.hasOwnProperty("clearingBroker")){
                    		v["counterpartyA"] 	= {};
                    		v["counterpartyA"]  = v.client;
                    		v["contractType"] = "CCP Client Clearing"
//                    		v["clearingBroker"]  = v.clearingBroker;
                    		v["ccpName"]  = v.clearingBroker.name;
                    		v["counterpartyB"]  = {}; 
                    		v["counterpartyB"]["name"] =  v.accountName;
                    		v["counterpartyB"]["otherName"] =  v.accountName;
                    	}
                    	
                    	//Building ui grid Select for filter
                        if (v.hasOwnProperty("contractType")) {
                        	if(v.contractType.toUpperCase()==="BILATERAL"){
                        		let bilateralContractType = v.bilateralContractType;
                        		v.contractType =  v.bilateralContractType;
                        	}
                    		arr["contractType"][v.contractType] = v.contractType;
                    	}
                    	if(v.hasOwnProperty("counterpartyA")){
                    		arr["counterpartyA"][v.counterpartyA.otherName]= v.counterpartyA; 
                    	}
                    	if(v.hasOwnProperty("counterpartyB")){
                    		arr["counterpartyB"][v.counterpartyB.otherName] = v.counterpartyB; 
                    	}
                    });
//                    if(Object.keys(arr.contractType).length>0){
//                    	Object.keys(arr.contractType).forEach(function(val,k){
//                    		
//                    		$scope.contractTypeList.push({value:arr.contractType[val] , label: arr.contractType[val] })
//                    	});
//                	}
//                    if(Object.keys(arr.counterpartyA).length>0){
//                    	Object.keys(arr.counterpartyA).forEach(function(val,k){
//                    		$scope.counterPartyAList.push({value:arr.counterpartyA[val].name , label : arr.counterpartyA[val].name })
//                    	});
//                	}
//                    if(Object.keys(arr.counterpartyB).length>0){
//                    	Object.keys(arr.counterpartyB).forEach(function(val,k){
//                    		$scope.counterPartyBList.push({value:arr.counterpartyB[val].name , label : arr.counterpartyB[val].name })
//                    	});
//                	}
                });
                //                
                /// Detail
                $scope.InterestDataContract = {};
                $scope.InterestData = {};
                $scope.InterestDataGrid = [];
                $scope.InterestCumulative  = 0 ;
                $scope.InterestCumulativeAdjustment  = 0 ;
                $scope.InterestTotal  =  0 ;
                $scope.startDate = moment().format("YYYY-MM-DD").toString();
//                $scope.postedAmount;
                $scope.calculateInterest = function(){
                	$scope.InterestCumulativeAdjustment = 0 ;
                	$scope.InterestDataGrid.forEach(function(v,k){
                		$scope.InterestCumulativeAdjustment += v.dailyAccrual
                		v.cumulative = $scope.InterestCumulativeAdjustment;
                	});
                };
                Agreements.getAll().success(function(data){
                		$scope.InterestDataContract=  data.dataResponse[0];
                }).then(function(){
		                Interest.getByDateAndCollateralContractId(moment().format("YYYY-MM-DD"),$scope.InterestDataContract.internalId)
		                .success(function(data){

		                	$scope.InterestData   = data.dataResponse;
		                    $scope.currency   =  $scope.InterestDataContract.baseCurrency;
//		                	$scope.currency  = Object.keys(data.dataResponse[0].ownInterestOnPostedCash.interestByStartDateAndCurrency[moment().format("YYYY-MM-DD")])[0];
//		                    $scope.postedAmount = data.dataResponse.ownInterestOnPostedCash.interestByStartDateAndCurrency[moment().format("YYYY-MM-DD")][$scope.currency].postedAmount;
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
                            }
//                            {
//                                name: 'Action',
//                                	enableFiltering: false,
//                                	enableCellEdit: false,
//                                	cellTemplate : "<div class='text-center'><a href='#!' ng-click='grid.appScope.edit(row)'  ><i class='fa fa-pencil'></i></a></div>"
//                                	
//                            }
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
