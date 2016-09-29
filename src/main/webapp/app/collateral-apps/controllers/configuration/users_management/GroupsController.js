'use strict';

var DashboardApp = angular.module('DashboardApp');


DashboardApp.controller('GroupsController', ['$scope',
    'localStorageService', 'uiGridConstants', 'ModalService', 'GroupsService',
    function ($scope, localStorageService, uiGridConstants, ModalService, GroupsService) {

        $scope.gridGroupsOptions = {

            columnDefs: [
                {
                    field: 'name',
                    name: 'Name'
                },
                {
                    field: 'description',
                    name: 'Description'
                },
                {
                    name: 'Actions',
                    cellTemplate: paths.tpls + '/ActionsButtonsTpl.html',
                    enableColumnMenu: false,
                    enableCellEdit: false,
                    width: 120,
                    enableFiltering: false
                }
            ],
            enableGridMenu: true,
            enableFiltering: true,
            exporterCsvFilename: 'groups.csv',
            exporterPdfDefaultStyle: {fontSize: 9},
            exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
            exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
            exporterPdfHeader: {text: "Groups", style: 'headerStyle'},
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
            data: [{name:"test",description:""}]
        }

        GroupsService.getAll().then(function (result) {
            $scope.Groups= result.data.dataResponse;
            $scope.gridGroupsOptions.data = $scope.Groups;
        });

        $scope.cancel = function() {

            $scope.Group =
            {
                "id": -1,
                "name": "",
                "description": "",
                "usersList": [],
                "isActive": true
            }
            $scope.isEditGroup = false;

            //console.log("clean");
        }

        $scope.cancel();

        $scope.editRow = function (grid, row) {

            $scope.Group = row.entity;
            //console.log($scope.Group);
            $scope.isEditGroup = true;
        }

        $scope.saveGroup = function () {
            //console.log($scope.isEditGroup);

            GroupsService.set($scope.Group, $scope.isEditGroup).then(function (groupId) {


                if (!$scope.isEditGroup && groupId != 0) {

                    $scope.gridGroupsOptions.data.push($scope.Group);
                    $scope.cancel();

                }

            })

        }

        $scope.deleteRow = function (grid, row) {

            var index = $scope.gridGroupsOptions.data.indexOf(row.entity);
            $scope.gridGroupsOptions.data.splice(index, 1);
            GroupsService.delete(row.entity.id);

        };
    }]);