'use strict';

var DashboardApp = angular.module('DashboardApp');

DashboardApp.controller('SimulationTradePropusalController', ['SimulationService', '$scope',
    '$timeout', 'localStorageService', 'uiGridConstants', 'DashboardService', '$q',
    function (SimulationService, $scope, $timeout, localStorageService, uiGridConstants, DashboardService, $q) {


        $scope.ProductFamily = {};
        $scope.ProductFamilies = localStorageService.get('ProductFamily');

        $scope.ProductGroup = {};
        $scope.ProductGroups = localStorageService.get('ProductGroup');

        $scope.ProductType = {};
        $scope.ProductTypes = localStorageService.get('ProductType');

        $scope.PayBasisCalculationConvention = {};
        $scope.ReceiveBasisCalculationConvention = {};
        $scope.BasisCalculationConventions = localStorageService.get('BasisCalculationConvention');

        $scope.currencyList = localStorageService.get("CurrencyEnum");
        //$scope.currency ={ selected : $scope.currencyList[0]};

        $scope.filterLeg = function (leg) {

            if(leg == "pay"){
                if($scope.PayLegType=="FIXED"){
                    $scope.PayBasisCalculationConvention.selected = $scope.BasisCalculationConventions.find(function (basis) {
                        if(basis.key == "_30_360"){
                            return basis;
                        }
                    });
                }
                else if($scope.PayLegType=="FLOATING"){
                    $scope.PayBasisCalculationConvention.selected = $scope.BasisCalculationConventions.find(function (basis) {
                        if(basis.key == "ACT_360"){
                            return basis;
                        }
                    });
                }
            }
            else if(leg == "receive"){
                if($scope.ReceiveLegType=="FIXED"){
                    $scope.ReceiveBasisCalculationConvention.selected = $scope.BasisCalculationConventions.find(function (basis) {
                        if(basis.key == "_30_360"){
                            return basis;
                        }
                    });
                }
                else if($scope.ReceiveLegType=="FLOATING"){
                    $scope.ReceiveBasisCalculationConvention.selected = $scope.BasisCalculationConventions.find(function (basis) {
                        if(basis.key == "ACT_360"){
                            return basis;
                        }
                    });
                }
            }
        }

        $scope.LegTypes = ["FIXED","FLOATING"];
        $scope.PayLegType = $scope.LegTypes[0];
        $scope.ReceiveLegType = $scope.LegTypes[1];
        $scope.filterLeg("pay");
        $scope.filterLeg("receive");


        $scope.SupportedIndex = {};
        $scope.SupportedIndexes = localStorageService.get('Supportedindexes');

        function findProductFromPrefix(arr, prefix) {
            //var values = [];
            for (var i = arr.length-1; i >=0;  i--) {
                if (arr[i].key.indexOf(prefix) !== 0) {
                    arr.splice(i, 1);
                    //values.push(arr[i].split(splitChar)[1]);
                }
            }
        }

        $scope.filterProduct = function (product, prefix) {
            //console.log(product);
            //console.log(prefix.key);
            if(product == "ProductFamily"){

                $scope.ProductGroups = localStorageService.get('ProductGroup');
                findProductFromPrefix($scope.ProductGroups, prefix.name);
                $scope.ProductGroup = {selected: {}};
                $scope.ProductGroup.selected = $scope.ProductGroups[0];
                $scope.filterProduct('ProductGroup',$scope.ProductGroup.selected);
            }

            else if(product == "ProductGroup"){
                $scope.ProductGroup.selected = prefix;
                $scope.ProductTypes = localStorageService.get('ProductType');
                findProductFromPrefix($scope.ProductTypes,prefix.name);
                $scope.ProductType = {selected: {}};
                $scope.ProductType = {selected: $scope.ProductTypes[0]};

                $scope.ProductFamily = {selected: {}};
                $scope.ProductFamily.selected = $scope.ProductFamilies.find(function (productFamily) {
                    if(productFamily.name == prefix.key){
                        return productFamily;
                    }
                });
            }
            else if(product == "ProductType"){

                if(!$scope.ProductGroup.selected){
                    $scope.ProductGroup.selected = $scope.ProductGroups.find(function (productGroup) {
                        if(productGroup.name == prefix.key){
                            return productGroup;
                        }
                    });
                }
            }
        }


        $scope.effectiveDate = new Date();
        $scope.terminationDate = new Date();

        $scope.effectivePopup = { opened: false};
        $scope.terminationPopup = { opened: false};

        $scope.openDatePicker = function (datePicker) {
            if(datePicker == "effective"){
                $scope.effectivePopup.opened = true;
            }
            else if(datePicker == "termination"){
                $scope.terminationPopup.opened = true;
            }
        };
    }]);