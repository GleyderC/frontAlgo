'use strict';

var DashboardApp = angular.module('DashboardApp');


DashboardApp.controller('CCPsEligibleSecuritiesController', ['$scope', '$request', '$interval', '$log', function ($scope, $request, $interval, $log) {

    this.gridOptions = {

        columnDefs: [
            {
                field: 'collateralType',
                name: 'Collateral Type'
            },
            {
                field: 'haircut',
                name: 'Haircut',
                cellTemplate: '<input type="text" ng-model="MODEL_COL_FIELD" ng-disabled="!row.entity.disabled"/>',
                enableColumnMenu: false
            },
            {
                field: 'haircutType',
                name: 'Haircut Type',
                cellTemplate: '' +
                '<select id="le-bilateral-ag-eleg-security-haircutType" ' +
                'ng-disabled="!row.entity.disabled" ' +
                'name="" class="form-control" ' +
                'ng-model="MODEL_COL_FIELD"> ' +
                '<option value="regular">REGULAR</option>' +
                '<option value="inverse">INVERSE</option>' +
                '</select>',
                enableColumnMenu: false
            }
        ],
        enableGridMenu: true,
        enableSelectAll: true,
        exporterCsvFilename: 'myFile.csv',
        exporterPdfDefaultStyle: {fontSize: 9},
        exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
        exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
        exporterPdfHeader: {text: "My Header", style: 'headerStyle'},
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
            // call resize every 500 ms for 5 s after modal finishes opening
            $interval(function () {
                $scope.gridApi.core.handleWindowResize();
            }, 1000, 10);

            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                row.entity.disabled = row.isSelected
                //$log.log(row);
            });

        }
    };

    this.gridOptions.data = [
        {
            selected: false,
            collateralType: "USA Bonds",
            haircut: '',
            haircutType: 'regular',
        },
        {
            selected: false,
            collateralType: "France Bonds",
            haircut: '',
            haircutType: 'regular',
        },
        {
            selected: false,
            collateralType: "Equity Options",
            haircut: '',
            haircutType: 'regular',
        },
        {
            selected: false,
            collateralType: "MBS",
            haircut: '',
            haircutType: 'regular',
        },
        {
            selected: false,
            collateralType: "European Equity",
            haircut: '',
            haircutType: 'regular',
        }
    ];

}]);
