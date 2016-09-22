"use strict";

angular.module('DashboardApp').directive('multiselectDual', [function ($filter) {
    return {
        restrict: 'AE',
        replace: true,
        scope: {
            multiselectElements: "="
        },
        templateUrl: paths.tpls + '/MultiselectDualTpl.html',
        controller: function ($scope) {

        },
        compile: function (element, attributes) {
            return {
                post: function ($scope, element, attributes) {

                    if ($scope.multiselectElements == undefined) {
                        $scope.multiselectElements = new Object();
                    }

                    if ($scope.multiselectElements.msOptions == undefined) {
                        $scope.multiselectElements.msOptions = [];
                    }

                    if ($scope.multiselectElements.msSelected == undefined) {
                        $scope.multiselectElements.msSelected = [];
                    }

                    //Array Initial Data
                    if ($scope.multiselectElements.data == undefined) {
                        $scope.multiselectElements.data = [];
                    }

                    if ($scope.multiselectElements.selectedItems == undefined) {
                        $scope.multiselectElements.selectedItems = [];
                    }

                    if ($scope.multiselectElements.searchSelect == undefined) {
                        $scope.multiselectElements.searchSelect = false;
                    }

                    if ($scope.multiselectElements.searchSelected == undefined) {
                        $scope.multiselectElements.searchSelected = false
                    }

                    //Items to Select
                    $scope.multiselectElements.msOptions = $scope.multiselectElements.data;

                    $scope.$watch('multiselectElements.data', function (newVal, oldVal) {
                        $scope.multiselectElements.msOptions = newVal;
                    });

                    $scope.$watch('multiselectElements.selectedItems', function (newVal, oldVal) {
                        $scope.multiselectElements.selectElementsByArray(newVal);
                    });

                    $scope.$watch(function () {

                        return element.attr('selected-elements');

                    }, function (newValue, oldValue) {

                        var elements;

                        if (angular.isArray($scope.$eval(newValue))) {
                            elements = $scope.$eval(newValue);
                        }
                        else if (typeof newValue !== 'undefined' && newValue.indexOf("[") < 0) {
                            elements = newValue.split(",");
                        }
                        else
                            return false;

                        if (typeof elements === 'object') {
                            angular.forEach(elements, function (key) {
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
                        return $scope.multiselectElements.data;
                    }

                    //GET SELECTED ITEMS
                    $scope.multiselectElements.getSeletedElements = function () {
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

                        if (key === '')
                            return false;

                        angular.forEach($scope.multiselectElements.msOptions, function (item, index) {

                            if (skip) {
                                return false;
                            }

                            if (item.hide == undefined || item.hide == false) {

                                if (angular.isObject(key)) {
                                    if (item.key == key.key) {
                                        $scope.multiselectElements.selectElement(item, index);
                                        skip = true;
                                    }
                                }
                                else {
                                    if (item.key == key) {
                                        $scope.multiselectElements.selectElement(item, index);
                                        skip = true;
                                    }
                                }

                            }
                        });

                    };

                    $scope.multiselectElements.selectElementsByArray = function (arrayKeys) {

                        angular.forEach(arrayKeys, function (key, index) {
                            $scope.multiselectElements.selectElementByKey(key);
                        });

                    };

                    //UNSELECT A ITEM
                    $scope.multiselectElements.unselectElement = function (item, $index) {

                        $scope.multiselectElements.msOptions[item.optionIndex].hide = false;
                        $scope.multiselectElements.msSelected.splice($index, 1);

                    }

                    //SELECT ALL ITEMS IN ARRAY
                    $scope.multiselectElements.selectAll = function () {

                        angular.forEach($scope.multiselectElements.msOptions, function (item, index) {
                            if (item.hide == undefined || item.hide == false) {
                                $scope.multiselectElements.selectElement(item, index);
                            }
                        });

                    }

                    //UNSELECT ALL ITEMS IN ARRAY
                    $scope.multiselectElements.unselectAll = function () {
                        if ($scope.multiselectElements.msSelected.length == 0)
                            return true;

                        angular.forEach($scope.multiselectElements.msSelected, function (item, index) {
                            $scope.multiselectElements.msOptions[item.optionIndex].hide = false;
                        });
                        $scope.multiselectElements.msSelected = [];
                    }
                }
            };
        }
    }

}])

angular.module('DashboardApp').filter('highlight', function ($sce) {
    return function (text, phrase) {

        if (phrase) {

            text = text.replace(new RegExp('(' + phrase + ')', 'gi'),
                '<span class="highlighted-text">$1</span>')
        }

        return $sce.trustAsHtml(text);
    }
})