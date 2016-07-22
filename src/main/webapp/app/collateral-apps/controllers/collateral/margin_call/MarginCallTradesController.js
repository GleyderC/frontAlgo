'use strict';

var DashboardApp = angular.module('DashboardApp');


DashboardApp.controller('MarginCallTradesController', ['$scope', 'uiGridConstants', 'MarginCallService',
    function ($scope, uiGridConstants, MarginCallService) {

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
            {field: 'trade.internalId', name:'TradeId', width: 90,
                sort: {
                    direction: uiGridConstants.ASC,
                    priority: 0
                }
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
            {field: 'ownPricing.price', name:'Npv (Curr)', cellFilter: 'currency:""', cellClass:'collateral-money' },
            {field: 'ownPricing.priceInBaseCurrency', displayName:'Npv ('+ $scope.currentMarginCall.contract.baseCurrency +')',
                cellFilter: 'currency:""', cellClass:'collateral-money'},
            {field: 'npvCounterParty', name:'Diff (%Npv)', cellFilter:'currency:""'},
            {field: 'ownPricing.Counterparty', name:'npv (Counterparty)', cellClass:'collateral-money'}
            

        ];
         
        $scope.disputeDetailEdit = false;
        $scope.disputeList  = {};
        
        $scope.gridTradesOptions.onRegisterApi = function(gridApi){
            	$scope.gridApi = gridApi;
            	gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {
            		$scope.disputeDetailEdit = true;
            		
            		$scope.disputeList[rowEntity.trade.internalId] ={
            				myValue : rowEntity.ownPricing.priceInBaseCurrency,
            				counterpartyValue: rowEntity.ownPricing.Counteparty,
            				difference : parseFloat(rowEntity.npvCounterParty.replace(/,/,''))
            					
            		}; 
            		gridApi.core.notifyDataChange( uiGridConstants.dataChange.EDIT);
              });

         };       
        MarginCallService.getDetail($scope.currentMarginCall.marginCalls[0].id).then(function (result) {
            $scope.Trades = result.data.dataResponse.trades;
            $scope.gridTradesOptions.data = $scope.Trades;
            $scope.pool  =  result.data.dataResponse.poolDisplays;
            $scope.disputesDetail = result.data.dataResponse.marginCall.marginCallElementsByLiabilityType.CSA.marginCallCalculations.csaDisputesCalculations.disputeCalculationDetail
            $scope.Trades.forEach(function(v,k){
            	if($scope.disputesDetail[v.trade.internalId]!==undefined){
            		v.ownPricing.Counterparty  = $scope.disputesDetail[v.trade.internalId].myValue;
            		v.ownPricing.Counterparty  = $scope.disputesDetail[v.trade.internalId].counterparty;
            	}  	
            });
            $scope.gridTradesOptions.data = $scope.Trades;
        });

        console.log($scope.parameters);	
        $scope.updateDisputeDetail = function(disputeList){
        	var param =  {
        			marginCallId : $scope.currentMarginCall.marginCalls[0].id,
        			contractId : $scope.parameters.contract.internalId,
        			disputeCalculations : {
        				disputeCalculationsDetail : disputeList
        			}
        	};
        	MarginCallService.updateDispute(param).success(function(resp){
//        		$toastr.success("Dispute updated successfully","Update dispute data",{closeButton: true});
        	});
        };
        $scope.$watchCollection('$parent.Trades', function (newTrades, oldTrades) {
            if (newTrades === oldTrades) {
                return false;
            }
            $scope.gridTradesOptions.data = newTrades;
            $scope.baseCurrency = $scope.MarginCallDetail.contract.baseCurrency
        });

    }]);
