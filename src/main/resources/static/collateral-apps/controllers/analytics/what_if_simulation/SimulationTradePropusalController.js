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
        //$scope.SimulationTradePropusal.currency ={ selected : $scope.SimulationTradePropusal.currencyList[0]};

        $scope.SimulationTradePropusal.TradeType = {};
        $scope.SimulationTradePropusal.TradeTypes = localStorageService.get('IRSType');

        $scope.SimulationTradePropusal.TradeSubtype = {};
        $scope.SimulationTradePropusal.TradeSubtypes = localStorageService.get('IRSSubtype');


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
    }]);