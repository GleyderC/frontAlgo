'use strict';

var DashboardApp = angular.module('DashboardApp');


DashboardApp.controller('MarginCallTradesController', ['$scope', 'uiGridConstants', 'MarginCallService','toastr',
    function ($scope, uiGridConstants, MarginCallService,$toastr) {

        $scope.gridTradesOptions = {
            showGridFooter: true,
            paginationPageSizes: [15, 50, 100, 200, 500],
            paginationPageSize: 5,
            enableColumnResizing: true,
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
            {field: 'trade.tradeType', name: 'type'},
            {field: 'trade.tradeSubType', name:'subType'},
            {field: 'trade.description', name:'Description' },
            {field: 'trade.notional',  name:'Notional', cellFilter: 'number:0', cellClass:'collateral-money'  },
            {field: 'trade.currency', name:'Currency',
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
            {field: 'ownPricing.price', name:'Npv (Curr)', cellFilter: 'number:2', cellClass:'collateral-money' },
            {field: 'ownPricing.priceInBaseCurrency', displayName:'Npv ('+ $scope.currentMarginCall.contract.baseCurrency +')',
                cellFilter: 'number:2', cellClass:'collateral-money'},
            {field: 'npvCounterParty', name:'Diff', cellFilter:'number:2',enableCellEdit:false},
            {
            	field: 'differencePercent', 
            	name:'Diff(%)', 
            	cellFilter:'number:2',
            	enableCellEdit:false,
            	sort: {
                    direction: uiGridConstants.DESC,
                    priority: 1
                },
                cellClass: function(grid, row, col, rowRenderIndex, colRenderIndex) {
                	let val = grid.getCellValue(row,col);
                	val =  val < 0 ?  val * -1 : val ;               	
                    if (val > $scope.tolerance) {
                    	return 'text-danger';
                    }else{
                    	return '';
                    }
                  }
            },
            {field: 'ownPricing.Counterparty', name:'npv (Counterparty)', cellClass:'collateral-money',cellFilter:'number:2'}
            

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
            				myValue : rowEntity.ownPricing.priceInBaseCurrency,
            				"counterpartyValue" : parseFloat(newValue.replace(/,/,'')),
            				"agreedValue" : parseFloat(newValue.replace(/,/,''))
            				
            		}; 
            		$scope.gridApi.core.notifyDataChange( uiGridConstants.dataChange.EDIT);
              });

         };       
        MarginCallService.getDetail($scope.currentMarginCall.marginCalls[0].id).then(function (result) {
            $scope.Trades = result.data.dataResponse.trades;
            $scope.gridTradesOptions.data = $scope.Trades;
            $scope.pool  =  result.data.dataResponse.poolDisplays;
            $scope.disputesDetail = result.data.dataResponse.marginCall.marginCallElementsByLiabilityType[$scope.collateralLiabilityType].marginCallCalculations.csaDisputesCalculations.disputeCalculationDetail
            $scope.Trades.forEach(function(v,k){
            	if($scope.disputesDetail[v.trade.internalId]!==undefined){
            		v.ownPricing.priceInBaseCurrency  = $scope.disputesDetail[v.trade.internalId].myValue;
            		v.npvCounterParty =   	 	  $scope.disputesDetail[v.trade.internalId].difference;
            		v.ownPricing["Counterparty"]  = $scope.disputesDetail[v.trade.internalId].counterparty;
            		v.differencePercent   =$scope.disputesDetail[v.trade.internalId].differencePercentage;
            	}  	
            });
            $scope.gridTradesOptions.data = $scope.Trades;
        });

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
        				if(parseInt(v)==vTrade.ownPricing.tradeId){
        					vTrade.npvCounterParty	  = disputeDetailResult[v].difference;
        					 vTrade.differencePercent   	=disputeDetailResult[v].differencePercentage;
        				}
        			});
        		});
        		$scope.gridApi.core.refresh();
        		$scope.gridApi.core.notifyDataChange( uiGridConstants.dataChange.EDIT);
        		$toastr.success("Trade updated successfully","Update dispute data",{closeButton: true});
        	});
        };
    }]);
