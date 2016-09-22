'use strict';

var DashboardApp = angular.module('DashboardApp');


DashboardApp.controller('UsersGroupController', ['$scope',
    'localStorageService', 'uiGridConstants', 'ModalService', 'GroupsService',
    function ($scope, localStorageService, uiGridConstants, ModalService, GroupsService) {

        $scope.UsersGroups = [];
        $scope.UsersGroup = {selected: {id: -1}};

        $scope.refresh = function () {
            GroupsService.getAll().then(function (result) {
                $scope.UsersGroups = result.data.dataResponse;
                //console.log(result);
                /*let groups = result.data.dataResponse;
                angular.forEach(groups, function (group) {
                    if(group!=null){
                        $scope.UsersGroups.push(group);
                    }
                });*/
            });
        }

        $scope.refresh();
    }]);