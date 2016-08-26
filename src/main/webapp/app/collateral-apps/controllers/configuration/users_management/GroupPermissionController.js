'use strict';

var DashboardApp = angular.module('DashboardApp');


DashboardApp.controller('GroupPermissionController', ['$scope',
    'localStorageService', 'uiGridConstants', 'ModalService',
    function ($scope, localStorageService, uiGridConstants, ModalService) {

        $scope.gridGroupPermissionOptions = {

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
                    field: 'access',
                    name: 'Access',
                    cellTemplate: '<input type="checkbox" ng-model="MODEL_COL_FIELD" />'
                },
                {
                    field: 'create',
                    name: 'Create',
                    cellTemplate: '<input type="checkbox" ng-model="MODEL_COL_FIELD" />'
                },
                {
                    field: 'update',
                    name: 'Update',
                    cellTemplate: '<input type="checkbox" ng-model="MODEL_COL_FIELD" />'
                },
                {
                    field: 'delete',
                    name: 'Delete',
                    cellTemplate: '<input type="checkbox" ng-model="MODEL_COL_FIELD" />'
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
            data: [{
                name: 'Legal Entity',
                description: ''
            },
                {
                    name: 'Bilateral Contract',
                    description: ''
                }]
        }
    }]);