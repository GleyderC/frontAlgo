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
//                        head: {
//                            icon: 'fa fa-home',
//                            text: 'Main'
//                        },
//                        templateUrl: paths.views
//                        + "/collateral/interest/main.html",
//                        active: true
//                    	},
//                    	{
                    	head: {
                        icon: 'fa ',
                        text: "Demo"
                    },
                    templateUrl: paths.views
                    + "/collateral/interest/interest_detail.html",
                    active: true
                }
                    ]
                };
                
                $scope.addInterestTab = function (value) {
                    $scope.workspaceTabs.addTab({
                            head: {
                                icon: 'icon-call-in font-dark font-green-haze',
                                text: 'Interest',
                            },
                            templateUrl: paths.views
                            + "/collateral/interest/index.html",
                            closable: true
//                            resolve: {
//                                formData: [
//                                    {
//                                        type: "text",
//                                        id: "le-bilateral-ag-call-issuance",
//                                        value: "Demo"
//                                    }
//                                ]
//                            }
                        });

                };

                $scope.InterestDataContract = {};
                $scope.InterestData = {};
                $scope.InterestDataGrid = [];
                $scope.InterestCumulative  = 0 ;
                $scope.InterestTotal  =  0 ;
                $scope.startDate = moment().format("YYYY-MM-DD").toString();
//                $scope.postedAmount;
                Agreements.getAll().success(function(data){
                		$scope.InterestDataContract=  data.dataResponse[0];
                }).then(function(){
		                Interest.getByDateAndCollateralContractId(moment().format("YYYY-MM-DD"),$scope.InterestDataContract.internalId)
		                .success(function(data){
		                	console.log(data);
		                	$scope.InterestData   = data.dataResponse;
		                    $scope.currency   =  $scope.InterestDataContract.baseCurrency;
		//                	$scope.currency  = Object.keys(data.dataResponse[0].ownInterestOnPostedCash.interestByStartDateAndCurrency[moment().format("YYYY-MM-DD")])[0];
//		                    $scope.postedAmount = data.dataResponse.ownInterestOnPostedCash.interestByStartDateAndCurrency[moment().format("YYYY-MM-DD")][$scope.currency].postedAmount;
		                    $scope.dateKeys = Object.keys(data.dataResponse.ownInterestOnPostedCash.interestByStartDateAndCurrency);
		                    let interestByDate =  data.dataResponse.ownInterestOnPostedCash.interestByStartDateAndCurrency;
		                    $scope.InterestTotal = data.dataResponse.ownCalculatedTotalPostedInterestByCurrency[$scope.currency]
		                    $scope.dateKeys.forEach(function(v,k){
		                    	let ccy = Object.keys(interestByDate[v])[0];
		                    	$scope.InterestCumulative += interestByDate[v][ccy].interest;
		                    	 $scope.InterestDataGrid.push({
		                    		 date : v, 
		                    		 currency : ccy ,
		                    		 balance:  interestByDate[v][ccy].postedAmount,
		                    		 benchmark  :  interestByDate[v][ccy].appliedRate -( interestByDate[v][ccy].spread * 0.01),
		                    		 dailyAccrual : interestByDate[v][ccy].interest,
		                    		 spread : interestByDate[v][ccy].spread,
		                    		 applied : interestByDate[v][ccy].appliedRate,
		                    		 cumulative : $scope.InterestCumulative
		                    	 })
		                    });	
			                    console.log($scope.InterestDataGrid);
		                    	
		                });
                });
                
                $scope.gridInterest = {

                        enableFiltering: true,
                        data: $scope.InterestDataGrid,
                        columnDefs: [
                            {
                                name: 'Date',
                                field: 'date',
                                enableFiltering: false,
                                headerCellClass: $scope.highlightFilteredHeader
                                
                            },
                            {
                                name: 'CCY',
                                enableFiltering: false,
                                field: 'currency',
                                headerCellClass: $scope.highlightFilteredHeader
                            },
                            {
                                name: 'Balance',
                                enableFiltering: false,
                                field: 'balance',
                                headerCellClass: $scope.highlightFilteredHeader,
                                cellFilter: 'currency:""', 
                                cellClass:'collateral-money' 
                            },
                            {
                                name: 'Benchmark %',
                                enableFiltering: false,
                                field: 'benchmark',
                                headerCellClass: $scope.highlightFilteredHeader,
                                
                            },
                            {
                                name: 'Spread %',
                                enableFiltering: false,
                                field: 'spread',
                                headerCellClass: $scope.highlightFilteredHeader
                            },
                            {
                                name: 'Applied',
                                enableFiltering: false,
                                field: 'applied',
                                headerCellClass: $scope.highlightFilteredHeader
                            },
                            {
                                name: 'Daily accrual',
                                enableFiltering: false,
                                field: 'dailyAccrual',
                                headerCellClass: $scope.highlightFilteredHeader,
                                cellFilter: 'currency:""', cellClass:'collateral-money' 
                            },
                            {
                                name: 'Cumulative',
                                enableFiltering: false,
                                field: 'cumulative',
                                headerCellClass: $scope.highlightFilteredHeader,
                                cellFilter: 'currency:""', cellClass:'collateral-money' 
                            },
                            {
                                name: 'Action',
                                	enableFiltering: false,
                                	cellTemplate : "<div class='text-center'><a href='#!' ><i class='fa fa-pencil'></i></a></div>"
                                	
                            }
                ]};
                
                            


}]);