'use strict';

var DashboardApp = angular.module('DashboardApp');


DashboardApp.controller('UsersGroupController', ['$scope',
    'localStorageService', 'uiGridConstants', 'ModalService',
    function ($scope, localStorageService, uiGridConstants, ModalService) {

        $scope.usersGroup = {
            searchSelect: true,
            searchSelected: true,
            data: [
                {
                    "id": 1,
                    "firstName": "Admin",
                    "name":"admin",
                    "lastName": "",
                    "login": "admin",
                    "password": "admin",
                    "email": "admin@email.com",
                    "isActive": true,
                    "groupIDsList": [
                        1
                    ]
                }
            ]
        };

    }]);