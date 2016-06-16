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
                $scope.startDate = moment().format("YYYY-MM-DD").toString();
                $scope.postedAmount;
                Agreements.getAll().success(function(data){
                		$scope.InterestDataContract=  data.dataResponse[0];
                }).then(function(){
		                Interest.getByDate(moment().format("YYYY-MM-DD")).success(function(data){
		                	$scope.InterestData   = data.dataResponse[0];
		                    $scope.currency   =  $scope.InterestDataContract.baseCurrency;
		//                	$scope.currency  = Object.keys(data.dataResponse[0].ownInterestOnPostedCash.interestByStartDateAndCurrency[moment().format("YYYY-MM-DD")])[0];
		                    $scope.postedAmount = data.dataResponse[0].ownInterestOnPostedCash.interestByStartDateAndCurrency[moment().format("YYYY-MM-DD")][$scope.currency].postedAmount;
		                    $scope.workspaceTabs.tabList[0].text =" nojod";
		                });
                });
                $scope.gridInterest = {

                        enableFiltering: true,
                        data: $scope.gridData,
                        columnDefs: [
                            {
                                name: 'Date',
                                field: 'contract.counterpartyA.name',
                                enableFiltering: false,
                                headerCellClass: $scope.highlightFilteredHeader
                                
                            },
                            {
                                name: 'CCY',
                                enableFiltering: false,
                                field: 'contract.counterpartyA.name',
                                headerCellClass: $scope.highlightFilteredHeader
                            },
                            {
                                name: 'Balance',
                                enableFiltering: false,
                                field: 'contract.counterpartyA.name',
                                headerCellClass: $scope.highlightFilteredHeader
                            },
                            {
                                name: 'Benchmark %',
                                enableFiltering: false,
                                field: 'contract.counterpartyA.name',
                                headerCellClass: $scope.highlightFilteredHeader
                            },
                            {
                                name: 'Spread %',
                                enableFiltering: false,
                                field: 'contract.counterpartyA.name',
                                headerCellClass: $scope.highlightFilteredHeader
                            },
                            {
                                name: 'Applied',
                                enableFiltering: false,
                                field: 'contract.counterpartyA.name',
                                headerCellClass: $scope.highlightFilteredHeader
                            },
                            {
                                name: 'Daily accrual',
                                enableFiltering: false,
                                field: 'contract.counterpartyA.name',
                                headerCellClass: $scope.highlightFilteredHeader
                            },
                            {
                                name: 'Cumulative',
                                enableFiltering: false,
                                field: 'contract.counterpartyA.name',
                                headerCellClass: $scope.highlightFilteredHeader
                            },
                            {
                                name: 'Action',
                                	enableFiltering: false,
                                	cellTemplate : "<button class='btn green'><i class='fa fa-pencil'></i></button>"
                                	
                            }
                ]};
                
                            


}]);