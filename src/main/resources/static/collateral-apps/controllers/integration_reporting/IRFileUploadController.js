'use strict';

var DashboardApp = angular.module('DashboardApp');

DashboardApp.controller('IRFileUploadController',
    [
        '$scope',
        'localStorageService',
        'uiGridConstants',
        'ModalService',
        'toastr',
        '$filter',
        function ($scope, localStorageService, uiGridConstants, ModalService, $toastr, $filter) {

            $scope.MappingUpload = function () {

                ModalService.open({
                    templateUrl: "modalManualUploadMappingFile.html",
                    size: 'lg',
                    rendered: function () {
                        App.initComponents();
                    },
                    //controllerAs: 'MCUploadMapping',
                    controller: function (toastr, $scope, $uibModalInstance, $sanitize, Upload, $timeout, URL_CONFIG) {

                        $scope.mappingInformation = {};
                        $scope.processingMappingFile = false;
                        $scope.editableMappingDefinition = false;

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

                                        if (angular.isUndefined(resp.data.dataResponse) && resp.data.messages.length > 0) {
                                            let msg = resp.data.messages[0];

                                            toastr.error("Unable to read file", msg.title);

                                            return false;

                                        }
                                        else if (!angular.isUndefined(resp.data.dataResponse.rawTable) && resp.data.dataResponse.processed == false) {
                                            $scope.processingMappingFile = true

                                            let msg = resp.data.messages[0];

                                            toastr.error(msg.message, msg.title);

                                            return false;

                                        }

                                        if (!angular.isUndefined(resp.data.dataResponse.processed) && resp.data.dataResponse.processed == true) {

                                            $scope.editableMappingDefinition = true;

                                            $scope.mappingInformation = resp.data.dataResponse.rawTable;
                                            $scope.mappingInformation.oldMappingDefinition = resp.data.dataResponse.foundMappingDefinition;

                                            toastr.success("File Uploaded", "Success:");

                                        }
                                        else {

                                            toastr.error("There is an error", "Error:");

                                        }


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
                                    templateUrl: "modalManualProcessMCMessage.html",
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

                                        this.checkMandatoryFields = function (item, model) {

                                            if (!angular.isArray(_that.gridProcessMCMessages.columnDefs) || _that.gridProcessMCMessages.columnDefs.length == 0)
                                                return false;

                                            let remainingMandatoryFields = false;
                                            let fields = _that.fileDefinitions.selected.fieldMaps;

                                            angular.forEach(fields, function (field) {
                                                field.checked = false;
                                            });

                                            angular.forEach(_that.gridProcessMCMessages.columnDefs, function (col, index) {

                                                if (angular.isUndefined(col.colDefinitionInfo))
                                                    return;

                                                for (let i = 0; i < fields.length; i++) {

                                                    if (col.colDefinitionInfo.columnField === fields[i].columnField) {

                                                        fields[i].checked = true;
                                                        break;

                                                    }

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

                                        this.columnDataFormat = MarginCallService.getColumnDataFormat();

                                        MarginCallService.getInputFilesDefinition().then(function (result) {
                                            _that.fileDefinitions = result.data.dataResponse.fileDefinitions;


                                            if (angular.isUndefined(_that.MCMessageInformation.oldMappingDefinition) && angular.isUndefined(_that.MCMessageInformation.oldMappingDefinition.documentType)) {

                                                return false;

                                            }

                                            _that.fileDefinitions.selected = {};

                                            for (let i = 0; i < _that.fileDefinitions.length; i++) {

                                                if (_that.fileDefinitions[i].documentType == _that.MCMessageInformation.oldMappingDefinition.documentType) {

                                                    _that.fileDefinitions.selected = _that.fileDefinitions[i];
                                                    break;

                                                }

                                            }

                                            angular.forEach(_that.gridProcessMCMessages.columnDefs, function (el) {

                                                for (let i = 0; i < _that.MCMessageInformation.oldMappingDefinition.fields.length; i++) {

                                                    let oldMapedField = _that.MCMessageInformation.oldMappingDefinition.fields[i];

                                                    if (el.indexCol == oldMapedField.inputPosition) {
                                                        //console.log(el)
                                                        //console.log(oldMapedField)
                                                        for (let j = 0; j < _that.fileDefinitions.selected.fieldMaps.length; j++) {
                                                            if (_that.fileDefinitions.selected.fieldMaps[j].columnField == oldMapedField.fieldMap) {
                                                                el.colDefinitionInfo = {};
                                                                el.colDefinitionInfo = _that.fileDefinitions.selected.fieldMaps[j];
                                                                break;
                                                            }
                                                        }

                                                    }

                                                }

                                            });

                                            _that.checkMandatoryFields();

                                        });

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

                                                    let dataType = _that.MCMessageInformation.dataType[indexCol];
                                                    let colValue = "";

                                                    if (typeof col[indexRow] != "object") {

                                                        colValue = $sanitize(col[indexRow].toString());

                                                    } else {
                                                        colValue = col[indexRow];
                                                    }

                                                    //Cast by data type

                                                    if (dataType == "EXCEL_NUMBER") {
                                                        if (angular.isNumber(colValue)) {
                                                            colValue = parseInt(colValue, "10");
                                                        }
                                                        else {
                                                            colValue = "" + colValue;
                                                        }
                                                    }
                                                    else if (dataType == "EXCEL_DATE") {

                                                        colValue = $filter('date')(colValue.iLocalMillis, 'dd-MM-yyyy');

                                                    }

                                                    //Cast by data type

                                                    row['col-' + indexCol] = colValue;

                                                });

                                                tableData.push(row)
                                            }

                                            _that.gridProcessMCMessages.data = tableData;

                                        });

                                        $scope.save = function () {

                                            let objRequest = {};

                                            objRequest = {
                                                contractId: _that.MCMessageInformation.contractId,
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