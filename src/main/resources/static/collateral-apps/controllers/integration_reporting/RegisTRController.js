'use strict';

var DashboardApp = angular.module('DashboardApp');

DashboardApp.controller('RegisTRController', ['$scope','localStorageService', 'uiGridConstants',
    'toastr',
    function ($scope, localStorage,uiGridConstants,$toastr) {

        $scope.RegisTRWorkspaceTabs = {
            tabList: [
                {
                    head: {
                        icon: 'glyphicon glyphicon-blackboard',
                        text: 'Message Repository'
                    },
                    templateUrl: paths.views + "/integration_reporting/RegisTR/message_repository.html",
                    autoload: true
                },
                {
                    head: {
                        icon: 'glyphicon glyphicon-list-alt',
                        text: 'Trade Reporting Status'
                    },
                    templateUrl: paths.views + "/integration_reporting/RegisTR/trade_reporting_status.html",
                    autoload: false
                },
                {
                    head: {
                        icon: 'glyphicon glyphicon-piggy-bank',
                        text: 'Contract Reporting Status'
                    },
                    templateUrl: paths.views + "/integration_reporting/RegisTR/contrac_reporting_status.html",
                    autoload: false
                }
            ]
        };

    }]);

DashboardApp.factory('TestData',function(){
    var data = {
        TestData: [
        {
            "DateTime": "12/01/2017 : 13:45",
            "MessageType": "Trade registration",
            "Direcction": "SENT",
            "Format": "XML  - API",
            "Description": "Register Trade 125576547",
            "TradeId": "125576547",
            "Status": "ACCEPTED"

        },
        {
            "DateTime": "14/01/2017 : 14:25",
            "MessageType": "Trade registration",
            "Direcction": "SENT",
            "Format": "CSV  - API",
            "Description": "Register Trade 2312313",
            "TradeId": "2312313",
            "Status": "DENIED"
        }
        ]
    };
    return {
        getTestdata: function () {
            return data.TestData;
        },
        setTestdata: function (values) {
            data.TestData = values;
        }
    };

});