'use strict';

var DashboardApp = angular.module('DashboardApp');

DashboardApp.controller('DealEntryController', ['TradeDealEntryService', '$scope',
    '$timeout', 'localStorageService', 'uiGridConstants', 'DashboardService', '$q',
    function (TradeDealEntryService, $scope, $timeout, localStorageService, uiGridConstants, DashboardService, $q) {

        $scope.DealEntryTabs = {
            tabList: [
                {
                    head: {
                        icon: 'icon-bag',
                        text: 'Trade Proposal Info'
                    },
                    templateUrl: paths.views + "/trades/deal_entry/trade_proposal_info.html",
                    autoload: true
                }
            ]
        };
        $scope.notitfy = function(){
            //$timeout(function() {
                //PNotify.prototype.options.styling = "bootstrap2";
                PNotify.desktop.permission();
                (new PNotify({
                    title: 'Trade Notification',
                    text: 'New Trade!',
                    desktop: {
                        desktop: true,
                        icon: 'favicon.ico'
                    }
                }))/*.get().click(function(e){
                    if ($('.ui-pnotify-closer, .ui-pnotify-sticker, .ui-pnotify-closer *, .ui-pnotify-sticker *').is(e.target))
                        return;
                    alert('Hey! You clicked the desktop notification!');
                });*/
            //},1000);
        };
    }]);