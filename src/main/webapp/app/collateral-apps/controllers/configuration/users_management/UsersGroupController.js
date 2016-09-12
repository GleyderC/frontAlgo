'use strict';

var DashboardApp = angular.module('DashboardApp');


DashboardApp.controller('UsersGroupController', ['$scope',
    'localStorageService', 'uiGridConstants', 'ModalService', 'GroupsService',
    function ($scope, localStorageService, uiGridConstants, ModalService, GroupsService) {

        $scope.UsersGroup = {};
        $scope.UsersGroup.Groups = [];
        $scope.UsersGroup.Group = {selected: {id: -1}};
        GroupsService.getAll().then(function (result) {
            let groups = result.data.dataResponse;
            angular.forEach(groups, function (group) {
                if(group!=null){
                    $scope.UsersGroup.Groups.push(group);
                }
            });
            console.log($scope.UsersGroup.Groups);
        });

    }]);