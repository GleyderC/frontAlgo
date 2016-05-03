'use strict';

/**
 * @ngdoc function
 * @name collateralApp.controller:MenuCtrl
 * @description
 * # MenuCtrl
 * Controller of the collateralApp
 */
angular.module('collateralApp')
    

    .controller('MenuCtrl', ['$scope','menuService', function ($scope,menuService) {

        $scope.treeMenu = menuService.getMenu();

        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
    }]);
