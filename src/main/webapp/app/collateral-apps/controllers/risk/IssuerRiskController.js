'use strict';

var DashboardApp = angular.module('DashboardApp');


DashboardApp.controller('IssuerRiskController', [ '$scope',
    'localStorageService', 'LegalEntityService', 'RiskService', 'ArrayService','uiGridConstants',
    function ( $scope, localStorageService, LegalEntityService, RiskService, ArrayService, uiGridConstants ) {

        $scope.currencies = localStorageService.get("CurrencyEnum");
        $scope.currencies.splice(2,1);
        $scope.currency = {};
        $scope.legalEntityPO = {};
        $scope.legalEntityCounterParty = {};
        let _that = this;
        this.IssuersRisk = [];

        //Grid Config
        $scope.gridIssuerRiskOptions = {
            showGridFooter: true,
            paginationPageSizes: [15, 50, 100, 200, 500],
            paginationPageSize: 50,
            enableColumnResizing: true,
            enableFiltering: true,
            rowHeight: 35, // set height to each row
            enableGridMenu: true,
            exporterCsvFilename: 'margin-call-IssuerRisk.csv',
            exporterPdfDefaultStyle: {fontSize: 9},
            exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
            exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
            exporterPdfHeader: {text: "Margin Call - IssuerRisk", style: 'headerStyle'},
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

        $scope.gridIssuerRiskOptions.columnDefs = [
            {field: 'name',
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
                            center: ['50%', '50%'],
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

        $scope.filterIssuerRisk = function (){ 
          console.log($scope.legalEntityPO);
          if($scope.legalEntityPO.selected!==undefined){
            RiskService.getExposureByIssuer($scope.legalEntityPO.selected.id,"LE",
            	
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
                $scope.gridIssuerRiskOptions.data = _that.IssuersRisk;


                $scope.drawPieChart('Posted',postedArray,'gchart_pie_posted');
                $scope.drawPieChart('Received',receiveArray,'gchart_pie_received');
                $scope.drawPieChart('Available',availableArray,'gchart_pie_available');
            });
          }
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