'use strict';

/**
 * @ngdoc function
 * @name collateralApp.controller:MenuCtrl
 * @description
 * # MenuCtrl
 * Controller of the collateralApp
 */

angular.module('CollateralApp')

    .controller('LoginController',['$scope','$state','localStorageService', function ($scope, $state,localStorage) {
        $scope.submit = function(){
        	localStorage.set("userName",$scope.username);
        };
    }]);
