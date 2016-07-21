'use strict';

var DashboardApp = angular.module('DashboardApp');


DashboardApp.controller('CountryRiskController', [ '$scope',
    'localStorageService', 'LegalEntityService', 'RiskService', 'ArrayService',
    function ( $scope, localStorageService, LegalEntityService, RiskService, ArrayService ) {

        $scope.currencies = localStorageService.get("CurrencyEnum");
        $scope.currencies.splice(2,1);
        $scope.currency = {};
        $scope.legalEntityPO = {};
        $scope.legalEntityCounterParty = {};
        let _that = this;
        this.IssuersRisk = [];


        $scope.drawHighMap = function () {

            $.getJSON('collateral-apps/controllers/risk/world-population-density.json', function (data) {

                // Add lower case codes to the data set for inclusion in the tooltip.pointFormat
                var mapData = Highcharts.geojson(Highcharts.maps['custom/world']);
                $.each(mapData, function () {
                    this.id = this.properties['hc-key']; // for Chart.get()
                    this.flag = this.id.replace('UK', 'GB').toLowerCase();
                });

                // Wrap point.select to get to the total selected points
                Highcharts.wrap(Highcharts.Point.prototype, 'select', function (proceed) {
                    proceed.apply(this, Array.prototype.slice.call(arguments, 1));

                    var points = mapChart.getSelectedPoints();

                    if (points.length === 1) {
                        $('#info #flag').attr('class', 'flag ' + points[0].flag);
                        $('#info h2').html(points[0].name);
                    }


                });
                //console.log(data);
                var mapChart;

                // Initiate the chart
                mapChart = $('#container').highcharts('Map', {

                    title : {
                        text : 'Country Risk'
                    },
                    mapNavigation: {
                        enabled: true,
                        buttonOptions: {
                            verticalAlign: 'bottom'
                        }
                    },
                    colorAxis: {
                        min: 1,
                        max: 1000,
                        type: 'logarithmic'
                    },

                    series : [{
                        data : data,
                        mapData: mapData,
                        joinBy: ['iso-a2', 'code'],
                        name: 'Country',
                        allowPointSelect: true,
                        cursor: 'pointer',
                        states: {
                            select: {
                                color: '#a4edba',
                                borderColor: 'black',
                                dashStyle: 'shortdot'
                            }
                        },
                        tooltip:{
                            footerFormat: '<span style="font-size: 10px">(Click for details)</span>'
                        }
                    }]
                }).highcharts();
                //console.log(Highcharts.maps['custom/world'])

            });

        }

        $scope.filterIssuerRisk = function () {

            RiskService.getExposureByCountry($scope.legalEntityPO.selected.id,"LE",
                $scope.legalEntityCounterParty.selected.id,$scope.currency.selected.name).then(function (result) {

                let postedArray = [];
                let receiveArray = [];
                let availableArray = [];
                _that.IssuersRisk = [];

                result.data.dataResponse.forEach(function (Risk) {
                    if(Risk.postedAmount != 0 || Risk.receivedAmount != 0 || Risk.availableAmount != 0)
                        _that.IssuersRisk.push(Risk);

                    if(Risk.postedAmount > 0)
                        postedArray.push({name:Risk.name, y: Risk.postedAmount});

                    if(Risk.receivedAmount > 0)
                        receiveArray.push({name:Risk.name, y: Risk.receivedAmount});

                    if(Risk.availableAmount > 0)
                        availableArray.push({name:Risk.name, y: Risk.availableAmount});

                });
                //console.log(postedArray);


                $scope.drawHighMap();
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