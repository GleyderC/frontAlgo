'use strict';

var DashboardApp = angular.module('DashboardApp');


DashboardApp.controller('IntegrationController', [ '$scope',
    'localStorageService', 'IntegrationService', 'uiGridConstants',
    function ( $scope, localStorageService, IntegrationService, uiGridConstants ) {

        /* Cargando datos en legal entity ui-grid*/
        $scope.gridIntegrationOptions = {
            showGridFooter: true,
            paginationPageSizes: [12, 50, 100, 200, 500],
            paginationPageSize: 12,
            enableColumnResizing: true,
            enableFiltering: true,
            rowHeight: 35, // set height to each row
            enableGridMenu: true,
            exporterCsvFilename: 'Integration.csv',
            exporterPdfDefaultStyle: {fontSize: 9},
            exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
            exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
            exporterPdfHeader: {text: "Integration", style: 'headerStyle'},
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
            exporterPdfMaxGridWidth: 450,
            exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
            }
        };

        $scope.gridIntegrationOptions.columnDefs = [
            {field: 'content',
                sort: {
                    direction: uiGridConstants.ASC,
                    priority: 0
                }
            },
            {field: 'integrationMode' },
            //{field: 'loading'},
            {field: 'time', cellFilter: "date:'yyyy-MM-dd hh:mm:ss'" }
        ];

       this.refresh = function () {
           IntegrationService.getAll().then(function (result) {
               var date = new Date();

               var month = date.getMonth()+1;
               var day = date.getDate();

               var today = date.getFullYear() + '-' +
                   (month<10 ? '0' : '') + month + '-' +
                   (day<10 ? '0' : '') + day;

               if(result.data.dataResponse[today] != undefined) {
                   $scope.Integrations = result.data.dataResponse[today];

                   $scope.Integrations.forEach(function (Integration) {

                       if(Integration != null){

                           Integration.time = new Date(Integration.uploadTime.iLocalMillis);
                       }
                   });
                   $scope.gridIntegrationOptions.data = $scope.Integrations;
                   
               }

           });
       }
        this.refresh();

    }]);
