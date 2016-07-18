'use strict';

var DashboardApp = angular.module('DashboardApp');


DashboardApp.controller('IssuerRiskController', [ '$scope',
    'localStorageService', 'LegalEntityService', 'IssuerRiskService', 'ArrayService',
    function ( $scope, localStorageService, LegalEntityService, IssuerRiskService, ArrayService ) {

        $scope.currencies = localStorageService.get("CurrencyEnum");
        $scope.currencies.splice(2,1);
        $scope.currency = {};
        $scope.legalEntityPO = {};
        $scope.legalEntityCounterParty = {};

        $scope.drawPieChart = function (title, Array, component) {
            //console.log(Array);
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
                        marginTop:0
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
                            showInLegend: true,
                            /*dataLabels: {
                                enabled: true,
                                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                style: {
                                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                }
                            }*/
                        },
                    },
                    legend: {
                        enabled: false,
                        layout: 'horizontal',
                        verticalAlign: 'bottom',
                        y: 15,
                        useHTML: true,
                        labelFormatter: function () {
                            //console.log(this);
                            return '<div style="text-align: left; width:130px;float:left;">' + this.name + '</div><div style="width:40px; float:left;text-align:right;" ui-number-mask="2">' + this.y + '</div>';
                        }
                    },
                    series: [{
                        type: 'pie',
                        name: 'Status',
                        size: '60%',
                        data: Array,
                        /*point:{
                            events:{
                                click: function (event) {
                                    $scope.filterValue = this.name;
                                    $scope.filterMargin();
                                    //console.log(this);
                                }
                            }
                        }*/
                    }],
                    exporting: { enabled: false }
                });
            }
            else {
                //console.log("clean data")
                $('#'+component).empty();
            }
        }

        $scope.filterIssuerRisk = function () {

            IssuerRiskService.getAll($scope.legalEntityPO.selected.id,"LE",
                $scope.legalEntityCounterParty.selected.id,$scope.currency.selected.name).then(function (result) {

                let postedArray = [];
                let receiveArray = [];
                let availableArray = [];
                $scope.IssuersRisk = [];

                result.data.dataResponse.forEach(function (IssuerRisk) {
                    if(IssuerRisk.postedAmount != 0 || IssuerRisk.receivedAmount != 0 || IssuerRisk.availableAmount != 0)
                        $scope.IssuersRisk.push(IssuerRisk);

                    if(IssuerRisk.postedAmount > 0)
                        postedArray.push({name:IssuerRisk.name, y: IssuerRisk.postedAmount});

                    if(IssuerRisk.receivedAmount > 0)
                        receiveArray.push({name:IssuerRisk.name, y: IssuerRisk.receivedAmount});

                    if(IssuerRisk.availableAmount > 0)
                        availableArray.push({name:IssuerRisk.name, y: IssuerRisk.availableAmount});

                });
                //console.log(postedArray);


                $scope.drawPieChart('Posted',postedArray,'gchart_pie_posted');
                $scope.drawPieChart('Received',receiveArray,'gchart_pie_received');
                $scope.drawPieChart('Available',availableArray,'gchart_pie_available');
            });
        }

        LegalEntityService.getAll().then(function (result) {
            $scope.legalEntitiesPO = [];
            $scope.legalEntitiesCounterParty = [];
            $scope.legalEntitiesCounterParty.push({name: 'ALL COUNTERPARTY', id: 0, otherName:""});

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

            $scope.filterIssuerRisk();

        });


    }]);