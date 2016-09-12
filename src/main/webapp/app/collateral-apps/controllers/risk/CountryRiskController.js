'use strict';

var DashboardApp = angular.module('DashboardApp');


DashboardApp.controller('CountryRiskController', [ '$scope',
    'localStorageService', 'LegalEntityService', 'RiskService', 'ArrayService','uiGridConstants',
    function ( $scope, localStorageService, LegalEntityService, RiskService, ArrayService, uiGridConstants) {

        $scope.currencies = localStorageService.get("CurrencyEnum");
        $scope.countries = localStorageService.get("CountryEnum");
        $scope.currencies.splice(2,1);
        $scope.currency = {};
        $scope.legalEntityPO = {};
        $scope.legalEntityCounterParty = {};
        $scope.sovereign = false;
        $scope.public = false;
        $scope.corporate = false;
        let _that = this;
        this.IssuersRisk = [];

        //Grid Config
        $scope.gridCountryRiskOptions = {
            expandableRowTemplate: 'country_risk_expandable.html',
            //expandableRowHeight: 600,
            showTreeExpandNoChildren: true,
            showGridFooter: true,
            paginationPageSizes: [15, 50, 100, 200, 500],
            paginationPageSize: 50,
            enableColumnResizing: true,
            enableFiltering: true,
            rowHeight: 35, // set height to each row
            enableGridMenu: true,
            exporterCsvFilename: 'margin-call-CountryRisk.csv',
            exporterPdfDefaultStyle: {fontSize: 9},
            exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
            exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
            exporterPdfHeader: {text: "Margin Call - CountryRisk", style: 'headerStyle'},
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
                $scope.gridApi.grid.registerRowsProcessor( $scope.countryGridFilter, 200 );
                gridApi.expandable.on.rowExpandedStateChanged($scope,function(row){
                    $scope.gridCountryRiskOptions.expandableRowHeight = row.entity.subGridOptions.length * 30;
                });
            }
        };

        $scope.gridCountryRiskOptions.columnDefs = [
            {field: 'name', name:'',width:40, enableSorting: false, enableFiltering:false, cellTemplate: '<span class="f32">' +
            '<span id="flag" class="flag {{COL_FIELD | lowercase}}"></span></span>'},
            {field: 'country',
                sort: {
                    direction: uiGridConstants.ASC,
                    priority: 0
                }
            },
            {field: 'postedAmount', cellFilter: 'number:0', cellClass:'collateral-money'  },
            {field: 'postedPerCent',  displayName:'Haircut', cellTemplate: '<div class="text-center">{{COL_FIELD | number:2 }}%</div>'},
            {field: 'receivedAmount', cellFilter: 'number:0', cellClass:'collateral-money'  },
            {field: 'receivedPerCent',  displayName:'Haircut', cellTemplate: '<div class="text-center">{{COL_FIELD | number:2}}%</div>'},
            {field: 'availableAmount', cellFilter: 'number:0', cellClass:'collateral-money'  },
            {field: 'availablePerCent',  displayName:'Haircut', cellTemplate: '<div class="text-center">{{COL_FIELD | number:2}}%</div>'},
            {field: 'rating'}
        ];

        $scope.countryGridFilter = function( renderableRows ){
            var matcher = new RegExp($scope.filterValue);
            if(renderableRows != undefined || renderableRows.length >0 ){
                renderableRows.forEach( function( row ) {
                    var match = false;
                    ['country'].forEach(function( field ){
                        //console.log(row.entity[field]);
                        if ( row.entity[field] ){
                            if ( row.entity[field].match(matcher) ){
                                match = true;
                                //console.log(row.entity);
                                //$scope.gridApi.expandable.expandRow($scope.gridApi.grid.rows[0].entity);

                            }
                        }
                    });
                    if ( !match ){
                        row.visible = false;
                    }
                });
            }

            return renderableRows;
        };

        $scope.drawHighMap = function (data) {

            // Add lower case codes to the data set for inclusion in the tooltip.pointFormat
            var mapData = Highcharts.geojson(Highcharts.maps['custom/world']);
            /*$.each(mapData, function () {
                this.id = this.properties['hc-key']; // for Chart.get()
                this.flag = this.id.replace('UK', 'GB').toLowerCase();
            });*/


            var mapChart;

            // Initiate the chart
            mapChart = $('#country-risk-map').highcharts('Map', {

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
                    joinBy: ['iso-a2', 'name'],
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
                    dataLabels: {
                        enabled: true,
                        format: "{point.iso-a2}"
                    },
                    point:{
                        events:{
                            select: function(){
                                //console.log('select');
                                //console.log(this);

                                $('#info #flag').attr('class', 'flag ' + this.flag);
                                $('#info #flag_name').html(this.name);

                                console.log(this);
                                $scope.filterValue = this.name;
                                $scope.gridApi.grid.refresh();

                            },
                            unselect: function () {
                             //console.log('unselect');
                                // console.log(this);
                                //$('#info #flag').removeAttr('class', 'flag '  + this.flag);
                                //$('#info #flag_name').html('');
                                $scope.filterValue = '';
                                $scope.gridApi.grid.refresh();

                            }/*,
                            click: function () {
                                console.log('click');
                                console.log(this);
                            }*/
                        }
                    },
                    tooltip:{
                        pointFormat: "{point.name}",
                        footerFormat: '<br><span style="font-size: 10px">(Click for details)</span>'
                    }
                }]
            }).highcharts();
            //console.log(Highcharts.maps['custom/world'])


        }

        $scope.filterIssuerRisk = function () {
        	if($scope.legalEntityPO.selected !==undefined) {
            RiskService.getExposureByCountry($scope.legalEntityPO.selected.id,"LE",
                $scope.legalEntityCounterParty.selected.id,$scope.currency.selected.name,
                $scope.sovereign,$scope.public,$scope.corporate).then(function (result) {

                let postedArray = [];
                let receiveArray = [];
                let availableArray = [];
                _that.IssuersRisk = [];
                let IssuersRiskCountry = [];

                //console.log(result.data.dataResponse);
                result.data.dataResponse.forEach(function (Risk) {
                    if(Risk.postedAmount != 0 || Risk.receivedAmount != 0 || Risk.availableAmount != 0) {
                        if(Risk.name == 'UK')
                            Risk.name = 'GB';

                        let country = $scope.countries.filter(function (country) {
                            if(country.key == Risk.name){
                                Risk.country = country.name;
                            }
                        });
                        
                        _that.IssuersRisk.push(Risk);
                        IssuersRiskCountry.push(Risk);
                        
                    }
                    if(Risk.postedAmount > 0)
                        postedArray.push({name:Risk.name, y: Risk.postedAmount});

                    if(Risk.receivedAmount > 0)
                        receiveArray.push({name:Risk.name, y: Risk.receivedAmount});

                    if(Risk.availableAmount > 0)
                        availableArray.push({name:Risk.name, y: Risk.availableAmount});

                });
                //console.log(_that.IssuersRisk);

                $scope.gridCountryRiskOptions.data = _that.IssuersRisk;

                $scope.gridCountryRiskOptions.data.forEach(function (data) {

                    data.subGridOptions = {
                        columnDefs: [
                            {field: 'issuer'},
                            {field: 'issuerType'},
                            {field: 'posted',  cellFilter: 'number:0', cellClass:'collateral-money'  },
                            {field: 'received', cellFilter: 'number:0', cellClass:'collateral-money'  },
                            {field: 'available', cellFilter: 'number:0', cellClass:'collateral-money'  }
                        ],
                        data: data.detailByIssuerList
                    }
                })
                
                $scope.drawHighMap(IssuersRiskCountry);
            });
        }
        }

        LegalEntityService.getAll().then(function (result) {
            $scope.legalEntitiesPO = [];
            $scope.legalEntitiesCounterParty = [];
            $scope.legalEntitiesCounterParty.push({name: 'ALL COUNTERPARTY', id: 0, otherName:""});

            let legalEntities = result.data.dataResponse;
            legalEntities.forEach(function(legalEntity){
                if(legalEntity != null){
                    if(legalEntity.rolList == "PO"){
                        $scope.legalEntitiesPO.push(legalEntity);
                    }
                    else if(legalEntity.rolList == "COUNTERPARTY"){
                        $scope.legalEntitiesCounterParty.push(legalEntity);
                    }
                }


            });

            //inicializando combos
            $scope.currency.selected = $scope.currencies[1];
            $scope.legalEntityPO.selected = $scope.legalEntitiesPO[0];
            $scope.legalEntityCounterParty.selected = $scope.legalEntitiesCounterParty[0];

            $scope.filterIssuerRisk();

        });

}]);