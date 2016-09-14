'use strict';

var DashboardApp = angular.module('DashboardApp');


DashboardApp.controller('MarginCallMessagingController', ['$rootScope', '$scope', '$socket', 'uiGridConstants', 'MarginCallService', 'ModalService',
    function ($rootScope, $scope, $socket, uiGridConstants, MarginCallService, ModalService) {


        $scope.gridMessagesOptions = {
            paginationPageSizes: [15, 50, 100, 200, 500],
            paginationPageSize: 5,
            enableFiltering: true,
            rowHeight: 35, // set height to each row
            enableGridMenu: true,
            exporterCsvFilename: 'margin-call-messaging.csv',
            exporterPdfDefaultStyle: {fontSize: 9},
            exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
            exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
            exporterPdfHeader: {text: "Margin Call - messaging", style: 'headerStyle'},
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
        $scope.gridMessagesOptions.columnDefs = [
            {
                field: 'messageType', name: 'type', width: 90,
                sort: {
                    direction: uiGridConstants.ASC,
                    priority: 0
                }
            },
            {field: 'date.dateMessage', name: 'date', cellFilter: "date:'yyyy-MM-dd hh:mm:ss'"},
            {field: 'sentReceived', name: 'direction'},
            {
                name: 'Action',
                cellTemplate: '<div class="text-center"> ' +
                '<a class="btn btn-sm btn-primary uigrid-btn" ng-click="grid.appScope.viewMessage(row.entity)" ><i class="fa fa-eye"></i></a> ' +
                '<a ng-click="grid.appScope.getPDF(row.entity.pdfInfo.md5)"  class="btn btn-sm btn-danger uigrid-btn" download ><i class="fa fa-file-pdf-o"></i></a>' +
                '<a ng-click="grid.appScope.getExcel(row.entity.excelInfo.md5)" class="btn btn-sm green-jungle uigrid-btn" download" ><i class="fa fa-file-excel-o"></i></a>' +
                '<a title="Process MarginCall Message" ng-click="grid.appScope.processMCMessage(row.entity)" class="btn btn-sm uigrid-btn" ng-class="{ \'btn-success\': row.entity.processMCMessage.success, \'btn-danger\': !row.entity.processMCMessage.success}" >' +
                '   <i class="fa fa-file-excel-o"></i>' +
                '</a>' +
                '</div>',
                enableColumnMenu: false,
                width: 180,
                enableFiltering: false,
                enableSorting: false
            }

        ];
        $scope.gridMessagesOptions.data = [];
        $scope.$watchCollection('$parent.Messages', function (newMessages, oldMessages) {
            if (newMessages === oldMessages || newMessages == undefined) {
                return false;
            }
            newMessages.forEach(function (message) {
                if (message.date != undefined)
                    message.date.dateMessage = new Date(message.date.iMillis);
            });
            $scope.gridMessagesOptions.data = newMessages;
        });

        $scope.getNewMessages = function (MarginCallId) {
            MarginCallService.getDetail($scope.MarginCallDetail.marginCall.id).then(function (result) {
                $scope.Messages = result.data.dataResponse.marginCall.messages;
                $scope.Messages.forEach(function (message) {
                    message.date.dateMessage = new Date(message.date.iMillis);
                });
                $scope.gridMessagesOptions.data = $scope.Messages;
            });
        };
        $scope.getPDF = function (url) {
            MarginCallService.getFile(url);
        };
        $scope.getExcel = function (url) {
            MarginCallService.getFile(url);
        };
        $scope.viewMessage = function (row) {
            $scope.messageSelected = row;
        };

        $scope.processMCMessage = function (MCMessage) {

            MCMessage.marginCallID = $scope.MarginCallDetail.marginCall.id;

            ModalService.open({
                templateUrl: "modalProcessMCMessage.html",
                size: 'lg',
                windowClass: 'modal-full-size',
                rendered: function () {
                    App.initComponents();
                },
                controllerAs: 'MCProcessMessage',
                controller: function (toastr, $scope, $uibModalInstance, $sanitize) {

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
                        exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
                        exporterPdfHeader: {text: "Margin Call - Messaging Repository", style: 'headerStyle'},
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

                        /*for (let i = 0; i < fields.length; i++) {

                            if (fields[i].mandatory == true)
                                fields[i].checked = false;
                        }*/

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

                    MarginCallService.ProcessMCMessage({
                        marginCallId: MCMessage.marginCallID,
                        contractId: MCMessage.contractId,
                        mcMessageId: MCMessage.id
                    }).then(function (result) {

                        let tableData = [];
                        let rowsCount = 0;
                        _that.MCMessageInformation = result.data.dataResponse;

                        _that.columnFieldsList = [];

                        angular.forEach(_that.MCMessageInformation.rawTable.head, function (head, indexCol) {

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

                            if (rowsCount < _that.MCMessageInformation.rawTable.rawData[indexCol].length) {
                                rowsCount = _that.MCMessageInformation.rawTable.rawData[indexCol].length;
                            }

                        });

                        for (let indexRow = 0; indexRow < rowsCount; indexRow++) {

                            let row = {};

                            angular.forEach(_that.MCMessageInformation.rawTable.rawData, function (col, indexCol) { //ROWS

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
                resolve: {}
            });

        }

    }]);