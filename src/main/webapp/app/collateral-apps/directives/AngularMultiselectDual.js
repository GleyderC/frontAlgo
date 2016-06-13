"use strict";

angular.module('DashboardApp').directive('multiselectDual', [function ($filter) {
    return {
        restrict: 'AE',
        replace: true,
        scope: {
            multiselectElements: "="
        },
        templateUrl: paths.tpls + '/MultiselectDualTpl.html',
        link: function ($scope, element, attributes) {

            if ($scope.multiselectElements == undefined)
                $scope.multiselectElements = new Object();

            //Array Initial Data
            if ($scope.multiselectElements.data == undefined || $scope.multiselectElements.data.length == 0) {
                $scope.multiselectElements.data = [];
            }

            if ($scope.multiselectElements.searchSelect == undefined) {
                $scope.multiselectElements.searchSelect = false;
            }

            if ($scope.multiselectElements.searchSelected == undefined) {
                $scope.multiselectElements.searchSelected = false
            }

            //Items to Select
            $scope.multiselectElements.msOptions = $scope.multiselectElements.data;
            $scope.multiselectElements.msSelected = [];

            $scope.$watch(function() {

                return element.attr('selected-elements');

            }, function(newValue, oldValue){

                var elements;

                if(typeof newValue === 'string' && newValue != undefined){

                    elements = $scope.$eval(newValue);
                }
                else
                    return false;

                if(typeof elements === 'object')
                {
                    angular.forEach(elements, function(key){
                        $scope.multiselectElements.selectElementByKey(key)
                    });
                }
                
            });

            //ADD ELEMENTS DYNAMIC
            $scope.multiselectElements.addElement = function (id, name) {
                $scope.multiselectElements.data.push({
                    key: id,
                    name: name
                });
            }

            //GET ALL ELEMENTS
            $scope.multiselectElements.getElements = function () {
                console.log($scope.multiselectElements.data)
                return $scope.multiselectElements.data;
            }

            //GET SELECTED ITEMS
            $scope.multiselectElements.getSeletedElements = function () {
                console.log($scope.multiselectElements.msSelected)
                return $scope.multiselectElements.msSelected;
            }

            //GET ITEMS REMAINING
            $scope.multiselectElements.getRemainingElements = function () {
                var remainingElements = [];

                angular.forEach($scope.multiselectElements.msOptions, function (element) {
                    if (element.hide == undefined || element.hide == false) {
                        remainingElements.push(element);
                    }
                });

                console.log(remainingElements);

                return remainingElements;
            }

            //SELECT A ITEM
            $scope.multiselectElements.selectElement = function (item, index) {

                item.hide = true;

                $scope.multiselectElements.msSelected.push(
                    {
                        key: item.key,
                        name: item.name,
                        optionIndex: index
                    }
                );
            }

            //SELECT ITEM BY KEY
            $scope.multiselectElements.selectElementByKey = function (key) {
                var skip = false;

                angular.forEach($scope.multiselectElements.msOptions, function (item, index) {
                    if(skip)
                    {
                        return false;
                    }

                    if (item.hide == undefined || item.hide == false) {
                        if(item.key == key){
                            $scope.multiselectElements.selectElement(item, index);
                            skip = true;
                        }
                    }
                });
            };

            //UNSELECT A ITEM
            $scope.multiselectElements.unselectElement = function (item, $index) {
                $scope.multiselectElements.msOptions[item.optionIndex].hide = false;
                $scope.multiselectElements.msSelected.splice($index, 1);
            }

            //SELECT ALL ITEMS IN ARRAY
            $scope.multiselectElements.selectAll = function (element) {
                console.log("Seleccionando Todos");
                angular.forEach($scope.multiselectElements.msOptions, function (item, index) {
                    if (item.hide == undefined || item.hide == false) {
                        $scope.multiselectElements.selectElement(item, index);
                    }
                });
            }

            //UNSELECT ALL ITEMS IN ARRAY
            $scope.multiselectElements.unselectAll = function (element) {
                console.log("Deseleccionando Todos");
                if ($scope.multiselectElements.msSelected.length == 0)
                    return true;

                angular.forEach($scope.multiselectElements.msSelected, function (item, index) {
                    $scope.multiselectElements.msOptions[item.optionIndex].hide = false;
                });
                $scope.multiselectElements.msSelected = [];
            }
        }
    };
}]);
