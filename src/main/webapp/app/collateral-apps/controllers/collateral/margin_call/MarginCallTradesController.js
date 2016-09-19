'use strict';

var DashboardApp = angular.module('DashboardApp');


DashboardApp.controller('MarginCallTradesController', ['$scope', 'uiGridConstants', 'MarginCallService','toastr',
    function ($scope, uiGridConstants, MarginCallService,$toastr) {

	$scope.getTableHeight = function() {
	       var rowHeight = 30; // your row height
	       var headerHeight = 30; // your header height
	       return {
	          height: ($scope.gridTradesOptions.data.length * rowHeight + headerHeight) + "px"
	       };
	    };
        $scope.gridTradesOptions = {
            showGridFooter: true,
            paginationPageSizes: [15, 50, 100, 200, 500],
            paginationPageSize: 50,
            enableColumnResizing: true,
            enableCellEdit : false, 
            enableFiltering: true,
            rowHeight: 35, // set height to each row
            enableGridMenu: true,
            exporterCsvFilename: 'margin-call-trades.csv',
            exporterPdfDefaultStyle: {fontSize: 9},
            exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
            exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
            exporterPdfHeader: {text: "Margin Call - Trades", style: 'headerStyle'},
            exporterPdfFooter: function (currentPage, pageCount) {
                return {text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle'};
            },
            exporterPdfCustomFormatter: function (docDefinition) {
                docDefinition.styles.headerStyle = {fontSize: 22, bold: true};
                docDefinition.styles.footerStyle = {fontSize: 10, bold: true};
                return docDefinition;
            },
            exporterPdfOrientation: 'portrait',
            exporterPdfPageSize: 'LETTER',
            exporterPdfMaxGridWidth: 450,
            exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
            }
        };
        $scope.gridTradesOptions.columnDefs = [
            {field: 'trade.internalId', name:'TradeId', 
            	width: 90
                
            },
            {field: 'trade.tradeType', name: 'type',enableCellEdit : false},
            {field: 'trade.tradeSubType', name:'subType' ,enableCellEdit : false},
            {field: 'trade.description', name:'Description',enableCellEdit : false },
            {field: 'trade.notional',  name:'Notional', cellFilter: 'number:0', enableCellEdit : false, cellClass:'collateral-money'  },
            {field: 'trade.currency', name:'Currency',enableCellEdit : false,
                filter : {
                    type : uiGridConstants.filter.SELECT,
                    selectOptions : [ {
                        value : 'EUR',
                        label : 'EUR'
                    }, {
                        value : 'USD',
                        label : 'USD'
                    } ],
                    condition : function(
                        searchTerm, cellValue) {
                        return cellValue === searchTerm;
                    }
                }
            },
            {field: 'priceInTradeCurrency', name:'Npv (Curr)', cellFilter: 'number:2', cellClass:'collateral-money',
            	enableCellEdit : false},
            
            {field: 'priceInBaseCurrency', displayName:'Npv ('+ $scope.currentMarginCall.contract.baseCurrency +')',
                cellFilter: 'number:2', cellClass:'collateral-money'},
            {field: 'npvCounterParty_diff', name:'Diff', cellFilter:'number:2',enableCellEdit:false,cellClass :'collateral-money'},
            {
            	field: 'differencePercent', 
            	name:'Diff(%)', 
            	sort: {
                    direction: uiGridConstants.DESC,
                    priority: 1
                },
                enableCellEdit : false,
                cellClass: function(grid, row, col, rowRenderIndex, colRenderIndex) {
                	let val = grid.getCellValue(row,col);
                	val =  val < 0 ?  val * -1 : val ;               	
                    if (val > $scope.tolerance) {
                    	return 'text-danger collateral-money';
                    }else{
                    	return 'collateral-money ';
                    }
                  }
            },
            {	
            	field: 'npvCounterParty', 
            	name:'npv (Counterparty)', 
            	enableCellEdit : true,
            	cellClass:'collateral-money',
            	cellFilter:'number:2'
            }
            

        ];
         
        $scope.disputeDetailEdit = false;
        $scope.disputeList  = {};
        
        $scope.gridTradesOptions.onRegisterApi = function(gridApi){
            	$scope.gridApi = gridApi;
            	gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {
            		if(newValue == oldValue){
            			return false;
            		}
            		$scope.disputeDetailEdit = true;
            		$scope.disputeList[rowEntity.trade.internalId] ={
            				myValue : rowEntity.priceInBaseCurrency,
            				"counterpartyValue" : parseFloat(newValue.replace(/,/,'')),
            				"agreedValue" : parseFloat(newValue.replace(/,/,''))
            				
            		}; 
            		$scope.gridApi.core.notifyDataChange( uiGridConstants.dataChange.EDIT);
              });

         };
         
         
        $scope.$watchCollection("$parent.Trades",function(nV,oV){
        	if(nV===oV){
        		return false; 
        	}
        	$scope.gridTradesOptions.data = nV;
        	$scope.gridApi.core.refresh();
    		$scope.gridApi.core.notifyDataChange( uiGridConstants.dataChange.EDIT);
        });
        $scope.loadData = function(){
        	
	        MarginCallService.getDetail($scope.currentMarginCall.marginCalls[0].id).then(function (result) {
	            $scope.Trades = result.data.dataResponse.trades;
	            $scope.gridTradesOptions.data = $scope.Trades;
	            $scope.pool  =  result.data.dataResponse.poolDisplays;
	            $scope.ownPricing = resutl.data.dataResponse.marginCall.ownPricing;
	            $scope.disputesDetail = result.data.dataResponse.marginCall.marginCallElementsByLiabilityType[$scope.collateralLiabilityType].marginCallCalculations.csaDisputesCalculations.disputeCalculationDetail
	            $scope.Trades.forEach(function(v,k){
	            	if($scope.disputesDetail[v.trade.internalId]!==undefined){
	            		v.ownPricing.priceInBaseCurrency  = $scope.disputesDetail[v.trade.internalId].myValue;
	            		v.npvCounterParty =   	 	  $scope.disputesDetail[v.trade.internalId].difference;
	            		v.ownPricing["Counterparty"]  = $scope.disputesDetail[v.trade.internalId].counterparty;
	            		v.differencePercent   =$scope.disputesDetail[v.trade.internalId].differencePercentage;
	            	}  	
	            	if(Object.keys($scope.ownPricing.tradesPricingsByTradeId).length>0) {
	            		v.priceInBaseCurrency = v.ownPricing.tradesPricingByTradeId[v.trade.internalId].priceInBaseCurrency;
	            		v.Pricing.priceInTradeCurrency = v.ownPricing.tradesPricingByTradeId[v.trade.internalId].priceInTradeCurrency;

	            	}
	            });
	            $scope.gridTradesOptions.data = $scope.Trades;
	        });
        };
        
        $scope.updateDisputeDetail = function(disputeList){
        	var param =  {
        			marginCallId : $scope.currentMarginCall.marginCalls[0].id,
        			contractId : $scope.parameters.contract.internalId,
    				collateralLiabilityType : $scope.collateralLiabilityType,
        			disputeCalculations : {
        				disputeCalculationDetail : disputeList
        			}
        	};
        	MarginCallService.updateDispute(param).success(function(resp){
        		var disputeDetailResult = resp.dataResponse.disputeCalculations.disputeCalculationDetail;
        		$scope.Trades.forEach(function(vTrade, kTrade){
        			Object.keys(disputeDetailResult).forEach(function(v,k){
        				if(parseInt(v)==vTrade.trade.internalId){
        					vTrade.npvCounterParty_diff	  = disputeDetailResult[v].difference;
        					 vTrade.differencePercent   	=Number((disputeDetailResult[v].differencePercentage*100).toString().match(/^\d+(?:\.\d{0,2})?/)) ;
        				}
        			});
        		});
        		$scope.gridApi.core.refresh();
        		$scope.gridApi.core.notifyDataChange( uiGridConstants.dataChange.EDIT);
        		$toastr.success("Trade updated successfully","Update dispute data",{closeButton: true});
        	});
        };
    }]);
