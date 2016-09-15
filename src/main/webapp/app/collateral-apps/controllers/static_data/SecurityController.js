'use strict';

var DashboardApp = angular.module('DashboardApp');


DashboardApp.controller('SecurityController', ['$scope',
    'localStorageService', 'SecurityService', 'uiGridConstants', 'ModalService','toastr',
    function ($scope, localStorageService, SecurityService, uiGridConstants, ModalService,$toastr) {

		$scope.currencyList = localStorageService.get("CurrencyEnum");
		$scope.countryList = localStorageService.get("CountryEnum");
		
		$scope.security  = {};
		$scope.saveSecurity  = function(security){
			SecurityService.save(security).success(function(resp){
				$toastr.info("Security  created! ","The new security has been created successfully");
				$scope.security  = {};
				
			});
		};
        $scope.addSecurity = function () {
            $scope.$workspaceTabsMgm.addTab({
                head: {
                    icon: 'fa fa-bank',
                    text: 'New Security'
                },
                templateUrl: paths.views + "/static_data/Security/security_form.html",
                closable: true,
                autoload: true
            }, [3, 3]);

        };
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

        this.refresh = function () {
            SecurityService.getAll().then(function (result) {
                $scope.Securities = result.data.dataResponse;
                $scope.gridSecurityOptions.data = $scope.Securities;
            });
        }

        this.refresh();

        $scope.MappingUpload = function () {

            ModalService.open({
                templateUrl: "modalUploadMappingFile.html",
                size: 'lg',
                rendered: function () {
                    App.initComponents();
                },
                //controllerAs: 'MCUploadMapping',
                controller: function (toastr, $scope, $uibModalInstance, $sanitize, Upload, $timeout, URL_CONFIG) {

                    $scope.mappingInformation = {};
                    $scope.processingMappingFile = false;

                    $scope.$watch('files', function (newVal) {
                        $scope.upload($scope.files);
                    });

                    $scope.log = '';

                    $scope.upload = function (file) {

                        if (file) {

                            if (!file.$error) {
                                Upload.upload({
                                    url: URL_CONFIG.API_URL + '/servlet/Mapping/UploadFile',
                                    data: {
                                        mappingFile: file
                                    }
                                }).then(function (resp) {

                                    $timeout(function () {
                                        $scope.log = 'file: ' +
                                            resp.config.data.mappingFile.name +
                                            ', Response: ' + JSON.stringify(resp.data) +
                                            '\n' + $scope.log;
                                    });

                                    if(resp.data.dataResponse.processed == false){

                                        $scope.processingMappingFile = true;

                                        $scope.mappingInformation = resp.data.dataResponse.rawTable;

                                    }

                                    toastr.success("File Uploaded", "Success:");

                                }, null, function (evt) {
                                    var progressPercentage = parseInt(100.0 *
                                        evt.loaded / evt.total);
                                    $scope.log = 'progress: ' + progressPercentage +
                                        '% ' + evt.config.data.mappingFile.name + '\n' +
                                        $scope.log;
                                });

                            }
                        }
                    };

                    $scope.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };

                    $scope.processMappingFile = function () {
                        $uibModalInstance.dismiss('cancel');

                        $timeout(function () {

                            ModalService.open({
                                templateUrl: "modalProcessMCMessage.html",
                                size: 'lg',
                                windowClass: 'modal-full-size',
                                rendered: function () {
                                    App.initComponents();
                                },
                                controllerAs: 'MCProcessMessage',
                                controller: function (toastr, $scope, $uibModalInstance, $sanitize, MarginCallService, mappingInformation) {

                                    let _that = this;
                                    this.fileDefinitions = [];
                                    this.columnFieldsList = [];
                                    this.columnDataFormat = [];

                                    this.gridProcessMCMessages = {
                                        paginationPageSizes: [100, 200, 500],
                                        paginationPageSize: 100,
                                        enableFiltering: false,
                                        rowHeight: 35, // set height to each row
                                        enableGridMenu: false,
                                        exporterCsvFilename: 'margin-call-messaging-repository.csv',
                                        exporterPdfDefaultStyle: {fontSize: 9},
                                        exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
                                        exporterPdfTableHeaderStyle: {
                                            fontSize: 10,
                                            bold: true,
                                            italics: true,
                                            color: 'red'
                                        },
                                        exporterPdfHeader: {
                                            text: "Margin Call - Messaging Repository",
                                            style: 'headerStyle'
                                        },
                                        exporterPdfFooter: function (currentPage, pageCount) {
                                            return {
                                                text: currentPage.toString() + ' of ' + pageCount.toString(),
                                                style: 'footerStyle'
                                            };
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
                                        },
                                        columnDefs: [],
                                        data: []
                                    };

                                    this.columnDataFormat = MarginCallService.getColumnDataFormat();

                                    MarginCallService.getInputFilesDefinition().then(function (result) {
                                        _that.fileDefinitions = result.data.dataResponse.fileDefinitions;
                                    });

                                    this.checkMandatoryFields = function (item, model) {

                                        if (!angular.isArray(_that.gridProcessMCMessages.columnDefs) || _that.gridProcessMCMessages.columnDefs.length == 0)
                                            return false;

                                        let remainingMandatoryFields = false;
                                        let fields = _that.fileDefinitions.selected.fieldMaps;

                                        angular.forEach(fields, function (field) {
                                            field.checked = false;
                                        });

                                        angular.forEach(_that.gridProcessMCMessages.columnDefs, function (col) {
                                            col.colDefinitionInfo = {};
                                        });

                                        angular.forEach(_that.gridProcessMCMessages.columnDefs, function (col, index) {

                                            //if (angular.isUndefined(col.colDefinitionInfo) || col.colDefinitionInfo.mandatory != true)
                                            //   return;

                                            if (angular.isUndefined(col.colDefinitionInfo))
                                                return;

                                            for (let i = 0; i < fields.length; i++) {

                                                //if (fields[i].mandatory == true) {

                                                if (col.colDefinitionInfo.columnField === fields[i].columnField) {

                                                    fields[i].checked = true;
                                                    break;

                                                }

                                                //}

                                            }

                                        });

                                        for (let i = 0; i < fields.length; i++) {

                                            if (fields[i].mandatory == true && fields[i].checked == false) {
                                                remainingMandatoryFields = true;
                                                break;
                                            }
                                        }

                                        if (remainingMandatoryFields == false) {
                                            _that.fileDefinitions.selected.allFieldsMapped = true;
                                        }
                                        else {
                                            _that.fileDefinitions.selected.allFieldsMapped = false;
                                        }

                                    }


                                    let tableData = [];
                                    let rowsCount = 0;
                                    _that.MCMessageInformation = mappingInformation;

                                    _that.columnFieldsList = [];

                                    angular.forEach(_that.MCMessageInformation.head, function (head, indexCol) {

                                        _that.columnFieldsList.push({
                                            columnField: {},
                                            colFormat: ''
                                        });

                                        _that.gridProcessMCMessages.columnDefs.push({

                                            field: 'col-' + indexCol,
                                            name: head,
                                            minWidth: 180,
                                            width: 257,
                                            headerCellTemplate: 'headerTemplate.html',
                                            indexCol: indexCol

                                        });

                                        if (rowsCount < _that.MCMessageInformation.rawData[indexCol].length) {
                                            rowsCount = _that.MCMessageInformation.rawData[indexCol].length;
                                        }


                                        for (let indexRow = 0; indexRow < rowsCount; indexRow++) {

                                            let row = {};

                                            angular.forEach(_that.MCMessageInformation.rawData, function (col, indexCol) { //ROWS

                                                let colValue = $sanitize(col[indexRow].toString());
                                                if (!colValue) {
                                                    colValue = "";
                                                }

                                                row['col-' + indexCol] = colValue;

                                            });

                                            tableData.push(row)
                                        }

                                        _that.gridProcessMCMessages.data = tableData;

                                    });


                                    $scope.save = function () {

                                        let objRequest = {};

                                        objRequest = {
                                            marginCallId: MCMessage.marginCallID,
                                            contractId: MCMessage.contractId,
                                            mcMessageId: MCMessage.id,
                                            mappingDefinition: {
                                                fileType: _that.fileDefinitions.selected.fileType,
                                                fileNameIncludes: "", //TODO
                                                fields: []
                                            }
                                        };

                                        angular.forEach(_that.gridProcessMCMessages.columnDefs, function (col) {

                                            if (angular.isUndefined(col.colDefinitionInfo))
                                                return;

                                            objRequest.fields.push({
                                                inputPosition: col.indexCol,
                                                fieldMap: col.colDefinitionInfo.columnField,
                                                format: col.colDefinitionInfo.dataFormat
                                            });

                                        });

                                        MarginCallService.SaveMappingDefinition(objRequest);

                                        $uibModalInstance.close();
                                        toastr.success("Mapping Definition was saved", "Success:");

                                    };

                                    $scope.cancel = function () {
                                        $uibModalInstance.dismiss('cancel');
                                    };

                                    this.show_boject = function () {
                                        console.log(_that.fileDefinitions.selected)
                                    }

                                    //START WATCHES

                                    $scope.$watch(function (scope) {

                                        return _that.fileDefinitions.selected;

                                    }, function (newVal, oldVal) {

                                        /*console.log(newVal)
                                         console.log(oldVal)*/

                                    });
                                    //END WATCHES

                                },
                                resolve: {
                                    mappingInformation: $scope.mappingInformation
                                }
                            });


                        }, 1000);

                    }

                },
                resolve: {}
            });
        }

    }]);