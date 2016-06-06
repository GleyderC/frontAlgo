'use strict'
DashboardApp.controller('AgreementsController',
    ['$scope', '$request', '$interval','uiGridConstants', function ($scope, $request, $interval,uiGridConstants) {
    
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
        
        $scope.gridOptions = {

            enableFiltering: true,
            onRegisterApi: function(gridApi){
                $scope.gridApi = gridApi;
            },
            columnDefs: [
                {
                    name : 'Principal',
                    field: 'counterpartyA.name',
                    headerCellClass: $scope.highlightFilteredHeader,
                    filter: {
                        type: uiGridConstants.filter.SELECT,
                        selectOptions: $scope.counterPartyAList
                       
                    },
                },
                {
                    name : 'Fund/Clearing Broker',
                    field: 'ccpName',
                    enableFiltering:false	
                    
                },
                {
                    name : 'Counterparty',
                    field: 'counterpartyB.name',
                    filter: {
                        type: uiGridConstants.filter.SELECT,
                        selectOptions: $scope.counterPartyBList
                      
                    },
                },

                {

                    name : 'Contract Type',
                    field: 'contractType',
                    filter: {
                        type: uiGridConstants.filter.SELECT,
                        selectOptions: $scope.contractTypeList,
                        condition: function(searchTerm, cellValue) {
                            return cellValue === searchTerm;
                        }
                    }
                },
                {
                    name : 'Rating',
                    field: 'counterpartyB.riskProfile.SPRating',
                    enableFiltering: false,
                    width: 80
                },
                {

                    name : 'Margin Freq',
                    field: 'marginFrequency',
                    enableFiltering:false,
                    width: 80

                },
//                {
//                    field : "exposure",
//                    name: 'Exposure (EUR)',
//                    headerCellClass: $scope.highlightFilteredHeader,
//                    filter: {
//                        term: '1',	
//                        type: uiGridConstants.filter.SELECT,
//                        selectOptions: [
//                            { value: '1', label: 'EUR' },
//                            { value: '2', label: 'USD' }
//
//                        ]
//                    }
//                },
                {
                    name : 'Exposure / Collateral',
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
            onRegisterApi: function (gridApi) {
            	$scope.gridApi = gridApi;
            	// call resize every 500 ms for 5 s after modal finishes opening
            	$interval( function() {
            		$scope.gridApi.core.handleWindowResize();
            	}, 1000, 10);
            }
        };
        $scope.gridOptions.data = [
                                   {
                                	    "counterpartyA": {
                                	      "id": 1563412744,
                                	      "name": "Demo Bank",
                                	      "otherName": "DEMO",
                                	      "otherName2": "",
                                	      "otherName3": "",
                                	      "otherName4": "",
                                	      "otherName5": "",
                                	      "otherName6": "",
                                	      "BIC": "",
                                	      "LEI": "00000000000000000000",
                                	      "isBranch": false,
                                	      "motherLegalEntity": -1,
                                	      "cdsMarketDataName": "",
                                	      "contactPersonList": [],
                                	      "rolList": [
                                	        "PO"
                                	      ],
                                	      "ccpOwnClientAccounts": [],
                                	      "ccpMyClientsAccounts": [],
                                	      "rwaMultiplier": 0,
                                	      "leverageRatioMultiplier": 0,
                                	      "cvaComputes": false,
                                	      "riskProfile": {
                                	        "SPRating": "Unrated",
                                	        "riskWeight": 0,
                                	        "cdsSpreadArrayList": []
                                	      },
                                	      "countryId": -1,
                                	      "financialCalendarList": []
                                	    },
                                	    "counterpartyB": {
                                	      "id": 423287131,
                                	      "name": "J.P. MORGAN",
                                	      "otherName": "JPMORGAN",
                                	      "otherName2": "",
                                	      "otherName3": "",
                                	      "otherName4": "",
                                	      "otherName5": "",
                                	      "otherName6": "",
                                	      "BIC": "",
                                	      "LEI": "7H6GLXDRUGQFU57RNE97",
                                	      "isBranch": false,
                                	      "motherLegalEntity": -1,
                                	      "cdsMarketDataName": "",
                                	      "contactPersonList": [
                                	        {
                                	          "id": 206022424,
                                	          "idLegalEntity": 423287131,
                                	          "contactType": "Contact",
                                	          "lastName": "Guiti",
                                	          "firstName": "Pepe",
                                	          "title": "Title",
                                	          "address": "Madrid Street",
                                	          "city": "Caracas",
                                	          "state": "State",
                                	          "zipCode": "28040",
                                	          "countryId": 1,
                                	          "phone": "6567787596976",
                                	          "telex": "Telex",
                                	          "fax": "+1234556546",
                                	          "email": "jpmorgan@jpmorgan.com",
                                	          "comments": "a comment",
                                	          "swift": "SWIFT: sdfds",
                                	          "linkedInProfileUrl": "https://linkedin.com/pepeguiti"
                                	        },
                                	        {
                                	          "id": 1388662720,
                                	          "idLegalEntity": 423287131,
                                	          "contactType": "Contact",
                                	          "lastName": "Guiti",
                                	          "firstName": "Pepe",
                                	          "title": "Title",
                                	          "address": "Madrid Street",
                                	          "city": "Caracas",
                                	          "state": "State",
                                	          "zipCode": "28040",
                                	          "countryId": 1,
                                	          "phone": "6567787596976",
                                	          "telex": "Telex",
                                	          "fax": "+1234556546",
                                	          "email": "jpmorgan@jpmorgan.com",
                                	          "comments": "a comment",
                                	          "swift": "SWIFT: sdfds",
                                	          "linkedInProfileUrl": "https://linkedin.com/pepeguiti"
                                	        }
                                	      ],
                                	      "rolList": [
                                	        "COUNTERPARTY"
                                	      ],
                                	      "ccpOwnClientAccounts": [],
                                	      "ccpMyClientsAccounts": [],
                                	      "rwaMultiplier": 0,
                                	      "leverageRatioMultiplier": 0,
                                	      "cvaComputes": false,
                                	      "riskProfile": {
                                	        "SPRating": "Unrated",
                                	        "riskWeight": 0,
                                	        "cdsSpreadArrayList": []
                                	      },
                                	      "countryId": -1,
                                	      "financialCalendarList": []
                                	    },
                                	    "partyAPaysVm": false,
                                	    "partyBPaysVm": false,
                                	    "marginFrequency": "DAILY",
                                	    "contractType": "CSA_MARGINED",
                                	    "partyAVmFundingCost": 0,
                                	    "partyBVmFundingCost": 0,
                                	    "partyAImFundingCost": 0,
                                	    "partyBImFundingCost": 0,
                                	    "partyAVmFundingProfit": 0,
                                	    "partyBVmFundingProfit": 0,
                                	    "partyAImFundingProfit": 0,
                                	    "partyBImFundingProfit": 0,
                                	    "iaPercentageOfPortfolioNotionalPartyA": 0,
                                	    "iaPercentageOfPortfolioNotionalPartyB": 0,
                                	    "nonCash_PostedInitialMargingCountsForLeverageRatioExposure": false,
                                	    "cash_PostedInitialMargingCountsForLeverageRatioExposure": false,
                                	    "nonCash_ReceivedInitialMargingCountsForLeverageRatioExposure": false,
                                	    "cash_ReceivedInitialMargingCountsForLeverageRatioExposure": false,
                                	    "nonCash_PostedInitialMargingCountsForLeverageRatioExposure_reverse": false,
                                	    "cash_PostedInitialMargingCountsForLeverageRatioExposure_reverse": false,
                                	    "nonCash_ReceivedInitialMargingCountsForLeverageRatioExposure_reverse": false,
                                	    "cash_ReceivedInitialMargingCountsForLeverageRatioExposure_reverse": false,
                                	    "internalId": 1,
                                	    "callIssuanceAuto": false,
                                	    "autoSendTime": [],
                                	    "callDay": 0,
                                	    "callOffset": 0,
                                	    "status": false,
                                	    "eligibleSecurities": [],
                                	    "lastOwnPricing": {
                                	      "securitiesPricings": [],
                                	      "tradesPricings": []
                                	    },
                                	    "lastCounterpartyPricing": {
                                	      "securitiesPricings": [],
                                	      "tradesPricings": []
                                	    }
                                	  },
                                	  {
                                	    "counterpartyA": {
                                	      "id": 1563412744,
                                	      "name": "Demo Bank",
                                	      "otherName": "DEMO",
                                	      "otherName2": "",
                                	      "otherName3": "",
                                	      "otherName4": "",
                                	      "otherName5": "",
                                	      "otherName6": "",
                                	      "BIC": "",
                                	      "LEI": "00000000000000000000",
                                	      "isBranch": false,
                                	      "motherLegalEntity": -1,
                                	      "cdsMarketDataName": "",
                                	      "contactPersonList": [],
                                	      "rolList": [
                                	        "PO"
                                	      ],
                                	      "ccpOwnClientAccounts": [],
                                	      "ccpMyClientsAccounts": [],
                                	      "rwaMultiplier": 0,
                                	      "leverageRatioMultiplier": 0,
                                	      "cvaComputes": false,
                                	      "riskProfile": {
                                	        "SPRating": "Unrated",
                                	        "riskWeight": 0,
                                	        "cdsSpreadArrayList": []
                                	      },
                                	      "countryId": -1,
                                	      "financialCalendarList": []
                                	    },
                                	    "counterpartyB": {
                                	      "id": 423287131,
                                	      "name": "J.P. MORGAN",
                                	      "otherName": "JPMORGAN",
                                	      "otherName2": "",
                                	      "otherName3": "",
                                	      "otherName4": "",
                                	      "otherName5": "",
                                	      "otherName6": "",
                                	      "BIC": "",
                                	      "LEI": "7H6GLXDRUGQFU57RNE97",
                                	      "isBranch": false,
                                	      "motherLegalEntity": -1,
                                	      "cdsMarketDataName": "",
                                	      "contactPersonList": [
                                	        {
                                	          "id": 206022424,
                                	          "idLegalEntity": 423287131,
                                	          "contactType": "Contact",
                                	          "lastName": "Guiti",
                                	          "firstName": "Pepe",
                                	          "title": "Title",
                                	          "address": "Madrid Street",
                                	          "city": "Caracas",
                                	          "state": "State",
                                	          "zipCode": "28040",
                                	          "countryId": 1,
                                	          "phone": "6567787596976",
                                	          "telex": "Telex",
                                	          "fax": "+1234556546",
                                	          "email": "jpmorgan@jpmorgan.com",
                                	          "comments": "a comment",
                                	          "swift": "SWIFT: sdfds",
                                	          "linkedInProfileUrl": "https://linkedin.com/pepeguiti"
                                	        },
                                	        {
                                	          "id": 1388662720,
                                	          "idLegalEntity": 423287131,
                                	          "contactType": "Contact",
                                	          "lastName": "Guiti",
                                	          "firstName": "Pepe",
                                	          "title": "Title",
                                	          "address": "Madrid Street",
                                	          "city": "Caracas",
                                	          "state": "State",
                                	          "zipCode": "28040",
                                	          "countryId": 1,
                                	          "phone": "6567787596976",
                                	          "telex": "Telex",
                                	          "fax": "+1234556546",
                                	          "email": "jpmorgan@jpmorgan.com",
                                	          "comments": "a comment",
                                	          "swift": "SWIFT: sdfds",
                                	          "linkedInProfileUrl": "https://linkedin.com/pepeguiti"
                                	        }
                                	      ],
                                	      "rolList": [
                                	        "COUNTERPARTY"
                                	      ],
                                	      "ccpOwnClientAccounts": [],
                                	      "ccpMyClientsAccounts": [],
                                	      "rwaMultiplier": 0,
                                	      "leverageRatioMultiplier": 0,
                                	      "cvaComputes": false,
                                	      "riskProfile": {
                                	        "SPRating": "Unrated",
                                	        "riskWeight": 0,
                                	        "cdsSpreadArrayList": []
                                	      },
                                	      "countryId": -1,
                                	      "financialCalendarList": []
                                	    },
                                	    "partyAPaysVm": false,
                                	    "partyBPaysVm": false,
                                	    "marginFrequency": "WEEKLY",
                                	    "contractType": "SCSA_MARGINED",
                                	    "partyAVmFundingCost": 0,
                                	    "partyBVmFundingCost": 0,
                                	    "partyAImFundingCost": 0,
                                	    "partyBImFundingCost": 0,
                                	    "partyAVmFundingProfit": 0,
                                	    "partyBVmFundingProfit": 0,
                                	    "partyAImFundingProfit": 0,
                                	    "partyBImFundingProfit": 0,
                                	    "iaPercentageOfPortfolioNotionalPartyA": 0,
                                	    "iaPercentageOfPortfolioNotionalPartyB": 0,
                                	    "nonCash_PostedInitialMargingCountsForLeverageRatioExposure": false,
                                	    "cash_PostedInitialMargingCountsForLeverageRatioExposure": false,
                                	    "nonCash_ReceivedInitialMargingCountsForLeverageRatioExposure": false,
                                	    "cash_ReceivedInitialMargingCountsForLeverageRatioExposure": false,
                                	    "nonCash_PostedInitialMargingCountsForLeverageRatioExposure_reverse": false,
                                	    "cash_PostedInitialMargingCountsForLeverageRatioExposure_reverse": false,
                                	    "nonCash_ReceivedInitialMargingCountsForLeverageRatioExposure_reverse": false,
                                	    "cash_ReceivedInitialMargingCountsForLeverageRatioExposure_reverse": false,
                                	    "internalId": 2,
                                	    "callIssuanceAuto": false,
                                	    "autoSendTime": [],
                                	    "callDay": 0,
                                	    "callOffset": 0,
                                	    "status": false,
                                	    "eligibleSecurities": [],
                                	    "lastOwnPricing": {
                                	      "securitiesPricings": [],
                                	      "tradesPricings": []
                                	    },
                                	    "lastCounterpartyPricing": {
                                	      "securitiesPricings": [],
                                	      "tradesPricings": []
                                	    }
                                	  },
                                	  {
                                	    "counterpartyA": {
                                	      "id": 1563412744,
                                	      "name": "Demo Bank",
                                	      "otherName": "DEMO",
                                	      "otherName2": "",
                                	      "otherName3": "",
                                	      "otherName4": "",
                                	      "otherName5": "",
                                	      "otherName6": "",
                                	      "BIC": "",
                                	      "LEI": "00000000000000000000",
                                	      "isBranch": false,
                                	      "motherLegalEntity": -1,
                                	      "cdsMarketDataName": "",
                                	      "contactPersonList": [],
                                	      "rolList": [
                                	        "PO"
                                	      ],
                                	      "ccpOwnClientAccounts": [],
                                	      "ccpMyClientsAccounts": [],
                                	      "rwaMultiplier": 0,
                                	      "leverageRatioMultiplier": 0,
                                	      "cvaComputes": false,
                                	      "riskProfile": {
                                	        "SPRating": "Unrated",
                                	        "riskWeight": 0,
                                	        "cdsSpreadArrayList": []
                                	      },
                                	      "countryId": -1,
                                	      "financialCalendarList": []
                                	    },
                                	    "counterpartyB": {
                                	      "id": 772073952,
                                	      "name": "Bank of New York",
                                	      "otherName": "NYBANK",
                                	      "otherName2": "",
                                	      "otherName3": "",
                                	      "otherName4": "",
                                	      "otherName5": "",
                                	      "otherName6": "",
                                	      "BIC": "",
                                	      "LEI": "549300KP56LL8NKKFL47",
                                	      "isBranch": false,
                                	      "motherLegalEntity": -1,
                                	      "cdsMarketDataName": "",
                                	      "contactPersonList": [],
                                	      "rolList": [
                                	        "COUNTERPARTY"
                                	      ],
                                	      "ccpOwnClientAccounts": [],
                                	      "ccpMyClientsAccounts": [],
                                	      "rwaMultiplier": 0,
                                	      "leverageRatioMultiplier": 0,
                                	      "cvaComputes": false,
                                	      "riskProfile": {
                                	        "SPRating": "Unrated",
                                	        "riskWeight": 0,
                                	        "cdsSpreadArrayList": []
                                	      },
                                	      "countryId": -1,
                                	      "financialCalendarList": []
                                	    },
                                	    "partyAPaysVm": false,
                                	    "marginFrequency": "MONTHLY",
                                	    "partyBPaysVm": false,
                                	    "contractType": "CSA_MARGINED",
                                	    "partyAVmFundingCost": 0,
                                	    "partyBVmFundingCost": 0,
                                	    "partyAImFundingCost": 0,
                                	    "partyBImFundingCost": 0,
                                	    "partyAVmFundingProfit": 0,
                                	    "partyBVmFundingProfit": 0,
                                	    "partyAImFundingProfit": 0,
                                	    "partyBImFundingProfit": 0,
                                	    "iaPercentageOfPortfolioNotionalPartyA": 0,
                                	    "iaPercentageOfPortfolioNotionalPartyB": 0,
                                	    "nonCash_PostedInitialMargingCountsForLeverageRatioExposure": false,
                                	    "cash_PostedInitialMargingCountsForLeverageRatioExposure": false,
                                	    "nonCash_ReceivedInitialMargingCountsForLeverageRatioExposure": false,
                                	    "cash_ReceivedInitialMargingCountsForLeverageRatioExposure": false,
                                	    "nonCash_PostedInitialMargingCountsForLeverageRatioExposure_reverse": false,
                                	    "cash_PostedInitialMargingCountsForLeverageRatioExposure_reverse": false,
                                	    "nonCash_ReceivedInitialMargingCountsForLeverageRatioExposure_reverse": false,
                                	    "cash_ReceivedInitialMargingCountsForLeverageRatioExposure_reverse": false,
                                	    "internalId": 3,
                                	    "callIssuanceAuto": false,
                                	    "autoSendTime": [],
                                	    "callDay": 0,
                                	    "callOffset": 0,
                                	    "status": false,
                                	    "eligibleSecurities": [],
                                	    "lastOwnPricing": {
                                	      "securitiesPricings": [],
                                	      "tradesPricings": []
                                	    },
                                	    "lastCounterpartyPricing": {
                                	      "securitiesPricings": [],
                                	      "tradesPricings": []
                                	    }
                                	  },
                                	  {
                                	    "clearingMemberLegalEntity": {
                                	      "id": 1563412744,
                                	      "name": "Demo Bank",
                                	      "otherName": "DEMO",
                                	      "otherName2": "",
                                	      "otherName3": "",
                                	      "otherName4": "",
                                	      "otherName5": "",
                                	      "otherName6": "",
                                	      "BIC": "",
                                	      "LEI": "00000000000000000000",
                                	      "isBranch": false,
                                	      "motherLegalEntity": -1,
                                	      "cdsMarketDataName": "",
                                	      "contactPersonList": [],
                                	      "rolList": [
                                	        "PO"
                                	      ],
                                	      "ccpOwnClientAccounts": [],
                                	      "ccpMyClientsAccounts": [],
                                	      "rwaMultiplier": 0,
                                	      "leverageRatioMultiplier": 0,
                                	      "cvaComputes": false,
                                	      "riskProfile": {
                                	        "SPRating": "Unrated",
                                	        "riskWeight": 0,
                                	        "cdsSpreadArrayList": []
                                	      },
                                	      "countryId": -1,
                                	      "financialCalendarList": []
                                	    },
                                	    "ccpId": 690833092,
                                	    "ccpName": "SwapClear",
                                	    "accountCode": "DEMOBANK",
                                	    "positionAccount": {
                                	      "internalId": 134394215,
                                	      "houseAccountId": 1433817097
                                	    },
                                	    "internalId": 1433817097,
                                	    "callIssuanceAuto": true,
                                	    "autoSendTime": [
                                	      {
                                	        "iLocalMillis": 39600000,
                                	        "iChronology": {
                                	          "iBase": {
                                	            "iMinDaysInFirstWeek": 4
                                	          }
                                	        }
                                	      },
                                	      {
                                	        "iLocalMillis": 50400000,
                                	        "iChronology": {
                                	          "iBase": {
                                	            "iMinDaysInFirstWeek": 4
                                	          }
                                	        }
                                	      },
                                	      {
                                	        "iLocalMillis": 0,
                                	        "iChronology": {
                                	          "iBase": {
                                	            "iMinDaysInFirstWeek": 4
                                	          }
                                	        }
                                	      }
                                	    ],
                                	    "marginFrequency": "DAILY",
                                	    "callDay": 0,
                                	    "callOffset": 1,
                                	    "status": true,
                                	    "eligibleSecurities": [],
                                	    "lastOwnPricing": {
                                	      "securitiesPricings": [],
                                	      "tradesPricings": []
                                	    },
                                	    "lastCounterpartyPricing": {
                                	      "securitiesPricings": [],
                                	      "tradesPricings": []
                                	    }
                                	  },
                                	  {
                                	    "clearingMemberLegalEntity": {
                                	      "id": 1563412744,
                                	      "name": "Demo Bank",
                                	      "otherName": "DEMO",
                                	      "otherName2": "",
                                	      "otherName3": "",
                                	      "otherName4": "",
                                	      "otherName5": "",
                                	      "otherName6": "",
                                	      "BIC": "",
                                	      "LEI": "00000000000000000000",
                                	      "isBranch": false,
                                	      "motherLegalEntity": -1,
                                	      "cdsMarketDataName": "",
                                	      "contactPersonList": [],
                                	      "rolList": [
                                	        "PO"
                                	      ],
                                	      "ccpOwnClientAccounts": [],
                                	      "ccpMyClientsAccounts": [],
                                	      "rwaMultiplier": 0,
                                	      "leverageRatioMultiplier": 0,
                                	      "cvaComputes": false,
                                	      "riskProfile": {
                                	        "SPRating": "Unrated",
                                	        "riskWeight": 0,
                                	        "cdsSpreadArrayList": []
                                	      },
                                	      "countryId": -1,
                                	      "financialCalendarList": []
                                	    },
                                	    "ccpId": 979062298,
                                	    "ccpName": "BmeClearing",
                                	    "accountCode": "DEMOBANK",
                                	    "positionAccount": {
                                	      "internalId": 1793946726,
                                	      "houseAccountId": 2128064069
                                	    },
                                	    "internalId": 2128064069,
                                	    "callIssuanceAuto": true,
                                	    "autoSendTime": [
                                	      {
                                	        "iLocalMillis": 64800000,
                                	        "iChronology": {
                                	          "iBase": {
                                	            "iMinDaysInFirstWeek": 4
                                	          }
                                	        }
                                	      }
                                	    ],
                                	    "marginFrequency": "DAILY",
                                	    "callDay": 0,
                                	    "callOffset": 1,
                                	    "status": true,
                                	    "eligibleSecurities": [],
                                	    "lastOwnPricing": {
                                	      "securitiesPricings": [],
                                	      "tradesPricings": []
                                	    },
                                	    "lastCounterpartyPricing": {
                                	      "securitiesPricings": [],
                                	      "tradesPricings": []
                                	    }
                                	  }
                                	];
        
//        $request.get('/servlet/CollateralContract/SelectAll')
//            .success(function(data) {
//            	console.log(data.dataResponse)
//                $scope.gridOptions.data = data.dataResponse;
//                var arr = {}; 
//                arr["contractType"] = {}; 
//                arr["counterpartyB"] = {};
//                arr["counterpartyA"] = {};
//                data.dataResponse.forEach(function(v,k){
//                	if(v.hasOwnProperty("contractType")){
//                			arr["contractType"][v.contractType] = v.contractType;
//                	}
//                	if(v.hasOwnProperty("counterpartyA")){
//                		arr["counterpartyA"][v.counterpartyA.otherName]= v.counterpartyA; 
//                	}
//                	if(v.hasOwnProperty("counterpartyB")){
//                		arr["counterpartyB"][v.counterpartyB.otherName] = v.counterpartyB; 
//                	}
//                	
//                });
//                if(Object.keys(arr.contractType).length>0){
//                	Object.keys(arr.contractType).forEach(function(val,k){
//                		
//                		$scope.contractTypeList.push({value:arr.contractType[val] , label: arr.contractType[val] })
//                	});
//            	}
//                if(Object.keys(arr.counterpartyA).length>0){
//                	Object.keys(arr.counterpartyA).forEach(function(val,k){
//                		console.log(k);
//                		$scope.counterPartyAList.push({value:arr.counterpartyA[val].name , label : arr.counterpartyA[val].name })
//                	});
//            	}
//                if(Object.keys(arr.counterpartyB).length>0){
//                	Object.keys(arr.counterpartyB).forEach(function(val,k){
//                		$scope.counterPartyBList.push({value:arr.counterpartyB[val].name , label : arr.counterpartyB[val].name })
//                	});
//            	}
//            });
        $scope.toggleFiltering = function(){
            $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
            $scope.gridApi.core.notifyDataChange( uiGridConstants.dataChange.COLUMN );
        };




    }]);


