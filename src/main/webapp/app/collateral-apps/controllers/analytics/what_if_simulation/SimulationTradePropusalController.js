'use strict';

var DashboardApp = angular.module('DashboardApp');

DashboardApp.controller('SimulationTradePropusalController', ['SimulationService', '$scope',
    '$timeout', 'localStorageService', 'uiGridConstants', 'DashboardService', '$q',
    function (SimulationService, $scope, $timeout, localStorageService, uiGridConstants, DashboardService, $q) {

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

        $scope.ProductFamily = {};
        $scope.ProductFamilies = localStorageService.get('ProductFamily');

        $scope.ProductGroup = {};
        $scope.ProductGroups = localStorageService.get('ProductGroup');

        $scope.ProductType = {};
        $scope.ProductTypes = localStorageService.get('ProductType');


    }]);