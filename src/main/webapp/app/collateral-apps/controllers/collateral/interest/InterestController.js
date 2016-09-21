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
            'uiGridConstants',
            'InterestService',
            'AgreementsService',
            function ($scope, $document, $timeout, $request,
                      $interval, $localStorage,
                      uiGridConstants,
                      Interest,
                      Agreements
                      ) {

                $scope.$on('$includeContentLoaded', function () {

                });
     
              
                $scope.viewInterestDetail = function(entity){
    				$scope.currentContract= entity;
    				 $scope.$workspaceTabsMgm.addTab({
	    	        		head :  {
	    	        			icon : "fa fa-calculator",
	    	        			text : entity.collateralContract.counterpartyA.name + " " + entity.collateralLiabilityType + " - "+entity.currency 
	    	        		},
	            		  templateUrl: paths.views + "/collateral/interest/interest_detail.html",
	                      closable	  : true,
	                      parameters  : entity,
	                      autoload: true
	            	},[1,3]);
    				 
                };
                $scope.gridMainInterests = {
                        onRegisterApi: function(gridApi){
                            $scope.gridApi = gridApi;
                        },
                        columnDefs: [
                            {
                                name : 'Principal',
                                field: 'collateralContract.counterpartyA.name',
                                headerCellClass: $scope.highlightFilteredHeader
                            },
                            {
                                name : 'Fund/Clearing Broker',
                                field: 'collateralContract.ccpName',
                                enableFiltering:false	
                                
                            },
                            {
                                name : 'Counterparty',
                                field: 'collateralContract.counterpartyB.name',
                                headerCellClass: $scope.highlightFilteredHeader
                            },

                            {

                                name : 'Contract Type',
                                field: 'collateralContract.contractType',
                                headerCellClass: $scope.highlightFilteredHeader
                            },
                       
                            {
                            	name:"Collateral Liability Type",
                            	field: 'collateralLiabilityType',
                                headerCellClass: $scope.highlightFilteredHeader,
                                width: 120
                            },
                            {
                                name : 'Currency',
                                field: 'currency',
                                enableFiltering: true,
                                width: 80
                            },
                            {
                                name : 'Status',
                                field: "collateralContract.status",
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
                
                
                Interest.getByDate(moment().format("YYYY-MM-DD")).success(function(data) {
                    $scope.gridMainInterests.data = data.dataResponse;
                    data.dataResponse.forEach(function(v,k){
                    	if(v.collateralContract.hasOwnProperty("clearingMemberLegalEntity")){//CCPHouseAccount 
                    		v["counterpartyA"] 	= {};
                    		v["counterpartyA"]  = v.clearingMemberLegalEntity;
                    		v["counterpartyB"]  = {};
                    		v["counterpartyB"]["name"]= v.ccpName;
                    		v.ccpName  = "";
                    	}
                    	if(v.collateralContract.hasOwnProperty("client") && v.collateralContract.hasOwnProperty("clearingBroker")){
                    		v.collateralContract["counterpartyA"] 	= {};
                    		v.collateralContract["counterpartyA"]  = v.collateralContract.client;
                    		v.collateralContract["contractType"] = "CCP Client Clearing"
                    		v.collateralContract["ccpName"]  = v.collateralContract.clearingBroker.name;
                    		v.collateralContract["counterpartyB"]  = {}; 
                    		v.collateralContract["counterpartyB"]["name"] =  v.collateralContract.accountName;
                    		v.collateralContract["counterpartyB"]["otherName"] =  v.collateralContract.accountName;
                    	}
                    	
                        if (v.collateralContract.hasOwnProperty("contractType")) {
                        	if(v.collateralContract.contractType.toUpperCase()==="BILATERAL"){
                        		let bilateralContractType 	    = v.collateralContract.bilateralContractType;
                        		v.collateralContract.contractType =  v.collateralContract.bilateralContractType;
                        	}
                    	}
                    });
                });
            }]);