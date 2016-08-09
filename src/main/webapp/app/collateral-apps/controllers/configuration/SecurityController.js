'use strict';

var DashboardApp = angular.module('DashboardApp');


DashboardApp.controller('SecurityController', ['$scope',
    'localStorageService', 'SecurityService', 'uiGridConstants', 'ModalService',
    function ($scope, localStorageService, SecurityService, uiGridConstants, ModalService) {

        /* Cargando datos en legal entity ui-grid*/
        $scope.gridSecurityOptions = {
            showGridFooter: true,
            paginationPageSizes: [12, 50, 100, 200, 500],
            paginationPageSize: 12,
            enableColumnResizing: true,
            enableFiltering: true,
            rowHeight: 35, // set height to each row
            enableGridMenu: true,
            exporterCsvFilename: 'security.csv',
            exporterPdfDefaultStyle: {fontSize: 9},
            exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
            exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
            exporterPdfHeader: {text: "Security", style: 'headerStyle'},
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

        $scope.gridSecurityOptions.columnDefs = [
            {
                field: 'isin',
                sort: {
                    direction: uiGridConstants.ASC,
                    priority: 0
                }
            },
            {field: 'issuerLEI'},
            {field: 'collateralType.name'},
            {field: 'collateralType.fundingCost', cellFilter: 'number:0', cellClass: 'collateral-money'},
            {field: 'collateralCategory.name'},
            {field: 'issuer'},
            {field: 'country'},
            {field: 'price', cellFilter: 'number:0', cellClass: 'collateral-money'},
            {field: 'currency'},
            {field: 'description'},
            {field: 'interestRate', cellFilter: 'number:2'},
            {field: 'lotSize', cellFilter: 'number:0', cellClass: 'collateral-money'},
            {field: 'priceBase', cellFilter: 'number:0', cellClass: 'collateral-money'},
            {field: 'issuerType'}
        ];

        SecurityService.getAll().then(function (result) {
            $scope.Securities = result.data.dataResponse;


            $scope.gridSecurityOptions.data = $scope.Securities;

        });

        $scope.MappingUpload = function () {

            ModalService.open({
                templateUrl: "modalUploadMappingFile.html",
                size: 'lg',
                rendered: function () {
                    App.initComponents();
                },
                //controllerAs: 'MCUploadMapping',
                controller: function (toastr, $scope, $uibModalInstance, $sanitize, Upload, $timeout, URL_CONFIG) {

                    $scope.$watch('files', function (newVal) {
                        $scope.upload($scope.files);
                    });

                    $scope.log = '';

                    $scope.upload = function (file) {

                        if (file) {

                            if (!file.$error) {
                                Upload.upload({
                                    url: URL_CONFIG.API_URL + '/servlet/Mapping/UploadFile',
                                    headers : {
                                        'Content-Type': file.type,
                                        'file-name': file.name
                                    },
                                    data: {
                                        file: file
                                    }
                                }).then(function (resp) {
                                    $timeout(function () {
                                        $scope.log = 'file: ' +
                                            resp.config.data.file.name +
                                            ', Response: ' + JSON.stringify(resp.data) +
                                            '\n' + $scope.log;
                                    });

                                    toastr.success("File Uploaded", "Success:");

                                }, null, function (evt) {
                                    var progressPercentage = parseInt(100.0 *
                                        evt.loaded / evt.total);
                                    $scope.log = 'progress: ' + progressPercentage +
                                        '% ' + evt.config.data.file.name + '\n' +
                                        $scope.log;
                                });

                            }
                        }
                    };

                    $scope.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };

                },
                resolve: {}
            });
        }

    }]);