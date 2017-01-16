'use strict';

var DashboardApp = angular.module('DashboardApp');


DashboardApp.controller('setScheduledTaskController', [ '$scope',
    '$timeout', 'localStorageService', 'uiGridConstants',
    function ($scope, $timeout, localStorageService,
              uiGridConstants) {

        /* Cargando datos en ScheduledTask ui-grid*/
        $scope.hola ="aquitoy";


    }]);