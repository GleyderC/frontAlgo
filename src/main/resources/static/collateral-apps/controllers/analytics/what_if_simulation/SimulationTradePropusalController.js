'use strict';

var DashboardApp = angular.module('DashboardApp');

DashboardApp.controller('SimulationTradePropusalController', ['SimulationService', '$scope',
    '$timeout', 'localStorageService', 'uiGridConstants', 'DashboardService', '$q',
    function (SimulationService, $scope, $timeout, localStorageService, uiGridConstants, DashboardService, $q) {

        $scope.SimulationTradePropusal = {};

        $scope.SimulationTradePropusal.ProductFamily = {};
        $scope.SimulationTradePropusal.ProductFamilies = localStorageService.get('ProductFamily');

        $scope.SimulationTradePropusal.ProductGroup = {};
        $scope.SimulationTradePropusal.ProductGroups = localStorageService.get('ProductGroup');

        $scope.SimulationTradePropusal.ProductType = {};
        $scope.SimulationTradePropusal.ProductTypes = localStorageService.get('ProductType');

        $scope.SimulationTradePropusal.PayBasisCalculationConvention = {};
        $scope.SimulationTradePropusal.ReceiveBasisCalculationConvention = {};
        $scope.SimulationTradePropusal.BasisCalculationConventions = localStorageService.get('BasisCalculationConvention');

        $scope.SimulationTradePropusal.currencyList = localStorageService.get("CurrencyEnum");
        $scope.SimulationTradePropusal.currency ={};

        $scope.SimulationTradePropusal.TradeType = {};
        $scope.SimulationTradePropusal.TradeTypes = localStorageService.get('IRSType');

        $scope.SimulationTradePropusal.TradeSubType = {};
        $scope.SimulationTradePropusal.TradeSubTypes = localStorageService.get('IRSSubtype');


        $scope.SimulationTradePropusal.PayConvention = {};
        $scope.SimulationTradePropusal.PayConventions = localStorageService.get('Convention');

        $scope.SimulationTradePropusal.ReceiveConvention = {};
        $scope.SimulationTradePropusal.ReceiveConventions = localStorageService.get('Convention');

        $scope.SimulationTradePropusal.PayStubType = {};
        $scope.SimulationTradePropusal.PayStubTypes = localStorageService.get('StubType');

        $scope.SimulationTradePropusal.ReceiveStubType = {};
        $scope.SimulationTradePropusal.ReceiveStubTypes = localStorageService.get('StubType');

        $scope.SimulationTradePropusal.PayPaymentFrequency = {};
        $scope.SimulationTradePropusal.
            PayPaymentFrequencies = [{key: '1D', number: 1, letter: 'D'},{key: '1M', number: 1, letter: 'M'},
            {key: '3M', number: 3, letter: 'M'}, {key: '6M', number: 6, letter: 'M'}, {key: '12M', number: 12, letter: 'M'}];

        $scope.SimulationTradePropusal.ReceivePaymentFrequency = {};
        $scope.SimulationTradePropusal.ReceivePaymentFrequencies = [{key: '1D', number: 1, letter: 'D'},{key: '1M', number: 1, letter: 'M'},
            {key: '3M', number: 3, letter: 'M'}, {key: '6M', number: 6, letter: 'M'}, {key: '12M', number: 12, letter: 'M'}];

        $scope.SimulationTradePropusal.PayRollFrequency = {};
        $scope.SimulationTradePropusal.
            PayRollFrequencies = [{key: '1D', number: 1, letter: 'D'},{key: '1M', number: 1, letter: 'M'},
            {key: '3M', number: 3, letter: 'M'}, {key: '6M', number: 6, letter: 'M'}, {key: '12M', number: 12, letter: 'M'}];

        $scope.SimulationTradePropusal.ReceiveRollFrequency = {};
        $scope.SimulationTradePropusal.ReceiveRollFrequencies = [{key: '1D', number: 1, letter: 'D'},{key: '1M', number: 1, letter: 'M'},
            {key: '3M', number: 3, letter: 'M'}, {key: '6M', number: 6, letter: 'M'}, {key: '12M', number: 12, letter: 'M'}];

        $scope.SimulationTradePropusal.PayRollConvention = {};
        $scope.SimulationTradePropusal.
            PayRollConventions = [];

        $scope.SimulationTradePropusal.ReceiveRollConvention = {};
        $scope.SimulationTradePropusal.
            ReceiveRollConventions = [];

        $scope.SimulationTradePropusal.ReceiveRollConvention = {};
        $scope.SimulationTradePropusal.
            ReceiveRollConventions = [];

        $scope.SimulationTradePropusal.PayCompoundingMethod = {};
        $scope.SimulationTradePropusal.PayCompoundingMethods = [];

        $scope.SimulationTradePropusal.ReceiveCompoundingMethod = {};
        $scope.SimulationTradePropusal.ReceiveCompoundingMethods = [];

        $scope.SimulationTradePropusal.PayTenor ={}
        $scope.SimulationTradePropusal.PayTenors = [];

        $scope.SimulationTradePropusal.ReceiveTenor ={}
        $scope.SimulationTradePropusal.ReceiveTenors = [];


        $scope.SimulationTradePropusal.filterLeg = function (leg) {

            if(leg == "pay"){
                if($scope.SimulationTradePropusal.PayLegType=="FIXED"){
                    $scope.SimulationTradePropusal.PayBasisCalculationConvention.selected = $scope.SimulationTradePropusal.BasisCalculationConventions.find(function (basis) {
                        if(basis.key == "_30_360"){
                            return basis;
                        }
                    });
                }
                else if($scope.SimulationTradePropusal.PayLegType=="FLOATING"){
                    $scope.SimulationTradePropusal.PayBasisCalculationConvention.selected = $scope.SimulationTradePropusal.BasisCalculationConventions.find(function (basis) {
                        if(basis.key == "ACT_360"){
                            return basis;
                        }
                    });
                }
            }
            else if(leg == "receive"){
                if($scope.SimulationTradePropusal.ReceiveLegType=="FIXED"){
                    $scope.SimulationTradePropusal.ReceiveBasisCalculationConvention.selected = $scope.SimulationTradePropusal.BasisCalculationConventions.find(function (basis) {
                        if(basis.key == "_30_360"){
                            return basis;
                        }
                    });
                }
                else if($scope.SimulationTradePropusal.ReceiveLegType=="FLOATING"){
                    $scope.SimulationTradePropusal.ReceiveBasisCalculationConvention.selected = $scope.SimulationTradePropusal.BasisCalculationConventions.find(function (basis) {
                        if(basis.key == "ACT_360"){
                            return basis;
                        }
                    });
                }
            }
        }

        $scope.SimulationTradePropusal.LegTypes = ["FIXED","FLOATING"];
        $scope.SimulationTradePropusal.PayLegType = $scope.SimulationTradePropusal.LegTypes[0];
        $scope.SimulationTradePropusal.ReceiveLegType = $scope.SimulationTradePropusal.LegTypes[1];
        $scope.SimulationTradePropusal.filterLeg("pay");
        $scope.SimulationTradePropusal.filterLeg("receive");


        $scope.SimulationTradePropusal.SupportedIndex = {};
        $scope.SimulationTradePropusal.SupportedIndexes = localStorageService.get('Supportedindexes');

        function findProductFromPrefix(arr, prefix) {
            //var values = [];
            for (var i = arr.length-1; i >=0;  i--) {
                if (arr[i].key.indexOf(prefix) !== 0) {
                    arr.splice(i, 1);
                    //values.push(arr[i].split(splitChar)[1]);
                }
            }
        }

        $scope.SimulationTradePropusal.filterProduct = function (product, prefix) {
            //console.log(product);
            //console.log(prefix.key);
            if(product == "ProductFamily"){

                $scope.SimulationTradePropusal.ProductGroups = localStorageService.get('ProductGroup');
                findProductFromPrefix($scope.SimulationTradePropusal.ProductGroups, prefix.name);
                $scope.SimulationTradePropusal.ProductGroup = {selected: {}};
                $scope.SimulationTradePropusal.ProductGroup.selected = $scope.SimulationTradePropusal.ProductGroups[0];
                $scope.SimulationTradePropusal.filterProduct('ProductGroup',$scope.SimulationTradePropusal.ProductGroup.selected);
            }

            else if(product == "ProductGroup"){
                $scope.SimulationTradePropusal.ProductGroup.selected = prefix;
                $scope.SimulationTradePropusal.ProductTypes = localStorageService.get('ProductType');
                findProductFromPrefix($scope.SimulationTradePropusal.ProductTypes,prefix.name);
                $scope.SimulationTradePropusal.ProductType = {selected: {}};
                $scope.SimulationTradePropusal.ProductType = {selected: $scope.SimulationTradePropusal.ProductTypes[0]};

                $scope.SimulationTradePropusal.ProductFamily = {selected: {}};
                $scope.SimulationTradePropusal.ProductFamily.selected = $scope.SimulationTradePropusal.ProductFamilies.find(function (productFamily) {
                    if(productFamily.name == prefix.key){
                        return productFamily;
                    }
                });
            }
            else if(product == "ProductType"){

                if(!$scope.SimulationTradePropusal.ProductGroup.selected){
                    $scope.SimulationTradePropusal.ProductGroup.selected = $scope.SimulationTradePropusal.ProductGroups.find(function (productGroup) {
                        if(productGroup.name == prefix.key){
                            return productGroup;
                        }
                    });
                    if($scope.SimulationTradePropusal.ProductGroup.selected){
                        $scope.SimulationTradePropusal.ProductFamily.selected = $scope.SimulationTradePropusal.ProductFamilies.find(function (productFamily) {
                            if(productFamily.name == $scope.SimulationTradePropusal.ProductGroup.selected.key){
                                return productFamily;
                            }
                        })
                    }

                }
            }
        }


        $scope.SimulationTradePropusal.effectiveDate = new Date();
        $scope.SimulationTradePropusal.terminationDate = new Date();

        $scope.SimulationTradePropusal.effectivePopup = { opened: false};
        $scope.SimulationTradePropusal.terminationPopup = { opened: false};

        $scope.SimulationTradePropusal.openDatePicker = function (datePicker) {
            if(datePicker == "effective"){
                $scope.SimulationTradePropusal.effectivePopup.opened = true;
            }
            else if(datePicker == "termination"){
                $scope.SimulationTradePropusal.terminationPopup.opened = true;
            }
        };


        if($scope.parameters.Simulation){

            console.log($scope.parameters);
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
            $scope.SimulationTradePropusal.ProductType.selected = {"key": jsonTrade.productType,"name": jsonTrade.productType };
            $scope.SimulationTradePropusal.filterProduct("ProductType", $scope.SimulationTradePropusal.ProductType.selected);

            $scope.SimulationTradePropusal.TradeType.selected = {"key": jsonTrade.tradeType, "name": jsonTrade.tradeType};
            $scope.SimulationTradePropusal.TradeSubType.selected = {"key": jsonTrade.tradeSubType, "name": jsonTrade.tradeSubType};

            $scope.SimulationTradePropusal.Notional = jsonTrade.notional;
            $scope.SimulationTradePropusal.currency.selected = {"key" : jsonTrade.currency, "name": jsonTrade.currency};
            $scope.SimulationTradePropusal.effectiveDate = "2016-09-01";
            $scope.SimulationTradePropusal.terminationDate = "2016-09-20";

            $scope.SimulationTradePropusal.PayLegType = jsonTrade.irs.swaplegA.legType;
            $scope.SimulationTradePropusal.PayConvention.selected = {"name": jsonTrade.irs.swaplegA.effectiveDateConvention, "key": jsonTrade.irs.swaplegA.effectiveDateConvention};

            $scope.SimulationTradePropusal.PayStubType.selected = {"name": "FRONT_SHORT"};
            $scope.SimulationTradePropusal.PayPaymentFrequency.selected = {"name": "6M"};
            $scope.SimulationTradePropusal.PayRollFrequency.selected = {"name": "6M"};
            $scope.SimulationTradePropusal.PayRollConvention.selected = {"name": jsonTrade.irs.swaplegA.calcPeriodRollConvention};

            $scope.SimulationTradePropusal.ReceiveTenor.selected = {"name": jsonTrade.irs.swaplegB.index.tenor};

            $scope.SimulationTradePropusal.ReceiveSpread = jsonTrade.irs.swaplegB.spread;

            $scope.SimulationTradePropusal.ReceiveStubType.selected = {"name": "BACK_SHORT"};
            $scope.SimulationTradePropusal.ReceivePaymentFrequency.selected = {"name": "3M"};
            $scope.SimulationTradePropusal.ReceiveRollFrequency.selected = {"name": "6M"};
            $scope.SimulationTradePropusal.ReceiveRollConvention.selected = {"name": jsonTrade.irs.swaplegB.calcPeriodRollConvention};


        }
    }]);