'use strict';

var DashboardApp = angular.module('DashboardApp');

DashboardApp.controller('TradeProposalInfoController', ['TradeProposalService', 'LegalEntityService', '$scope',
    '$timeout', 'localStorageService', 'uiGridConstants', 'DashboardService', '$q',
    function (TradeProposalService,LegalEntityService, $scope, $timeout, localStorageService, uiGridConstants, DashboardService, $q) {

        $scope.TradeProposalInfo = {};

        $scope.TradeProposalInfo.ProductFamily = {};
        $scope.TradeProposalInfo.ProductFamilies = localStorageService.get('ProductFamily');

        $scope.TradeProposalInfo.ProductGroup = {};
        $scope.TradeProposalInfo.ProductGroups = localStorageService.get('ProductGroup');

        $scope.TradeProposalInfo.ProductType = {};
        $scope.TradeProposalInfo.ProductTypes = localStorageService.get('ProductType');

        //FX Forward

        $scope.TradeProposalInfo.Strategy = {};
        $scope.TradeProposalInfo.PayCurrency = {}
        $scope.TradeProposalInfo.PayCurrencyList = localStorageService.get("CurrencyEnum");
        $scope.TradeProposalInfo.PayCurrencyList.splice(2,1);
        $scope.TradeProposalInfo.ReceiveCurrency = {};
        $scope.TradeProposalInfo.ReceivecurrencyList = localStorageService.get("CurrencyEnum");
        $scope.TradeProposalInfo.ReceivecurrencyList.splice(2,1);

        $scope.TradeProposalInfo.calculateWeSellBuy = function (input) {

            if(input == 'fx' && ($scope.TradeProposalInfo.BTBHedgeFxRate!='0.00000' || $scope.TradeProposalInfo.CounterParty.WeSell!='0.00' || $scope.TradeProposalInfo.CounterParty.WeBuy !='0.00')){
                $scope.TradeProposalInfo.CounterParty.WeBuy = ($scope.TradeProposalInfo.CounterParty.WeSell * $scope.TradeProposalInfo.BTBHedgeFxRate);
            }
            else if(input=='sell') {
                $scope.TradeProposalInfo.CounterParty.WeBuy = ($scope.TradeProposalInfo.CounterParty.WeSell * $scope.TradeProposalInfo.BTBHedgeFxRate);
            }
            else {
                $scope.TradeProposalInfo.CounterParty.WeSell = ($scope.TradeProposalInfo.CounterParty.WeBuy / $scope.TradeProposalInfo.BTBHedgeFxRate)
            }

        }

        $scope.TradeProposalInfo.calculateClientSellBuy = function (input, indexClient) {

            if(input == 'fx' && ($scope.TradeProposalInfo.ClientTradeFxRate!='0.00000')){
                $scope.TradeProposalInfo.clients.forEach( function (client) {
                    if(client.ClientSell != '0.00'){
                        client.ClientBuy = (client.ClientSell * $scope.TradeProposalInfo.ClientTradeFxRate);
                    }
                });

            }
            else if(input=='sell') {
                $scope.TradeProposalInfo.clients[indexClient].ClientBuy = ($scope.TradeProposalInfo.clients[indexClient].ClientSell * $scope.TradeProposalInfo.ClientTradeFxRate);
            }
            else {
                $scope.TradeProposalInfo.clients[indexClient].ClientSell = ($scope.TradeProposalInfo.clients[indexClient].ClientBuy / $scope.TradeProposalInfo.ClientTradeFxRate)
            }
            if($scope.TradeProposalInfo.clients.length == 1){
                $scope.TradeProposalInfo.BTBHedgeFxRate = $scope.TradeProposalInfo.ClientTradeFxRate;
                $scope.TradeProposalInfo.CounterParty.WeBuy = $scope.TradeProposalInfo.clients[0].ClientBuy;
                $scope.TradeProposalInfo.CounterParty.WeSell = $scope.TradeProposalInfo.clients[0].ClientSell;
            }

        }



        $scope.exchangeCurrency = function () {

            let tmpPayCurrency = $scope.TradeProposalInfo.PayCurrency.selected;
            let tmpReceiveCurrency = $scope.TradeProposalInfo.ReceiveCurrency.selected;

            if((tmpPayCurrency && tmpReceiveCurrency) && (tmpPayCurrency != tmpReceiveCurrency) ){
                $scope.TradeProposalInfo.PayCurrency.selected = tmpReceiveCurrency;
                $scope.TradeProposalInfo.ReceiveCurrency.selected = tmpPayCurrency;
            }

        }

        $scope.TradeProposalInfo.Strategies = [ {"key" : 'market_trade', "name": 'Market Trade'},
            { "key": 'client_market_trade', "name": 'Client + Market Trade'}];

        $scope.TradeProposalInfo.StrategyID = 'FX_'+Math.floor((Math.random() * 999999999) + 1);

        $scope.removeLegalEntityClient = function (index) {
            if($scope.TradeProposalInfo.clients.length > 1){
                $scope.TradeProposalInfo.clients.splice(index,1);
            }
        }

        $scope.addLegaLEntityClient = function () {
            $scope.TradeProposalInfo.clients.push({"ClientID": 'FX_'+Math.floor((Math.random() * 999999999) + 1)+'_CL',"legalEntitiesClient": [], ClientSell: 0, ClientBuy:0});

        }

        
        LegalEntityService.getAll().then(function (result) {
            $scope.TradeProposalInfo.legalEntitiesPO = [];

            $scope.TradeProposalInfo.CounterParty = {"MarketTradeID": 'FX_'+ Math.floor((Math.random() * 999999999) + 1)+ '_CP',"legalEntityCounterParty":{}, "legalEntitiesCounterParty":[],
                "WeSell": 0 ,"WeBuy": 0};
            $scope.TradeProposalInfo.clients = [];
            $scope.TradeProposalInfo.clients.push({"ClientID": 'FX_'+ Math.floor((Math.random() * 999999999) + 1)+ '_CL',"legalEntitiesClient": [], ClientSell: 0, ClientBuy:0});

            let legalEntities = result.data.dataResponse;
            legalEntities.forEach(function(legalEntity){
                if(legalEntity != null){
                    angular.forEach(legalEntity.roleList, function( rol ) {
                        if(rol.roleType == "PO"){
                            $scope.TradeProposalInfo.legalEntitiesPO.push(legalEntity);
                        }
                        else if(rol.roleType == "COUNTERPARTY"){
                            $scope.TradeProposalInfo.CounterParty.legalEntitiesCounterParty.push(legalEntity);
                        }
                        else if(rol.roleType == "CLIENT"){
                            for(var i= 0; i< $scope.TradeProposalInfo.clients.length; i++){
                                $scope.TradeProposalInfo.clients[i].legalEntitiesClient.push(legalEntity);
                            }
                        }
                    });
                }
            });

            //inicializando combos
            $scope.TradeProposalInfo.legalEntityPO = {};
            $scope.TradeProposalInfo.legalEntityPO.selected = $scope.TradeProposalInfo.legalEntitiesPO[0];
            $scope.TradeProposalInfo.Strategy.selected = $scope.TradeProposalInfo.Strategies[0];
            //$scope.TradeProposalInfo.legalEntityCounterParty.selected = $scope.TradeProposalInfo.legalEntitiesCounterParty[0];
            //$scope.TradeProposalInfo.legalEntityClient.selected = $scope.TradeProposalInfo.legalEntitiesClient[0];

        });


        $scope.TradeProposalInfo.PayBasisCalculationConvention = {};
        $scope.TradeProposalInfo.ReceiveBasisCalculationConvention = {};
        $scope.TradeProposalInfo.BasisCalculationConventions = localStorageService.get('BasisCalculationConvention');

        $scope.TradeProposalInfo.currencyList = localStorageService.get("CurrencyEnum");
        $scope.TradeProposalInfo.currency ={};

        $scope.TradeProposalInfo.TradeType = {};
        $scope.TradeProposalInfo.TradeTypes = localStorageService.get('IRSType');

        $scope.TradeProposalInfo.TradeSubType = {};
        $scope.TradeProposalInfo.TradeSubTypes = localStorageService.get('IRSSubtype');


        $scope.TradeProposalInfo.PayConvention = {};
        $scope.TradeProposalInfo.PayConventions = localStorageService.get('Convention');

        $scope.TradeProposalInfo.ReceiveConvention = {};
        $scope.TradeProposalInfo.ReceiveConventions = localStorageService.get('Convention');

        $scope.TradeProposalInfo.PayStubType = {};
        $scope.TradeProposalInfo.PayStubTypes = localStorageService.get('StubType');

        $scope.TradeProposalInfo.ReceiveStubType = {};
        $scope.TradeProposalInfo.ReceiveStubTypes = localStorageService.get('StubType');

        $scope.TradeProposalInfo.PayPaymentFrequency = {};
        $scope.TradeProposalInfo.
            PayPaymentFrequencies = [{key: '1D', number: 1, letter: 'D'},{key: '1M', number: 1, letter: 'M'},
            {key: '3M', number: 3, letter: 'M'}, {key: '6M', number: 6, letter: 'M'}, {key: '12M', number: 12, letter: 'M'}];

        $scope.TradeProposalInfo.ReceivePaymentFrequency = {};
        $scope.TradeProposalInfo.ReceivePaymentFrequencies = [{key: '1D', number: 1, letter: 'D'},{key: '1M', number: 1, letter: 'M'},
            {key: '3M', number: 3, letter: 'M'}, {key: '6M', number: 6, letter: 'M'}, {key: '12M', number: 12, letter: 'M'}];

        $scope.TradeProposalInfo.PayRollFrequency = {};
        $scope.TradeProposalInfo.
            PayRollFrequencies = [{key: '1D', number: 1, letter: 'D'},{key: '1M', number: 1, letter: 'M'},
            {key: '3M', number: 3, letter: 'M'}, {key: '6M', number: 6, letter: 'M'}, {key: '12M', number: 12, letter: 'M'}];

        $scope.TradeProposalInfo.ReceiveRollFrequency = {};
        $scope.TradeProposalInfo.ReceiveRollFrequencies = [{key: '1D', number: 1, letter: 'D'},{key: '1M', number: 1, letter: 'M'},
            {key: '3M', number: 3, letter: 'M'}, {key: '6M', number: 6, letter: 'M'}, {key: '12M', number: 12, letter: 'M'}];

        $scope.TradeProposalInfo.PayRollConvention = {};
        $scope.TradeProposalInfo.
            PayRollConventions = [];

        $scope.TradeProposalInfo.ReceiveRollConvention = {};
        $scope.TradeProposalInfo.
            ReceiveRollConventions = [];

        $scope.TradeProposalInfo.ReceiveRollConvention = {};
        $scope.TradeProposalInfo.
            ReceiveRollConventions = [];

        $scope.TradeProposalInfo.PayCompoundingMethod = {};
        $scope.TradeProposalInfo.PayCompoundingMethods = [];

        $scope.TradeProposalInfo.ReceiveCompoundingMethod = {};
        $scope.TradeProposalInfo.ReceiveCompoundingMethods = [];

        $scope.TradeProposalInfo.PayTenor ={}
        $scope.TradeProposalInfo.PayTenors = [];

        $scope.TradeProposalInfo.ReceiveTenor ={}
        $scope.TradeProposalInfo.ReceiveTenors = [];


        $scope.TradeProposalInfo.filterLeg = function (leg) {

            if(leg == "pay"){
                if($scope.TradeProposalInfo.PayLegType=="FIXED"){
                    $scope.TradeProposalInfo.PayBasisCalculationConvention.selected = $scope.TradeProposalInfo.BasisCalculationConventions.find(function (basis) {
                        if(basis.key == "_30_360"){
                            return basis;
                        }
                    });
                }
                else if($scope.TradeProposalInfo.PayLegType=="FLOATING"){
                    $scope.TradeProposalInfo.PayBasisCalculationConvention.selected = $scope.TradeProposalInfo.BasisCalculationConventions.find(function (basis) {
                        if(basis.key == "ACT_360"){
                            return basis;
                        }
                    });
                }
            }
            else if(leg == "receive"){
                if($scope.TradeProposalInfo.ReceiveLegType=="FIXED"){
                    $scope.TradeProposalInfo.ReceiveBasisCalculationConvention.selected = $scope.TradeProposalInfo.BasisCalculationConventions.find(function (basis) {
                        if(basis.key == "_30_360"){
                            return basis;
                        }
                    });
                }
                else if($scope.TradeProposalInfo.ReceiveLegType=="FLOATING"){
                    $scope.TradeProposalInfo.ReceiveBasisCalculationConvention.selected = $scope.TradeProposalInfo.BasisCalculationConventions.find(function (basis) {
                        if(basis.key == "ACT_360"){
                            return basis;
                        }
                    });
                }
            }
        }

        $scope.TradeProposalInfo.LegTypes = ["FIXED","FLOATING"];
        $scope.TradeProposalInfo.PayLegType = $scope.TradeProposalInfo.LegTypes[0];
        $scope.TradeProposalInfo.ReceiveLegType = $scope.TradeProposalInfo.LegTypes[1];
        $scope.TradeProposalInfo.filterLeg("pay");
        $scope.TradeProposalInfo.filterLeg("receive");


        $scope.TradeProposalInfo.SupportedIndex = {};
        $scope.TradeProposalInfo.SupportedIndexes = localStorageService.get('Supportedindexes');

        function findProductFromPrefix(arr, prefix) {
            //var values = [];
            for (var i = arr.length-1; i >=0;  i--) {
                if (arr[i].key.indexOf(prefix) !== 0) {
                    arr.splice(i, 1);
                    //values.push(arr[i].split(splitChar)[1]);
                }
            }
        }

        $scope.TradeProposalInfo.filterProduct = function (product, prefix) {
            //console.log(product);
            //console.log(prefix.key);
            if(product == "ProductFamily"){

                $scope.TradeProposalInfo.ProductGroups = localStorageService.get('ProductGroup');
                findProductFromPrefix($scope.TradeProposalInfo.ProductGroups, prefix.name);
                $scope.TradeProposalInfo.ProductGroup = {selected: {}};
                $scope.TradeProposalInfo.ProductGroup.selected = $scope.TradeProposalInfo.ProductGroups[0];
                $scope.TradeProposalInfo.filterProduct('ProductGroup',$scope.TradeProposalInfo.ProductGroup.selected);
            }

            else if(product == "ProductGroup"){
                $scope.TradeProposalInfo.ProductGroup.selected = prefix;
                $scope.TradeProposalInfo.ProductTypes = localStorageService.get('ProductType');
                findProductFromPrefix($scope.TradeProposalInfo.ProductTypes,prefix.name);
                $scope.TradeProposalInfo.ProductType = {selected: {}};
                $scope.TradeProposalInfo.ProductType = {selected: $scope.TradeProposalInfo.ProductTypes[0]};

                $scope.TradeProposalInfo.ProductFamily = {selected: {}};
                $scope.TradeProposalInfo.ProductFamily.selected = $scope.TradeProposalInfo.ProductFamilies.find(function (productFamily) {
                    if(productFamily.name == prefix.key){
                        return productFamily;
                    }
                });
            }
            else if(product == "ProductType"){

                if(!$scope.TradeProposalInfo.ProductGroup.selected){
                    $scope.TradeProposalInfo.ProductGroup.selected = $scope.TradeProposalInfo.ProductGroups.find(function (productGroup) {
                        if(productGroup.name == prefix.key){
                            return productGroup;
                        }
                    });
                    if($scope.TradeProposalInfo.ProductGroup.selected){
                        $scope.TradeProposalInfo.ProductFamily.selected = $scope.TradeProposalInfo.ProductFamilies.find(function (productFamily) {
                            if(productFamily.name == $scope.TradeProposalInfo.ProductGroup.selected.key){
                                return productFamily;
                            }
                        })
                    }

                }
            }
        }

        $scope.TradeProposalInfo.effectiveDate = new Date();
        $scope.TradeProposalInfo.terminationDate = new Date();

        $scope.TradeProposalInfo.effectivePopup = { opened: false};
        $scope.TradeProposalInfo.terminationPopup = { opened: false};

        $scope.TradeProposalInfo.settlementDate = new Date();
        $scope.TradeProposalInfo.settlementPopup = { opened: false};

        $scope.TradeProposalInfo.openDatePicker = function (datePicker) {
            if(datePicker == "effective"){
                $scope.TradeProposalInfo.effectivePopup.opened = true;
            }
            else if(datePicker == "termination"){
                $scope.TradeProposalInfo.terminationPopup.opened = true;
            }
            else if(datePicker == "settlement"){
                $scope.TradeProposalInfo.settlementPopup.opened = true;
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

            $scope.TradeProposalInfo.ProductType.selected = {"key": jsonTrade.productType,"name": jsonTrade.productType };
            $scope.TradeProposalInfo.filterProduct("ProductType", $scope.TradeProposalInfo.ProductType.selected);

            /* IRD_IRS*/
            $scope.TradeProposalInfo.TradeType.selected = {"key": jsonTrade.tradeType, "name": jsonTrade.tradeType};
            $scope.TradeProposalInfo.TradeSubType.selected = {"key": jsonTrade.tradeSubType, "name": jsonTrade.tradeSubType};

            $scope.TradeProposalInfo.Notional = jsonTrade.notional;
            $scope.TradeProposalInfo.currency.selected = {"key" : jsonTrade.currency, "name": jsonTrade.currency};
            $scope.TradeProposalInfo.effectiveDate = "2016-09-01";
            $scope.TradeProposalInfo.terminationDate = "2016-09-20";

            $scope.TradeProposalInfo.PayLegType = jsonTrade.irs.swaplegA.legType;
            $scope.TradeProposalInfo.PayConvention.selected = {"name": jsonTrade.irs.swaplegA.effectiveDateConvention, "key": jsonTrade.irs.swaplegA.effectiveDateConvention};

            $scope.TradeProposalInfo.PayStubType.selected = {"name": "FRONT_SHORT"};
            $scope.TradeProposalInfo.PayPaymentFrequency.selected = {"name": "6M"};
            $scope.TradeProposalInfo.PayRollFrequency.selected = {"name": "6M"};
            $scope.TradeProposalInfo.PayRollConvention.selected = {"name": jsonTrade.irs.swaplegA.calcPeriodRollConvention};

            $scope.TradeProposalInfo.ReceiveTenor.selected = {"name": jsonTrade.irs.swaplegB.index.tenor};

            $scope.TradeProposalInfo.ReceiveSpread = jsonTrade.irs.swaplegB.spread;

            $scope.TradeProposalInfo.ReceiveStubType.selected = {"name": "BACK_SHORT"};
            $scope.TradeProposalInfo.ReceivePaymentFrequency.selected = {"name": "3M"};
            $scope.TradeProposalInfo.ReceiveRollFrequency.selected = {"name": "6M"};
            $scope.TradeProposalInfo.ReceiveRollConvention.selected = {"name": jsonTrade.irs.swaplegB.calcPeriodRollConvention};


        }

    }]);