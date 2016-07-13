'use strict';

var DashboardApp = angular.module('DashboardApp');


DashboardApp.controller('IssuerRiskController', [ '$scope', 'elementService',
    'localStorageService', 'LegalEntityService', 'IssuerRiskService', 'ArrayService',
    function ( $scope, elementService, localStorageService, LegalEntityService, IssuerRiskService, ArrayService ) {

        $scope.currencies = localStorageService.get("CurrencyEnum");
        $scope.currency = {};
        $scope.legalEntityPO = {};
        $scope.legalEntityCounterParty = {};

        $scope.drawPieChart = function (title, Array, component) {
            console.log(Array);
            //var Array = ArrayService.ArrayDuplicateCounter(Array);

            //PieChart Data
            if(Array.length > 0){
                $('#'+component).highcharts({
                    chart: {
                        type: 'pie',
                        options3d: {
                            enabled: true,
                            alpha: 45,
                            beta: 0
                        },
                        plotShadow: true,
                        margin: 0,
                        height: 550
                    },
                    title: {
                        text: '<span id="titleMargin"> '+ title +' </span>'
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            depth: 35,
                            showInLegend: true
                        },
                    },
                    legend: {
                        enabled: true,
                        layout: 'horizontal',
                        verticalAlign: 'bottom',
                        y: 15,
                        useHTML: true,
                        labelFormatter: function () {
                            //console.log(this);
                            return '<div style="text-align: left; width:130px;float:left;">' + this.name + '</div><div style="width:40px; float:left;text-align:right;">' + this.y + '</div>';
                        }
                    },
                    series: [{
                        type: 'pie',
                        name: 'Status',
                        data: Array,
                        point:{
                            events:{
                                click: function (event) {
                                    $scope.filterValue = this.name;
                                    $scope.filterMargin();
                                    //console.log(this);
                                }
                            }
                        }
                    }],
                    exporting: { enabled: false }
                });
            }
        }

        LegalEntityService.getAll().then(function (result) {
            $scope.legalEntitiesPO = [];
            $scope.legalEntitiesCounterParty = [];

            let legalEntities = result.data.dataResponse;
            legalEntities.forEach(function(legal){

                if(legal.rolList == "PO"){
                    $scope.legalEntitiesPO.push(legal);
                }
                else if(legal.rolList == "COUNTERPARTY"){
                    $scope.legalEntitiesCounterParty.push(legal);
                }

             });
            //inicializando combos
            $scope.currency.selected = $scope.currencies[1];
            $scope.legalEntityPO.selected = $scope.legalEntitiesPO[0];
            $scope.legalEntityCounterParty.selected = $scope.legalEntitiesCounterParty[0];


            IssuerRiskService.getAll($scope.legalEntityPO.selected.id,"CCP",
                $scope.legalEntityCounterParty.selected.id,$scope.currency.selected.name).then(function (result) {

                let postedArray = [];
                let receiveArray = [];
                let availableArray = [];

                result.data.dataResponse.forEach(function (IssuerRisk) {
                    postedArray.push({name:IssuerRisk.name, y: IssuerRisk.postedAmount});
                    receiveArray.push({name:IssuerRisk.name, y: IssuerRisk.receivedAmount});
                    availableArray.push({name:IssuerRisk.name, y: IssuerRisk.availableAmount});

                });
                console.log(postedArray);


                $scope.drawPieChart('Posted',postedArray,'gchart_pie_posted');
                $scope.drawPieChart('Received',receiveArray,'gchart_pie_received');
                $scope.drawPieChart('Available',availableArray,'gchart_pie_available');
            });


        });

        $scope.filterIssuerRisk = function () {

            IssuerRiskService.getAll($scope.legalEntityPO.selected.id,"CCP",
                $scope.legalEntityCounterParty.selected.id,$scope.currency.selected.name).then(function (result) {
                //console.log(result.data.dataResponse);
            })
        }


    }]);