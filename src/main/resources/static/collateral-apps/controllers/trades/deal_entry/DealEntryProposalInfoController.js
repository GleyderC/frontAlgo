'use strict';

var DashboardApp = angular.module('DashboardApp');

DashboardApp.controller('DealEntryProposalInfoController', ['TradeProposalService', 'LegalEntityService', '$scope',
    '$timeout', 'localStorageService', 'uiGridConstants', 'DashboardService', '$q',
    function (TradeProposalService,LegalEntityService, $scope, $timeout, localStorageService, uiGridConstants, DashboardService, $q) {

        $scope.DealEntryProposalInfo = {};

        $scope.DealEntryProposalInfo.ProductFamily = {};
        $scope.DealEntryProposalInfo.ProductFamilies = localStorageService.get('ProductFamily');

        $scope.DealEntryProposalInfo.ProductGroup = {};
        $scope.DealEntryProposalInfo.ProductGroups = localStorageService.get('ProductGroup');

        $scope.DealEntryProposalInfo.ProductType = {};
        $scope.DealEntryProposalInfo.ProductTypes = localStorageService.get('ProductType');

        //FX Forward

        $scope.DealEntryProposalInfo.Strategy = {};
        $scope.DealEntryProposalInfo.PayCurrency = {}
        $scope.DealEntryProposalInfo.PayCurrencyList = localStorageService.get("CurrencyEnum");
        $scope.DealEntryProposalInfo.PayCurrencyList.splice(2,1);
        $scope.DealEntryProposalInfo.ReceiveCurrency = {};
        $scope.DealEntryProposalInfo.ReceivecurrencyList = localStorageService.get("CurrencyEnum");
        $scope.DealEntryProposalInfo.ReceivecurrencyList.splice(2,1);

        $scope.exchangeCurrency = function () {

            let tmpPayCurrency = $scope.DealEntryProposalInfo.PayCurrency.selected;
            let tmpReceiveCurrency = $scope.DealEntryProposalInfo.ReceiveCurrency.selected;

            if((tmpPayCurrency && tmpReceiveCurrency) && (tmpPayCurrency != tmpReceiveCurrency) ){
                $scope.DealEntryProposalInfo.PayCurrency.selected = tmpReceiveCurrency;
                $scope.DealEntryProposalInfo.ReceiveCurrency.selected = tmpPayCurrency;
            }

        }

        $scope.DealEntryProposalInfo.Strategies = [ {"key" : 'market_trade', "name": 'Market Trade'},
            { "key": 'client_market_trade', "name": 'Client + Market Trade'}];

        $scope.DealEntryProposalInfo.StrategyID = 'FX_'+Math.floor((Math.random() * 999999999) + 1);

        $scope.removeLegalEntityClient = function (index) {
            if($scope.DealEntryProposalInfo.clients.length > 1){
                $scope.DealEntryProposalInfo.clients.splice(index,1);
            }
        }

        $scope.addLegaLEntityClient = function () {
            $scope.DealEntryProposalInfo.clients.push({"ClientID": 'FX_'+Math.floor((Math.random() * 999999999) + 1)+'_CL',"legalEntitiesClient": [], ClientSell: 0, ClientBuy:0});

        }

        LegalEntityService.getAll().then(function (result) {
            $scope.DealEntryProposalInfo.legalEntitiesPO = [];

            $scope.DealEntryProposalInfo.CounterParty = {"MarketTradeID": 'FX_'+ Math.floor((Math.random() * 999999999) + 1)+ '_CP',"legalEntityCounterParty":{}, "legalEntitiesCounterParty":[],
                "WeSell": 0 ,"WeBuy": 0};
            $scope.DealEntryProposalInfo.clients = [];
            $scope.DealEntryProposalInfo.clients.push({"ClientID": 'FX_'+ Math.floor((Math.random() * 999999999) + 1)+ '_CL',"legalEntitiesClient": [], ClientSell: 0, ClientBuy:0});

            let legalEntities = result.data.dataResponse;
            legalEntities.forEach(function(legalEntity){
                if(legalEntity != null){
                    angular.forEach(legalEntity.roleList, function( rol ) {
                        if(rol.roleType == "PO"){
                            $scope.DealEntryProposalInfo.legalEntitiesPO.push(legalEntity);
                        }
                        else if(rol.roleType == "COUNTERPARTY"){
                            $scope.DealEntryProposalInfo.CounterParty.legalEntitiesCounterParty.push(legalEntity);
                        }
                        else if(rol.roleType == "CLIENT"){
                            for(var i= 0; i> $scope.DealEntryProposalInfo.clients.length; i++){
                                $scope.DealEntryProposalInfo.clients[i].legalEntitiesClient.push(legalEntity);
                            }
                        }
                    });
                }
            });

            //inicializando combos
            $scope.DealEntryProposalInfo.legalEntityPO = {};
            $scope.DealEntryProposalInfo.legalEntityPO.selected = $scope.DealEntryProposalInfo.legalEntitiesPO[0];
            $scope.DealEntryProposalInfo.Strategy.selected = $scope.DealEntryProposalInfo.Strategies[0];
            //$scope.DealEntryProposalInfo.legalEntityCounterParty.selected = $scope.DealEntryProposalInfo.legalEntitiesCounterParty[0];
            //$scope.DealEntryProposalInfo.legalEntityClient.selected = $scope.DealEntryProposalInfo.legalEntitiesClient[0];

        });


        $scope.DealEntryProposalInfo.PayBasisCalculationConvention = {};
        $scope.DealEntryProposalInfo.ReceiveBasisCalculationConvention = {};
        $scope.DealEntryProposalInfo.BasisCalculationConventions = localStorageService.get('BasisCalculationConvention');

        $scope.DealEntryProposalInfo.currencyList = localStorageService.get("CurrencyEnum");
        $scope.DealEntryProposalInfo.currency ={};

        $scope.DealEntryProposalInfo.TradeType = {};
        $scope.DealEntryProposalInfo.TradeTypes = localStorageService.get('IRSType');

        $scope.DealEntryProposalInfo.TradeSubType = {};
        $scope.DealEntryProposalInfo.TradeSubTypes = localStorageService.get('IRSSubtype');


        $scope.DealEntryProposalInfo.PayConvention = {};
        $scope.DealEntryProposalInfo.PayConventions = localStorageService.get('Convention');

        $scope.DealEntryProposalInfo.ReceiveConvention = {};
        $scope.DealEntryProposalInfo.ReceiveConventions = localStorageService.get('Convention');

        $scope.DealEntryProposalInfo.PayStubType = {};
        $scope.DealEntryProposalInfo.PayStubTypes = localStorageService.get('StubType');

        $scope.DealEntryProposalInfo.ReceiveStubType = {};
        $scope.DealEntryProposalInfo.ReceiveStubTypes = localStorageService.get('StubType');

        $scope.DealEntryProposalInfo.PayPaymentFrequency = {};
        $scope.DealEntryProposalInfo.
            PayPaymentFrequencies = [{key: '1D', number: 1, letter: 'D'},{key: '1M', number: 1, letter: 'M'},
            {key: '3M', number: 3, letter: 'M'}, {key: '6M', number: 6, letter: 'M'}, {key: '12M', number: 12, letter: 'M'}];

        $scope.DealEntryProposalInfo.ReceivePaymentFrequency = {};
        $scope.DealEntryProposalInfo.ReceivePaymentFrequencies = [{key: '1D', number: 1, letter: 'D'},{key: '1M', number: 1, letter: 'M'},
            {key: '3M', number: 3, letter: 'M'}, {key: '6M', number: 6, letter: 'M'}, {key: '12M', number: 12, letter: 'M'}];

        $scope.DealEntryProposalInfo.PayRollFrequency = {};
        $scope.DealEntryProposalInfo.
            PayRollFrequencies = [{key: '1D', number: 1, letter: 'D'},{key: '1M', number: 1, letter: 'M'},
            {key: '3M', number: 3, letter: 'M'}, {key: '6M', number: 6, letter: 'M'}, {key: '12M', number: 12, letter: 'M'}];

        $scope.DealEntryProposalInfo.ReceiveRollFrequency = {};
        $scope.DealEntryProposalInfo.ReceiveRollFrequencies = [{key: '1D', number: 1, letter: 'D'},{key: '1M', number: 1, letter: 'M'},
            {key: '3M', number: 3, letter: 'M'}, {key: '6M', number: 6, letter: 'M'}, {key: '12M', number: 12, letter: 'M'}];

        $scope.DealEntryProposalInfo.PayRollConvention = {};
        $scope.DealEntryProposalInfo.
            PayRollConventions = [];

        $scope.DealEntryProposalInfo.ReceiveRollConvention = {};
        $scope.DealEntryProposalInfo.
            ReceiveRollConventions = [];

        $scope.DealEntryProposalInfo.ReceiveRollConvention = {};
        $scope.DealEntryProposalInfo.
            ReceiveRollConventions = [];

        $scope.DealEntryProposalInfo.PayCompoundingMethod = {};
        $scope.DealEntryProposalInfo.PayCompoundingMethods = [];

        $scope.DealEntryProposalInfo.ReceiveCompoundingMethod = {};
        $scope.DealEntryProposalInfo.ReceiveCompoundingMethods = [];

        $scope.DealEntryProposalInfo.PayTenor ={}
        $scope.DealEntryProposalInfo.PayTenors = [];

        $scope.DealEntryProposalInfo.ReceiveTenor ={}
        $scope.DealEntryProposalInfo.ReceiveTenors = [];


        $scope.DealEntryProposalInfo.filterLeg = function (leg) {

            if(leg == "pay"){
                if($scope.DealEntryProposalInfo.PayLegType=="FIXED"){
                    $scope.DealEntryProposalInfo.PayBasisCalculationConvention.selected = $scope.DealEntryProposalInfo.BasisCalculationConventions.find(function (basis) {
                        if(basis.key == "_30_360"){
                            return basis;
                        }
                    });
                }
                else if($scope.DealEntryProposalInfo.PayLegType=="FLOATING"){
                    $scope.DealEntryProposalInfo.PayBasisCalculationConvention.selected = $scope.DealEntryProposalInfo.BasisCalculationConventions.find(function (basis) {
                        if(basis.key == "ACT_360"){
                            return basis;
                        }
                    });
                }
            }
            else if(leg == "receive"){
                if($scope.DealEntryProposalInfo.ReceiveLegType=="FIXED"){
                    $scope.DealEntryProposalInfo.ReceiveBasisCalculationConvention.selected = $scope.DealEntryProposalInfo.BasisCalculationConventions.find(function (basis) {
                        if(basis.key == "_30_360"){
                            return basis;
                        }
                    });
                }
                else if($scope.DealEntryProposalInfo.ReceiveLegType=="FLOATING"){
                    $scope.DealEntryProposalInfo.ReceiveBasisCalculationConvention.selected = $scope.DealEntryProposalInfo.BasisCalculationConventions.find(function (basis) {
                        if(basis.key == "ACT_360"){
                            return basis;
                        }
                    });
                }
            }
        }

        $scope.DealEntryProposalInfo.LegTypes = ["FIXED","FLOATING"];
        $scope.DealEntryProposalInfo.PayLegType = $scope.DealEntryProposalInfo.LegTypes[0];
        $scope.DealEntryProposalInfo.ReceiveLegType = $scope.DealEntryProposalInfo.LegTypes[1];
        $scope.DealEntryProposalInfo.filterLeg("pay");
        $scope.DealEntryProposalInfo.filterLeg("receive");


        $scope.DealEntryProposalInfo.SupportedIndex = {};
        $scope.DealEntryProposalInfo.SupportedIndexes = localStorageService.get('Supportedindexes');

        function findProductFromPrefix(arr, prefix) {
            //var values = [];
            for (var i = arr.length-1; i >=0;  i--) {
                if (arr[i].key.indexOf(prefix) !== 0) {
                    arr.splice(i, 1);
                    //values.push(arr[i].split(splitChar)[1]);
                }
            }
        }

        $scope.DealEntryProposalInfo.filterProduct = function (product, prefix) {
            //console.log(product);
            //console.log(prefix.key);
            if(product == "ProductFamily"){

                $scope.DealEntryProposalInfo.ProductGroups = localStorageService.get('ProductGroup');
                findProductFromPrefix($scope.DealEntryProposalInfo.ProductGroups, prefix.name);
                $scope.DealEntryProposalInfo.ProductGroup = {selected: {}};
                $scope.DealEntryProposalInfo.ProductGroup.selected = $scope.DealEntryProposalInfo.ProductGroups[0];
                $scope.DealEntryProposalInfo.filterProduct('ProductGroup',$scope.DealEntryProposalInfo.ProductGroup.selected);
            }

            else if(product == "ProductGroup"){
                $scope.DealEntryProposalInfo.ProductGroup.selected = prefix;
                $scope.DealEntryProposalInfo.ProductTypes = localStorageService.get('ProductType');
                findProductFromPrefix($scope.DealEntryProposalInfo.ProductTypes,prefix.name);
                $scope.DealEntryProposalInfo.ProductType = {selected: {}};
                $scope.DealEntryProposalInfo.ProductType = {selected: $scope.DealEntryProposalInfo.ProductTypes[0]};

                $scope.DealEntryProposalInfo.ProductFamily = {selected: {}};
                $scope.DealEntryProposalInfo.ProductFamily.selected = $scope.DealEntryProposalInfo.ProductFamilies.find(function (productFamily) {
                    if(productFamily.name == prefix.key){
                        return productFamily;
                    }
                });
            }
            else if(product == "ProductType"){

                if(!$scope.DealEntryProposalInfo.ProductGroup.selected){
                    $scope.DealEntryProposalInfo.ProductGroup.selected = $scope.DealEntryProposalInfo.ProductGroups.find(function (productGroup) {
                        if(productGroup.name == prefix.key){
                            return productGroup;
                        }
                    });
                    if($scope.DealEntryProposalInfo.ProductGroup.selected){
                        $scope.DealEntryProposalInfo.ProductFamily.selected = $scope.DealEntryProposalInfo.ProductFamilies.find(function (productFamily) {
                            if(productFamily.name == $scope.DealEntryProposalInfo.ProductGroup.selected.key){
                                return productFamily;
                            }
                        })
                    }

                }
            }
        }


        $scope.DealEntryProposalInfo.effectiveDate = new Date();
        $scope.DealEntryProposalInfo.terminationDate = new Date();

        $scope.DealEntryProposalInfo.effectivePopup = { opened: false};
        $scope.DealEntryProposalInfo.terminationPopup = { opened: false};

        $scope.DealEntryProposalInfo.settlementDate = new Date();
        $scope.DealEntryProposalInfo.settlementDate = new Date();

        $scope.DealEntryProposalInfo.openDatePicker = function (datePicker) {
            if(datePicker == "effective"){
                $scope.DealEntryProposalInfo.effectivePopup.opened = true;
            }
            else if(datePicker == "termination"){
                $scope.DealEntryProposalInfo.terminationPopup.opened = true;
            }
            else if(datePicker == "settlement"){
                $scope.DealEntryProposalInfo.settlementPopup.opened = true;
            }
        };


        if($scope.parameters.Simulation){
            var jsonTrade = {
                "productType": "IRD_IRS",
                "productSubType": "IRD_IRS_IBOR_PLAIN_VANILLA",
                "internalId": 0,
                "contractId": 0,
                "ccpReportedNPV": 0.0,
                "npvSwapClearVM": 0.0,
                "notional": 1052993,
                "currency": "USD",
                "tradeType": "SWAP",
                "tradeSubType": "SWAP_VANILLA",
                "isActive": false,
                "partyATradeId": "",
                "partyBTradeId": "",
                "irs": {
                    "internalId": 684268925,
                    "tipo": "SWAP",
                    "subtipo": "SWAP_VANILLA",
                    "swaplegA": {
                        "isFloating": false,
                        "isFRA": false,
                        "isOIS": false,
                        "isCompound": false,
                        "isStraight": false,
                        "rates": 0,
                        "imRates": 0,
                        "imDiscounts": 0,
                        "presentValue": 0.0,
                        "internalId": 156507204,
                        "idIrs": 684268925,
                        "legType": "FIXED",
                        "legSense": "PAY",
                        "effectiveDateUnadjusted": "Sep 12, 2014 12:00:00 AM",
                        "effectiveDateAdjusted": "Sep 12, 2014 12:00:00 AM",
                        "effectiveDateConvention": "MODFOLLOWING",
                        "effectiveDateBusinessCenter": [
                            {
                                "FinancialCentreName": "London",
                                "FinancialCentreCode": "GBLO"
                            },
                            {
                                "FinancialCentreName": "New York",
                                "FinancialCentreCode": "USNY"
                            }
                        ],
                        "terminationDateUnadjusted": "Sep 12, 2021 12:00:00 AM",
                        "terminationDateAdjusted": "Sep 13, 2021 12:00:00 AM",
                        "terminationDateConvention": "MODFOLLOWING",
                        "terminationDateBCenter": [
                            {
                                "FinancialCentreName": "London",
                                "FinancialCentreCode": "GBLO"
                            },
                            {
                                "FinancialCentreName": "New York",
                                "FinancialCentreCode": "USNY"
                            }
                        ],
                        "calculationPeriodConvention": "MODFOLLOWING",
                        "calculationPeriodBCenter": [
                            {
                                "FinancialCentreName": "London",
                                "FinancialCentreCode": "GBLO"
                            },
                            {
                                "FinancialCentreName": "New York",
                                "FinancialCentreCode": "USNY"
                            }
                        ],
                        "calculationPeriodMultiplier": 6,
                        "calculationPeriodPeriod": "M",
                        "calcPeriodRollConvention": "DAY_12",
                        "paymentDatePeriodMultiplier": 6,
                        "paymentDatePeriod": "M",
                        "paymentDatePayRelativeTo": "PERIOD_END",
                        "paymentDayOffsetMultiplier": 0,
                        "paymentDateOffsetPeriod": "D",
                        "paymentDateOffsetDayType": "NONE",
                        "paymentDateConvention": "NONE",
                        "paymentDateBusinessCenter": [],
                        "fixingDatePeriodMultiplier": -9223372036854775808,
                        "resetPeriodMultiplier": -9223372036854775808,
                        "indexPeriodMultiplier": -9223372036854775808,
                        "spread": 49999324,
                        "fixedRateInitialValue": 4.9E-324,
                        "notional": 1.0E8,
                        "currency": "USD",
                        "firstRegPeriodStartDate": "Sep 12, 2014 12:00:00 AM",
                        "lastRegularPeriodEndDate": "Sep 12, 2021 12:00:00 AM",
                        "initialStubRate": 4.9E-324,
                        "initStubFloatRateIndex1": "",
                        "initStubPeriodMultiplier1": -9223372036854775808,
                        "initStubFloatingRateIndex2": "",
                        "initStubPeriodMultiplier2": -9223372036854775808,
                        "finalStubFloatRateIndex1": "",
                        "finalStubPeriodMultiplier1": -9223372036854775808,
                        "finalStubFloatRateIndex2": "",
                        "finalStubPeriodMultiplier2": -9223372036854775808,
                        "finalStubRate": 4.9E-324
                    },
                    "swaplegB": {
                        "isFloating": true,
                        "isFRA": false,
                        "isOIS": false,
                        "isCompound": false,
                        "isStraight": false,
                        "rates": 0,
                        "imRates": 0,
                        "imDiscounts": 0,
                        "presentValue": 0.0,
                        "internalId": 1824538070,
                        "idIrs": 684268925,
                        "legType": "FLOATING",
                        "legSense": "RECEIVE",
                        "effectiveDateUnadjusted": "Sep 12, 2014 12:00:00 AM",
                        "effectiveDateAdjusted": "Sep 12, 2014 12:00:00 AM",
                        "effectiveDateConvention": "MODFOLLOWING",
                        "effectiveDateBusinessCenter": [
                            {
                                "FinancialCentreName": "London",
                                "FinancialCentreCode": "GBLO"
                            }
                        ],
                        "terminationDateUnadjusted": "Sep 12, 2021 12:00:00 AM",
                        "terminationDateAdjusted": "Sep 13, 2021 12:00:00 AM",
                        "terminationDateConvention": "MODFOLLOWING",
                        "terminationDateBCenter": [
                            {
                                "FinancialCentreName": "London",
                                "FinancialCentreCode": "GBLO"
                            }
                        ],
                        "calculationPeriodConvention": "MODFOLLOWING",
                        "calculationPeriodBCenter": [
                            {
                                "FinancialCentreName": "London",
                                "FinancialCentreCode": "GBLO"
                            }
                        ],
                        "calculationPeriodMultiplier": 3,
                        "calculationPeriodPeriod": "M",
                        "calcPeriodRollConvention": "DAY_12",
                        "paymentDatePeriodMultiplier": 3,
                        "paymentDatePeriod": "M",
                        "paymentDatePayRelativeTo": "PERIOD_END",
                        "paymentDayOffsetMultiplier": 0,
                        "paymentDateOffsetPeriod": "D",
                        "paymentDateOffsetDayType": "NONE",
                        "paymentDateConvention": "NONE",
                        "paymentDateBusinessCenter": [],
                        "fixingDatePeriodMultiplier": -2,
                        "fixingDatePeriod": "D",
                        "fixingDateDayType": "NONE",
                        "fixingDateConvention": "NONE",
                        "fixingDateBusinessCenter": [
                            {
                                "FinancialCentreName": "London",
                                "FinancialCentreCode": "GBLO"
                            }
                        ],
                        "resetPeriodMultiplier": -9223372036854775808,
                        "index": {
                            "isdaName": "USD-LIBOR-BBA",
                            "strataName": "USD-LIBOR-3M",
                            "tenor": "3M",
                            "tenorMultiplier": 3,
                            "tenorPeriod": "M",
                            "currency": "USD",
                            "rootName": "LIBOR",
                            "isOvernight": false
                        },
                        "indexPeriodMultiplier": 3,
                        "indexPeriod": "M",
                        "spread": 49999324,
                        "fixedRateInitialValue": 4.9E-324,
                        "notional": 1.0E8,
                        "currency": "USD",
                        "firstRegPeriodStartDate": "Sep 12, 2014 12:00:00 AM",
                        "lastRegularPeriodEndDate": "Sep 12, 2021 12:00:00 AM",
                        "initialStubRate": 4.9E-324,
                        "initStubFloatRateIndex1": "",
                        "initStubPeriodMultiplier1": -9223372036854775808,
                        "initStubFloatingRateIndex2": "",
                        "initStubPeriodMultiplier2": -9223372036854775808,
                        "finalStubFloatRateIndex1": "",
                        "finalStubPeriodMultiplier1": -9223372036854775808,
                        "finalStubFloatRateIndex2": "",
                        "finalStubPeriodMultiplier2": -9223372036854775808,
                        "finalStubRate": 4.9E-324
                    }
                }
            };

            $scope.DealEntryProposalInfo.ProductType.selected = {"key": jsonTrade.productType,"name": jsonTrade.productType };
            $scope.DealEntryProposalInfo.filterProduct("ProductType", $scope.DealEntryProposalInfo.ProductType.selected);

            /* IRD_IRS*/
            $scope.DealEntryProposalInfo.TradeType.selected = {"key": jsonTrade.tradeType, "name": jsonTrade.tradeType};
            $scope.DealEntryProposalInfo.TradeSubType.selected = {"key": jsonTrade.tradeSubType, "name": jsonTrade.tradeSubType};

            $scope.DealEntryProposalInfo.Notional = jsonTrade.notional;
            $scope.DealEntryProposalInfo.currency.selected = {"key" : jsonTrade.currency, "name": jsonTrade.currency};
            $scope.DealEntryProposalInfo.effectiveDate = "2016-09-01";
            $scope.DealEntryProposalInfo.terminationDate = "2016-09-20";

            $scope.DealEntryProposalInfo.PayLegType = jsonTrade.irs.swaplegA.legType;
            $scope.DealEntryProposalInfo.PayConvention.selected = {"name": jsonTrade.irs.swaplegA.effectiveDateConvention, "key": jsonTrade.irs.swaplegA.effectiveDateConvention};

            $scope.DealEntryProposalInfo.PayStubType.selected = {"name": "FRONT_SHORT"};
            $scope.DealEntryProposalInfo.PayPaymentFrequency.selected = {"name": "6M"};
            $scope.DealEntryProposalInfo.PayRollFrequency.selected = {"name": "6M"};
            $scope.DealEntryProposalInfo.PayRollConvention.selected = {"name": jsonTrade.irs.swaplegA.calcPeriodRollConvention};

            $scope.DealEntryProposalInfo.ReceiveTenor.selected = {"name": jsonTrade.irs.swaplegB.index.tenor};

            $scope.DealEntryProposalInfo.ReceiveSpread = jsonTrade.irs.swaplegB.spread;

            $scope.DealEntryProposalInfo.ReceiveStubType.selected = {"name": "BACK_SHORT"};
            $scope.DealEntryProposalInfo.ReceivePaymentFrequency.selected = {"name": "3M"};
            $scope.DealEntryProposalInfo.ReceiveRollFrequency.selected = {"name": "6M"};
            $scope.DealEntryProposalInfo.ReceiveRollConvention.selected = {"name": jsonTrade.irs.swaplegB.calcPeriodRollConvention};


        }

    }]);