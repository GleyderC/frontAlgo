'use strict';

var DashboardApp = angular.module('DashboardApp');


DashboardApp.controller('MarginCallMessagingController', ['$scope', 'uiGridConstants', 'MarginCallService',
    function ($scope, uiGridConstants, MarginCallService) {

        $scope.gridMessagesOptions = {
            showGridFooter: true,
            paginationPageSizes: [15, 50, 100, 200, 500],
            paginationPageSize: 5,
            enableColumnResizing: true,
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
            {field: 'messageType', name:'type', width: 90,
                sort: {
                    direction: uiGridConstants.ASC,
                    priority: 0
                }
            },
            {field: 'date.dateMessage', name: 'date'},
            {field: 'sentReceived', name: 'direction'},
            {
                name : 'Action buttons',
                cellTemplate : '<div class="text-center"> <button class="btn btn-sm btn-primary uigrid-btn" ng-click="grid.appScope.viewMessage(row.entity)" ><i class="fa fa-eye"></i></button> </div>',
                enableColumnMenu : false,
                width : 120,
                enableFiltering : false,
                enableSorting : false
            }

        ];

        $scope.$watchCollection('$parent.Messages', function (newMessages, oldMessages) {
            if (newMessages === oldMessages) {
                return false;
            }
            
            newMessages.forEach(function (message) {
                message.date.dateMessage = new Date(message.date.iMillis);
            });
            $scope.gridMessagesOptions.data = newMessages;
            //console.log(newMessages);

        });
        
        $scope.getNewMessages = function (MarginCallId) {
            MarginCallService.getDetail($scope.MarginCallDetail.marginCall.id).then(function (result) {
                //$scope.marginCallTrade = result.data.dataResponse.marginCall;
                $scope.Messages = result.data.dataResponse.marginCall.messages;

                $scope.Messages.forEach(function (message) {
                    message.date.dateMessage = new Date(message.date.iMillis);
                });
                console.log($scope.Messages);
                $scope.gridMessagesOptions.data = $scope.Messages;
            });;
        }

        $scope.viewMessage = function(row) {
            $scope.messageSelected = row;
            console.log($scope.messageSelected);
        }
    }]);
