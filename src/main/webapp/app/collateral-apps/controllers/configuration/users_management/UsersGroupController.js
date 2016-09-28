'use strict';

var DashboardApp = angular.module('DashboardApp');


DashboardApp.controller('UsersGroupController', ['$scope',
    'localStorageService', 'uiGridConstants', 'ModalService', 'GroupsService','UsersService','$q',
    function ($scope, localStorageService, uiGridConstants, ModalService, GroupsService, UsersService,$q) {

        $scope.UsersGroups = [];
        $scope.UsersGroup = {selected: {id: -1}};
        $scope.Users = {
            searchSelect: true,
            searchSelected: true,
            data: [],
            callbackAddItem: function (item) {
                GroupsService.addUser($scope.UsersGroup.selected.id,item.id);
            },
            callbackDeleteItem: function (item, index) {
                let usersId = $scope.Users.data.filter(function (obj) {
                    if(obj.key === item.key)
                        return obj.id;
                })
                GroupsService.deleteUser($scope.UsersGroup.selected.id,usersId[0].id);
                $scope.Users.selectedItems.splice(index, 1);
            }
        };

        $scope.refresh = function () {
            GroupsService.getAll().then(function (result) {
                $scope.UsersGroups = result.data.dataResponse;
            });
        }

        $scope.filterGroup = function () {

            let promesasRequestUser = $q.all([UsersService.getAll(),GroupsService.getById($scope.UsersGroup.selected.id)]);

            promesasRequestUser.then(function (result) {

                $scope.Users.data = [];
                $scope.Users.selectedItems = [];
                $scope.Users.msSelected = [];

                $scope.Users.data = result[0].data.dataResponse;

                if($scope.Users.data.length > 0){
                    $scope.Users.data.forEach(function (user) {
                        user.name = user.firstName +" "+ user.lastName;
                        user.key = user.login;
                    });
                }
                $scope.Users.selectedItems = result[1].data.dataResponse.usersList;

                if($scope.Users.selectedItems.length > 0){
                    $scope.Users.selectedItems.forEach(function (user) {
                        user.name = user.firstName + user.lastName;
                        user.key = user.login;
                    });
                }

            });

        }
        
        
        $scope.refresh();
    }]);