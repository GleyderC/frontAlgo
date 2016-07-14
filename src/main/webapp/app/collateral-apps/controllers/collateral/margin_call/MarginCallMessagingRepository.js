'use strict';

var DashboardApp = angular.module('DashboardApp');


DashboardApp.controller('MarginCallMessagingController', ['$rootScope','$scope','$socket', 'uiGridConstants', 'MarginCallService',
    function ($rootScope,$scope,$socket ,uiGridConstants, MarginCallService) {
		
		
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
                return	 {text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle'};
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
            {field: 'messageType', name:'type', width: 90,
                sort: {
                    direction: uiGridConstants.ASC,
                    priority: 0
                }
            },
            {field: 'date.dateMessage', name: 'date', cellFilter: "date:'yyyy-MM-dd hh:mm:ss'", },
            {field: 'sentReceived', name: 'direction'},
            {
                name : 'Action',
                cellTemplate : '<div class="text-center"> <button class="btn btn-sm btn-primary uigrid-btn" ng-click="grid.appScope.viewMessage(row.entity)" ><i class="fa fa-eye"></i></button> ' +
                                    '<a ng-click="grid.appScope.getPDF(row.entity.pdfURL)"  class="btn btn-sm btn-danger uigrid-btn" download ><i class="fa fa-file-pdf-o"></i></a>' +
                                    ' <a ng-click="grid.appScope.getExcel(row.entity.excelURL)"class="btn btn-sm green-jungle uigrid-btn" download" ><i class="fa fa-file-excel-o"></i></button>' +
                                '</div>',
                enableColumnMenu : false,
                width : 140,
                enableFiltering : false,
                enableSorting : false
            }

        ];
        $scope.gridMessagesOptions.data = [];
        $scope.$watchCollection('$parent.Messages', function (newMessages, oldMessages) {
            if (newMessages === oldMessages ||  newMessages == undefined) {
                return false;
            }
            newMessages.forEach(function (message) {
                if(message.date != undefined)
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
        $scope.getPDF  = function(url){    	
        	MarginCallService.getFile(url);
        };
        $scope.getExcel  = function(url){
        	MarginCallService.getFile(url);
        };
        $scope.viewMessage = function(row) {
            $scope.messageSelected = row;
        };
    }]);
