'use strict';

/**
 * @ngdoc function
 * @name collateralApp.controller:MenuCtrl
 * @description
 * # MenuCtrl
 * Controller of the collateralApp
 */

angular.module('collateralApp')

    .controller('LoginController',['$scope', '$state', function ($scope, $state) {
        console.log("valid")
        $scope.onFormSubmit = function () {
            if($scope.loginForm.$valid) {
                $state.go('app.dashboard');
            }
        }
    }])
