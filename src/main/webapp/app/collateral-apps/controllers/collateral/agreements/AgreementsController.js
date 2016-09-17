'use strict'
 var AgreementsCtrl = DashboardApp.controller('AgreementsController',
    ['$scope', '$request', '$interval','uiGridConstants','AgreementsService', function ($scope, $request, $interval,uiGridConstants,AgreementsService) {
    
    	$scope.$on('$includeContentLoaded', function () {
    	
         });
    	$scope.highlightFilteredHeader = function( row, rowRenderIndex, col, colRenderIndex ) {
            if( col.filters[0].term ){
                return 'header-filtered';
            } else {
                return '';
            }
        };
        $scope.contractTypeList =[];
        $scope.counterPartyAList =[];
        $scope.counterPartyBList =[];
        
        $scope.viewInterest = function(entity){
        	
        	$scope.$workspaceTabsMgm.addTab({
	        		head :  {
	        			icon : "fa fa-calculator",
	        			text : "Interest Detail"
	        		},
	        		
        		  templateUrl: paths.views + "/collateral/interest/interest_detail.html",
                  closable: true,
                  parameters  : entity,
                  autoload: true
        	},[1,3]);
        	
        };
        $scope.viewMarginCall = function(entity){
        	$scope.$workspaceTabsMgm.addTab({
	        		head :  {
	        			icon : "fa fa-calculator",
	        			text : "Margin Call Detail"
	        		},
        		  templateUrl: paths.views + "/collateral/margin_call/margin_call_detail.html",
                  closable: true,
                  parameters : entity,
                  autoload: true
        	},[1,2]);
        	
        };
        $scope.editBilateralContract = function(entity){
        	$scope.$workspaceTabsMgm.addTab({
	        		head :  {
	        			icon : "fa fa-calculator",
	        			text : "Edit "
	        		},
	                templateUrl: paths.views + "/static_data/BilateralAgreements/index.html",
                  closable: true,
                  autoload: true
        	},[3,2]);
        	
        };
        $scope.gridAgreements = {
            onRegisterApi: function(gridApi){
                $scope.gridApi = gridApi;
            },
            columnDefs: [
                {
                    name : 'Principal',
                    field: 'contract.counterpartyA.name',
                    headerCellClass: $scope.highlightFilteredHeader
                },
                {
                    name : 'Fund/Clearing Broker',
                    field: 'contract.ccpName',
                    enableFiltering:false	
                    
                },
                {
                    name : 'Counterparty',
                    field: 'contract.counterpartyB.name',
                    headerCellClass: $scope.highlightFilteredHeader
                },

                {

                    name : 'Contract Type',
                    field: 'contract.contractType',
                    headerCellClass: $scope.highlightFilteredHeader
                },
                {
                    name : 'Rating',
                    field: 'contract.counterpartyB.riskProfile.SPRating',
                    enableFiltering: false,
                    width: 80
                },
                {
                    name : 'Margin Freq',
                    field: 'contract.marginFrequency',
                    enableFiltering:false,
                    width: 80

                },
                {
                    name : 'Exposure / Collateral',
                    field: 'netExposure',
                    enableFiltering: false,
                 }  ,
                {
                	 name: 'Actions',
                     cellTemplate: paths.views + '/collateral/agreements/agr_action_buttons.html',
                     enableColumnMenu: false,
                     width: 120,
                     enableFiltering:false,
                     enableSorting  : false
                },
            ],
            paginationPageSizes: [12, 50, 100, 200, 500],
            paginationPageSize: 12,
            enablePaginationControl:true,
            enableColumnResizing: true,
            enableFiltering: true,
            rowHeight: 45, 
            enableGridMenu: true,
            exporterCsvFilename: 'Collateral_contract_agreemens.csv',
            exporterPdfDefaultStyle: {fontSize: 9},
            exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
            exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
            exporterPdfHeader: {text: "Collateral Agreements", style: 'headerStyle'},
            exporterPdfFooter: function (currentPage, pageCount) {
            	return {text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle'};
            },
            exporterPdfCustomFormatter: function (docDefinition) {
            	docDefinition.styles.headerStyle = {fontSize: 22, bold: true};
            	docDefinition.styles.footerStyle = {fontSize: 10, bold: true};
            	return docDefinition;
            },
            exporterPdfOrientation: 'landscape',
            exporterPdfPageSize: 'LETTER',
            exporterPdfMaxGridWidth: 500,
            exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
        };
        AgreementsService.getAll().success(function(data) {
                $scope.gridAgreements.data = data.dataResponse;
                var arr = {}; 
                arr["contractType"] = {}; 
                arr["counterpartyB"] = {};
                arr["counterpartyA"] = {};
                data.dataResponse.forEach(function(v,k){
                    //console.log(v.contract);
                	if(v.contract.hasOwnProperty("clearingMemberLegalEntity")){//CCPHouseAccount
                		v["counterpartyA"] 	= {};
                		v["counterpartyA"]  = v.contract.clearingMemberLegalEntity;
                		v["counterpartyB"]  = {};
                		v["counterpartyB"]["name"]= v.contract.ccpName;
                		v.contract.ccpName  = "";
                		//Be careful 
                		//v["counterpartyB"]["riskProfile"]  = {};
                		//v["counterpartyB"]["riskProfile"]["SPRating"]  = v.clearingMemberLegalEntity.riskProfile.SPRating;
                	}
                	if(v.contract.hasOwnProperty("client") && v.contract.hasOwnProperty("clearingBroker")){
                		v["counterpartyA"] 	= {};
                		v["counterpartyA"]  = v.contract.client;
                		v["contractType"] = "CCP Client Clearing"
//                		v["clearingBroker"]  = v.contract.clearingBroker;
                		v["ccpName"]  = v.contract.clearingBroker.name;
                		v["counterpartyB"]  = {};
                		v["counterpartyB"]["name"] =  v.contract.accountName;
                		v["counterpartyB"]["otherName"] =  v.contract.accountName;
                	}
                	
                	//Building ui grid Select for filter
                    if (v.contract.hasOwnProperty("contractType")) {
                    	if(v.contract.contractType.toUpperCase()==="BILATERAL"){
                    		let bilateralContractType = v.contract.bilateralContractType;
                    		v.contract.contractType =  v.contract.bilateralContractType;
                    	}
                		arr["contractType"][v.contract.contractType] = v.contract.contractType;
                	}
                	if(v.contract.hasOwnProperty("counterpartyA")){
                		arr["counterpartyA"][v.contract.counterpartyA.otherName]= v.contract.counterpartyA;
                	}
                	if(v.contract.hasOwnProperty("counterpartyB")){
                		arr["counterpartyB"][v.contract.counterpartyB.otherName] = v.contract.counterpartyB;
                	}
                });
                if(Object.keys(arr.contractType).length>0){
                	Object.keys(arr.contractType).forEach(function(val,k){
                		
                		$scope.contractTypeList.push({value:arr.contractType[val] , label: arr.contractType[val] })
                	});
            	}
                if(Object.keys(arr.counterpartyA).length>0){
                	Object.keys(arr.counterpartyA).forEach(function(val,k){
                		$scope.counterPartyAList.push({value:arr.counterpartyA[val].name , label : arr.counterpartyA[val].name })
                	});
            	}
                if(Object.keys(arr.counterpartyB).length>0){
                	Object.keys(arr.counterpartyB).forEach(function(val,k){
                		$scope.counterPartyBList.push({value:arr.counterpartyB[val].name , label : arr.counterpartyB[val].name })
                	});
            	}
            });
        $scope.toggleFiltering = function(){
            $scope.gridAgreements.enableFiltering = !$scope.gridAgreements.enableFiltering;
            $scope.gridApi.core.notifyDataChange( uiGridConstants.dataChange.COLUMN );
        };

 }]);