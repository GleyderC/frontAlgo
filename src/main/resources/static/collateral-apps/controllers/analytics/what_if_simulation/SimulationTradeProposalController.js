'use strict';

var DashboardApp = angular.module('DashboardApp');

DashboardApp.controller('SimulationTradeProposalController', ['SimulationService', '$scope',
    '$timeout', 'localStorageService', 'uiGridConstants', 'DashboardService', '$q',
    function (SimulationService, $scope, $timeout, localStorageService, uiGridConstants, DashboardService, $q) {

        $scope.SimulationTradeProposal = {};

        $scope.SimulationTradeProposal.ProductFamily = {};
        $scope.SimulationTradeProposal.ProductFamilies = localStorageService.get('ProductFamily');

        $scope.SimulationTradeProposal.ProductGroup = {};
        $scope.SimulationTradeProposal.ProductGroups = localStorageService.get('ProductGroup');

        $scope.SimulationTradeProposal.ProductType = {};
        $scope.SimulationTradeProposal.ProductTypes = localStorageService.get('ProductType');

        $scope.SimulationTradeProposal.PayBasisCalculationConvention = {};
        $scope.SimulationTradeProposal.ReceiveBasisCalculationConvention = {};
        $scope.SimulationTradeProposal.BasisCalculationConventions = localStorageService.get('BasisCalculationConvention');

        $scope.SimulationTradeProposal.currencyList = localStorageService.get("CurrencyEnum");
        $scope.SimulationTradeProposal.currency ={};

        $scope.SimulationTradeProposal.TradeType = {};
        $scope.SimulationTradeProposal.TradeTypes = localStorageService.get('IRSType');

        $scope.SimulationTradeProposal.TradeSubType = {};
        $scope.SimulationTradeProposal.TradeSubTypes = localStorageService.get('IRSSubtype');


        $scope.SimulationTradeProposal.PayConvention = {};
        $scope.SimulationTradeProposal.PayConventions = localStorageService.get('Convention');

        $scope.SimulationTradeProposal.ReceiveConvention = {};
        $scope.SimulationTradeProposal.ReceiveConventions = localStorageService.get('Convention');

        $scope.SimulationTradeProposal.PayStubType = {};
        $scope.SimulationTradeProposal.PayStubTypes = localStorageService.get('StubType');

        $scope.SimulationTradeProposal.ReceiveStubType = {};
        $scope.SimulationTradeProposal.ReceiveStubTypes = localStorageService.get('StubType');

        $scope.SimulationTradeProposal.PayPaymentFrequency = {};
        $scope.SimulationTradeProposal.
            PayPaymentFrequencies = [{key: '1D', number: 1, letter: 'D'},{key: '1M', number: 1, letter: 'M'},
            {key: '3M', number: 3, letter: 'M'}, {key: '6M', number: 6, letter: 'M'}, {key: '12M', number: 12, letter: 'M'}];

        $scope.SimulationTradeProposal.ReceivePaymentFrequency = {};
        $scope.SimulationTradeProposal.ReceivePaymentFrequencies = [{key: '1D', number: 1, letter: 'D'},{key: '1M', number: 1, letter: 'M'},
            {key: '3M', number: 3, letter: 'M'}, {key: '6M', number: 6, letter: 'M'}, {key: '12M', number: 12, letter: 'M'}];

        $scope.SimulationTradeProposal.PayRollFrequency = {};
        $scope.SimulationTradeProposal.
            PayRollFrequencies = [{key: '1D', number: 1, letter: 'D'},{key: '1M', number: 1, letter: 'M'},
            {key: '3M', number: 3, letter: 'M'}, {key: '6M', number: 6, letter: 'M'}, {key: '12M', number: 12, letter: 'M'}];

        $scope.SimulationTradeProposal.ReceiveRollFrequency = {};
        $scope.SimulationTradeProposal.ReceiveRollFrequencies = [{key: '1D', number: 1, letter: 'D'},{key: '1M', number: 1, letter: 'M'},
            {key: '3M', number: 3, letter: 'M'}, {key: '6M', number: 6, letter: 'M'}, {key: '12M', number: 12, letter: 'M'}];

        $scope.SimulationTradeProposal.PayRollConvention = {};
        $scope.SimulationTradeProposal.
            PayRollConventions = [];

        $scope.SimulationTradeProposal.ReceiveRollConvention = {};
        $scope.SimulationTradeProposal.
            ReceiveRollConventions = [];

        $scope.SimulationTradeProposal.ReceiveRollConvention = {};
        $scope.SimulationTradeProposal.
            ReceiveRollConventions = [];

        $scope.SimulationTradeProposal.PayCompoundingMethod = {};
        $scope.SimulationTradeProposal.PayCompoundingMethods = [];

        $scope.SimulationTradeProposal.ReceiveCompoundingMethod = {};
        $scope.SimulationTradeProposal.ReceiveCompoundingMethods = [];

        $scope.SimulationTradeProposal.PayTenor ={}
        $scope.SimulationTradeProposal.PayTenors = [];

        $scope.SimulationTradeProposal.ReceiveTenor ={}
        $scope.SimulationTradeProposal.ReceiveTenors = [];


        $scope.SimulationTradeProposal.filterLeg = function (leg) {

            if(leg == "pay"){
                if($scope.SimulationTradeProposal.PayLegType=="FIXED"){
                    $scope.SimulationTradeProposal.PayBasisCalculationConvention.selected = $scope.SimulationTradeProposal.BasisCalculationConventions.find(function (basis) {
                        if(basis.key == "_30_360"){
                            return basis;
                        }
                    });
                }
                else if($scope.SimulationTradeProposal.PayLegType=="FLOATING"){
                    $scope.SimulationTradeProposal.PayBasisCalculationConvention.selected = $scope.SimulationTradeProposal.BasisCalculationConventions.find(function (basis) {
                        if(basis.key == "ACT_360"){
                            return basis;
                        }
                    });
                }
            }
            else if(leg == "receive"){
                if($scope.SimulationTradeProposal.ReceiveLegType=="FIXED"){
                    $scope.SimulationTradeProposal.ReceiveBasisCalculationConvention.selected = $scope.SimulationTradeProposal.BasisCalculationConventions.find(function (basis) {
                        if(basis.key == "_30_360"){
                            return basis;
                        }
                    });
                }
                else if($scope.SimulationTradeProposal.ReceiveLegType=="FLOATING"){
                    $scope.SimulationTradeProposal.ReceiveBasisCalculationConvention.selected = $scope.SimulationTradeProposal.BasisCalculationConventions.find(function (basis) {
                        if(basis.key == "ACT_360"){
                            return basis;
                        }
                    });
                }
            }
        }

        $scope.SimulationTradeProposal.LegTypes = ["FIXED","FLOATING"];
        $scope.SimulationTradeProposal.PayLegType = $scope.SimulationTradeProposal.LegTypes[0];
        $scope.SimulationTradeProposal.ReceiveLegType = $scope.SimulationTradeProposal.LegTypes[1];
        $scope.SimulationTradeProposal.filterLeg("pay");
        $scope.SimulationTradeProposal.filterLeg("receive");


        $scope.SimulationTradeProposal.SupportedIndex = {};
        $scope.SimulationTradeProposal.SupportedIndexes = localStorageService.get('Supportedindexes');

        function findProductFromPrefix(arr, prefix) {
            //var values = [];
            for (var i = arr.length-1; i >=0;  i--) {
                if (arr[i].key.indexOf(prefix) !== 0) {
                    arr.splice(i, 1);
                    //values.push(arr[i].split(splitChar)[1]);
                }
            }
        }

        $scope.SimulationTradeProposal.filterProduct = function (product, prefix) {
            //console.log(product);
            //console.log(prefix.key);
            if(product == "ProductFamily"){

                $scope.SimulationTradeProposal.ProductGroups = localStorageService.get('ProductGroup');
                findProductFromPrefix($scope.SimulationTradeProposal.ProductGroups, prefix.name);
                $scope.SimulationTradeProposal.ProductGroup = {selected: {}};
                $scope.SimulationTradeProposal.ProductGroup.selected = $scope.SimulationTradeProposal.ProductGroups[0];
                $scope.SimulationTradeProposal.filterProduct('ProductGroup',$scope.SimulationTradeProposal.ProductGroup.selected);
            }

            else if(product == "ProductGroup"){
                $scope.SimulationTradeProposal.ProductGroup.selected = prefix;
                $scope.SimulationTradeProposal.ProductTypes = localStorageService.get('ProductType');
                findProductFromPrefix($scope.SimulationTradeProposal.ProductTypes,prefix.name);
                $scope.SimulationTradeProposal.ProductType = {selected: {}};
                $scope.SimulationTradeProposal.ProductType = {selected: $scope.SimulationTradeProposal.ProductTypes[0]};

                $scope.SimulationTradeProposal.ProductFamily = {selected: {}};
                $scope.SimulationTradeProposal.ProductFamily.selected = $scope.SimulationTradeProposal.ProductFamilies.find(function (productFamily) {
                    if(productFamily.name == prefix.key){
                        return productFamily;
                    }
                });
            }
            else if(product == "ProductType"){

                if(!$scope.SimulationTradeProposal.ProductGroup.selected){
                    $scope.SimulationTradeProposal.ProductGroup.selected = $scope.SimulationTradeProposal.ProductGroups.find(function (productGroup) {
                        if(productGroup.name == prefix.key){
                            return productGroup;
                        }
                    });
                    if($scope.SimulationTradeProposal.ProductGroup.selected){
                        $scope.SimulationTradeProposal.ProductFamily.selected = $scope.SimulationTradeProposal.ProductFamilies.find(function (productFamily) {
                            if(productFamily.name == $scope.SimulationTradeProposal.ProductGroup.selected.key){
                                return productFamily;
                            }
                        })
                    }

                }
            }
        }


        $scope.SimulationTradeProposal.effectiveDate = new Date();
        $scope.SimulationTradeProposal.terminationDate = new Date();

        $scope.SimulationTradeProposal.effectivePopup = { opened: false};
        $scope.SimulationTradeProposal.terminationPopup = { opened: false};

        $scope.SimulationTradeProposal.openDatePicker = function (datePicker) {
            if(datePicker == "effective"){
                $scope.SimulationTradeProposal.effectivePopup.opened = true;
            }
            else if(datePicker == "termination"){
                $scope.SimulationTradeProposal.terminationPopup.opened = true;
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
            $scope.SimulationTradeProposal.ProductType.selected = {"key": jsonTrade.productType,"name": jsonTrade.productType };
            $scope.SimulationTradeProposal.filterProduct("ProductType", $scope.SimulationTradeProposal.ProductType.selected);

            $scope.SimulationTradeProposal.TradeType.selected = {"key": jsonTrade.tradeType, "name": jsonTrade.tradeType};
            $scope.SimulationTradeProposal.TradeSubType.selected = {"key": jsonTrade.tradeSubType, "name": jsonTrade.tradeSubType};

            $scope.SimulationTradeProposal.Notional = jsonTrade.notional;
            $scope.SimulationTradeProposal.currency.selected = {"key" : jsonTrade.currency, "name": jsonTrade.currency};
            $scope.SimulationTradeProposal.effectiveDate = "2016-09-01";
            $scope.SimulationTradeProposal.terminationDate = "2016-09-20";

            $scope.SimulationTradeProposal.PayLegType = jsonTrade.irs.swaplegA.legType;
            $scope.SimulationTradeProposal.PayConvention.selected = {"name": jsonTrade.irs.swaplegA.effectiveDateConvention, "key": jsonTrade.irs.swaplegA.effectiveDateConvention};

            $scope.SimulationTradeProposal.PayStubType.selected = {"name": "FRONT_SHORT"};
            $scope.SimulationTradeProposal.PayPaymentFrequency.selected = {"name": "6M"};
            $scope.SimulationTradeProposal.PayRollFrequency.selected = {"name": "6M"};
            $scope.SimulationTradeProposal.PayRollConvention.selected = {"name": jsonTrade.irs.swaplegA.calcPeriodRollConvention};

            $scope.SimulationTradeProposal.ReceiveTenor.selected = {"name": jsonTrade.irs.swaplegB.index.tenor};

            $scope.SimulationTradeProposal.ReceiveSpread = jsonTrade.irs.swaplegB.spread;

            $scope.SimulationTradeProposal.ReceiveStubType.selected = {"name": "BACK_SHORT"};
            $scope.SimulationTradeProposal.ReceivePaymentFrequency.selected = {"name": "3M"};
            $scope.SimulationTradeProposal.ReceiveRollFrequency.selected = {"name": "6M"};
            $scope.SimulationTradeProposal.ReceiveRollConvention.selected = {"name": jsonTrade.irs.swaplegB.calcPeriodRollConvention};


        }
    }]);