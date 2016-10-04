'use strict';

var DashboardApp = angular.module('DashboardApp');


DashboardApp.controller('GroupPermissionController', ['$scope',
    'localStorageService', 'uiGridConstants', 'ModalService','GroupsService',
    function ($scope, localStorageService, uiGridConstants, ModalService, GroupsService) {

        $scope.UsersGroups = [];
        $scope.UsersGroup = {selected: {id: -1}};
        $scope.actionPermission =[];

        $scope.gridGroupPermissionOptions = {

            columnDefs: [
                {
                    field: 'code',
                    name: 'Code'
                },
                {
                    field: 'description',
                    name: 'Description'
                },
                {
                    field: 'typePermissionMap.ACCESS',
                    name: 'Access',
                    width: 110,
                    enableSorting: false,
                    cellTemplate: '<input type="checkbox" ng-model="MODEL_COL_FIELD" ng-click="grid.appScope.setTypePermission(row.entity,MODEL_COL_FIELD)"/>'
                },
                {
                    field: 'typePermissionMap.CREATE',
                    name: 'Create',
                    width: 110,
                    enableSorting: false,
                    cellTemplate: '<input type="checkbox" ng-model="MODEL_COL_FIELD" ng-click="grid.appScope.setTypePermission(row.entity,MODEL_COL_FIELD)" />'
                },
                {
                    field: 'typePermissionMap.UPDATE',
                    name: 'Update',
                    width: 110,
                    enableSorting: false,
                    cellTemplate: '<input type="checkbox" ng-model="MODEL_COL_FIELD" ng-click="grid.appScope.setTypePermission(row.entity,MODEL_COL_FIELD)"/>'
                },
                {
                    field: 'typePermissionMap.DELETE',
                    name: 'Delete',
                    width: 110,
                    enableSorting: false,
                    cellTemplate: '<input type="checkbox" ng-model="MODEL_COL_FIELD" ng-click="grid.appScope.setTypePermission(row.entity,MODEL_COL_FIELD)"/>'
                },
            ],
            enableGridMenu: true,
            exporterCsvFilename: 'permissions.csv',
            exporterPdfDefaultStyle: {fontSize: 9},
            exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
            exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
            exporterPdfHeader: {text: "Permissions", style: 'headerStyle'},
            exporterPdfFooter: function (currentPage, pageCount) {
                return {text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle'};
            },
            exporterPdfCustomFormatter: function (docDefinition) {
                docDefinition.styles.headerStyle = {fontSize: 22, bold: true};
                docDefinition.styles.footerStyle = {fontSize: 10, bold: true};
                return docDefinition;
            },
            exporterPdfOrientation: 'portrait',
            exporterPdfPageSize: 'LETTER',
            exporterPdfMaxGridWidth: 500,
            exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
            },
            data: []
        }

        $scope.setTypePermission = function (row, booleanType) {

           GroupsService.setPermission($scope.UsersGroup.selected.id, row);

        }
        $scope.refresh = function () {
            GroupsService.getAll().then(function (result) {
                $scope.UsersGroups = result.data.dataResponse;
            });
        }

        $scope.filterGroup = function () {

            if( $scope.UsersGroup.selected.id != -1 ){
                
                $scope.UsersGroups.filter(function (group) {
                    if(group.id ==  $scope.UsersGroup.selected.id ){
                        $scope.gridGroupPermissionOptions.data = [];
                        $scope.gridGroupPermissionOptions.data = group.permission;
                    }
                });
            }
        }

        $scope.refresh();

    }]);

