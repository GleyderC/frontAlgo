'use strict';

var DashboardApp = angular.module('DashboardApp');
//var InterestCtrl = AgreementsController
 var InterestCtrl=    DashboardApp.controller(
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
                    + "/collateral/interest/main.html",
                    active: true
                }
                    ]
                };
                
                
                $scope.addInterestTab = function () {
                    $scope.workspaceTabs.addTab({
                            head: {
                                icon: 'fa  fa-calculator font-dark font-green-haze',
                                text: 'Interest Detail',
                            },
                            templateUrl: paths.views
                            + "/collateral/interest/interest_detail.html",
                            closable: true
                        });

                };
              
                $scope.viewInterestDetail = function(entity){
    				$scope.currentContract= entity;
    				$scope.addInterestTab();

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
                            	name:"Collateral Type",
                            	field: 'bilateralContractType',
                                headerCellClass: $scope.highlightFilteredHeader
                            },
                            {
                                name : 'Currency',
                                field: 'eligibleCurrencyConfig.baseCurrency',
                                enableFiltering: true,
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
                                name : 'Status',
                                field: "status",
                                 enableFiltering: false,
                             }  ,
                            {
                            	   name : 'Action',
									cellTemplate : '<div class="text-center"> <button class="btn btn-sm btn-primary uigrid-btn" ng-click="grid.appScope.viewInterestDetail(row.entity)" ><i class="fa fa-eye"></i></button> </div>',
									enableColumnMenu : false,
									width : 120,
									enableFiltering : false,
									enableSorting : false
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
                  
                 	

            }]);
