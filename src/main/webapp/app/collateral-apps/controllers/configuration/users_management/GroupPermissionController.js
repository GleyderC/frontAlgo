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
                    field: 'key',
                    name: 'Code'
                },
                {
                    field: 'description',
                    name: 'Description'
                },
                {
                    field: 'actionPermission.SELECT',
                    name: 'SELECT',
                    width: 110,
                    enableSorting: false,
                    cellTemplate: '<input type="checkbox" ng-model="MODEL_COL_FIELD" ng-click="grid.appScope.setTypePermission(row.entity)" />'
                },
                {
                    field: 'actionPermission.INSERT',
                    name: 'INSERT',
                    width: 110,
                    enableSorting: false,
                    cellTemplate: '<input type="checkbox" ng-model="MODEL_COL_FIELD" ng-click="grid.appScope.setTypePermission(row.entity)" />'
                },
                {
                    field: 'actionPermission.UPDATE',
                    name: 'UPDATE',
                    width: 110,
                    enableSorting: false,
                    cellTemplate: '<input type="checkbox" ng-model="MODEL_COL_FIELD" ng-click="grid.appScope.setTypePermission(row.entity)" />'
                },
                {
                    field: 'actionPermission.DELETE',
                    name: 'DELETE',
                    width: 110,
                    enableSorting: false,
                    cellTemplate: '<input type="checkbox" ng-model="MODEL_COL_FIELD" ng-click="grid.appScope.setTypePermission(row.entity)" />'
                }
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

        $scope.setTypePermission = function (row) {

            GroupsService.setPermission($scope.UsersGroup.selected.id, row);

            $scope.UsersGroups.forEach(function (group) {
                if(group.id == $scope.UsersGroup.selected.id){
                    group.permissions[row.key].actionPermission = row.actionPermission;
                    //console.log(group.permissions[row.key].actionPermission);

                }
            });

        }
        $scope.refresh = function () {
            GroupsService.getAll().then(function (result) {
                $scope.UsersGroups = result.data.dataResponse;
            });
        }

        $scope.filterGroup = function () {

            if( $scope.UsersGroup.selected.id != -1 ){
                
                $scope.UsersGroups.forEach(function (group) {
                    if(group.id ==  $scope.UsersGroup.selected.id ){
                        $scope.gridGroupPermissionOptions.data = [];
                        $scope.gridGroupPermissionOptions.data = localStorageService.get('ServiceEnum');
                        if($scope.gridGroupPermissionOptions.data.length > 0){
                            $scope.gridGroupPermissionOptions.data.forEach(function (permission) {
                                permission.actionPermission = group.permissions[permission.key].actionPermission;
                            });
                        }
                    }
                });
            }
        }

        $scope.refresh();

    }]);

