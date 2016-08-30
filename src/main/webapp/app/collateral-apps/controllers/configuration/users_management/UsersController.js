'use strict';

var DashboardApp = angular.module('DashboardApp');


DashboardApp.controller('UsersController', ['$scope',
    'localStorageService', 'uiGridConstants', 'ModalService','UsersService',
    function ($scope, localStorageService, uiGridConstants, ModalService, UsersService) {

        $scope.gridUsersOptions = {

            columnDefs: [
                {
                    field: 'login',
                },
                {
                    field: 'firstname',
                },
                {
                    field: 'lastname',
                },
                {
                    field: 'email',
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
            exporterCsvFilename: 'users.csv',
            exporterPdfDefaultStyle: {fontSize: 9},
            exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
            exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
            exporterPdfHeader: {text: "users", style: 'headerStyle'},
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
            }
            //data: [{name:"Daniel",lastname:"Nebrera",email:"danielnebrera@commonsms.com"}]
        }

        UsersService.getAll().then(function (result) {
            $scope.Users= result.data.dataResponse;
            $scope.gridUsersOptions.data = $scope.Users;
        });
    }]);