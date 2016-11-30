'use strict';

var DashboardApp = angular.module('DashboardApp');


DashboardApp.controller('QueryFilterController', [ '$scope',
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
                
        $scope.splitPaneProperties = {};
		$scope.setFirstComponent = function (value) {
			$scope.splitPaneProperties.firstComponentSize = value;
		};
		$scope.setLastComponent = function (value) {
			$scope.splitPaneProperties.lastComponentSize = value;
		};

        //Grid Config
        $scope.gridQueryFilterOptions = {
            showGridFooter: true,
            paginationPageSizes: [12, 50, 100, 200, 500],
            paginationPageSize: 12,
            enableColumnResizing: true,
            enableFiltering: true,
            rowHeight: 35, // set height to each row
            enableGridMenu: true,
            exporterCsvFilename: 'trade_query_filter.csv',
            exporterPdfDefaultStyle: {fontSize: 9},
            exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
            exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
            exporterPdfHeader: {text: "Legal Entity", style: 'headerStyle'},
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

        $scope.gridQueryFilterOptions.columnDefs = [
            {field: 'id', enableCellEdit: false},
            {field: 'country',
                sort: {
                    direction: uiGridConstants.ASC,
                    priority: 0
                }
            },
            {field: 'idLeg1'},
            {field: 'idLeg2'},
            {field: 'internalId'},
            {field: 'SourceSystemDealID'},
            {field: 'family'},
            {field: 'group'},
            {field: 'type'},
            {field: 'SellBuy'},
            {field: 'Portfolio'},
            {field: 'Counterparty'},
            {field: 'ClearingHouse'},
            {field: 'TradeDate'},
            {field: 'StartDate'},
            {field: 'ExpiryDate'},
            {field: 'NominalCurr1'},
            {field: 'Nominal1'},
            {field: 'NominalCurr2'},
            {field: 'Nominal2'},
            {field: 'MarketValue'},
            {field: 'Colateral'},
            {field: 'ColType'},
            {field: 'Index'},
            {field: 'IndexLabel'},
            {field: 'Trader'},
            {field: 'contract'},
            {field: 'DealStatus'}
        ];

        $scope.QueryFilter = {};

        $scope.QueryFilter.TradeType = {};
        $scope.QueryFilter.TradeTypes = localStorageService.get('IRSType');

        $scope.QueryFilter.ProductFamily = {};
        $scope.QueryFilter.ProductFamilies = localStorageService.get('ProductFamily');
        
        $scope.QueryFilter.ProductGroup = {};
        $scope.QueryFilter.ProductGroups = localStorageService.get('ProductGroup');

        $scope.QueryFilter.ProductType = {};
        $scope.QueryFilter.ProductTypes = localStorageService.get('ProductType');
        
        $scope.QueryFilter.currencyList = localStorageService.get("CurrencyEnum");
        $scope.QueryFilter.currency ={};

        $scope.QueryFilter.TradeQuerySense = {};
        $scope.QueryFilter.TradeQuerySenses = localStorageService.get("TradeQuerySense");

        $scope.QueryFilter.ColType = {};
        $scope.QueryFilter.ColTypes = localStorageService.get("CollateralLiabilityType");

        $scope.QueryFilter.tradeDate = new Date();
        $scope.QueryFilter.maturityDate = new Date();
        $scope.QueryFilter.startDate = new Date();

        $scope.QueryFilter.tradePopup = { opened: false};
        $scope.QueryFilter.maturityPopup = { opened: false};
        $scope.QueryFilter.startPopup = { opened: false};


        $scope.QueryFilter.openDatePicker = function (datePicker) {
            if(datePicker == "trade"){
                $scope.QueryFilter.tradePopup.opened = true;
            }
            else if(datePicker == "maturity"){
                $scope.QueryFilter.maturityPopup.opened = true;
            }
            else if(datePicker == "start"){
                $scope.QueryFilter.startPopup.opened = true;
            }
        };

        function findProductFromPrefix(arr, prefix) {
            //var values = [];
            for (var i = arr.length-1; i >=0;  i--) {
                if (arr[i].key.indexOf(prefix) !== 0) {
                    arr.splice(i, 1);
                    //values.push(arr[i].split(splitChar)[1]);
                }
            }
        }

        $scope.QueryFilter.filterProduct = function (product, prefix) {
            //console.log(product);
            //console.log(prefix.key);
            if(product == "ProductFamily"){

                $scope.QueryFilter.ProductGroups = localStorageService.get('ProductGroup');
                findProductFromPrefix($scope.QueryFilter.ProductGroups, prefix.name);
                $scope.QueryFilter.ProductGroup = {selected: {}};
                $scope.QueryFilter.ProductGroup.selected = $scope.QueryFilter.ProductGroups[0];
                $scope.QueryFilter.filterProduct('ProductGroup',$scope.QueryFilter.ProductGroup.selected);
            }

            else if(product == "ProductGroup"){
                $scope.QueryFilter.ProductGroup.selected = prefix;
                $scope.QueryFilter.ProductTypes = localStorageService.get('ProductType');
                findProductFromPrefix($scope.QueryFilter.ProductTypes,prefix.name);
                $scope.QueryFilter.ProductType = {selected: {}};
                $scope.QueryFilter.ProductType = {selected: $scope.QueryFilter.ProductTypes[0]};

                $scope.QueryFilter.ProductFamily = {selected: {}};
                $scope.QueryFilter.ProductFamily.selected = $scope.QueryFilter.ProductFamilies.find(function (productFamily) {
                    if(productFamily.name == prefix.key){
                        return productFamily;
                    }
                });
            }
            else if(product == "ProductType"){

                if(!$scope.QueryFilter.ProductGroup.selected){
                    $scope.QueryFilter.ProductGroup.selected = $scope.QueryFilter.ProductGroups.find(function (productGroup) {
                        if(productGroup.name == prefix.key){
                            return productGroup;
                        }
                    });
                    if($scope.QueryFilter.ProductGroup.selected){
                        $scope.QueryFilter.ProductFamily.selected = $scope.QueryFilter.ProductFamilies.find(function (productFamily) {
                            if(productFamily.name == $scope.QueryFilter.ProductGroup.selected.key){
                                return productFamily;
                            }
                        })
                    }

                }
            }
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

                $scope.gridQueryFilterOptions.data = _that.IssuersRisk;

                $scope.gridQueryFilterOptions.data.forEach(function (data) {

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
                    angular.forEach(legalEntity.roleList, function( rol ) {
                        if(rol.roleType == "PO"){
                            $scope.legalEntitiesPO.push(legalEntity);
                        }
                        else if(rol.roleType == "COUNTERPARTY"){
                            $scope.legalEntitiesCounterParty.push(legalEntity);
                        }
                    });
                }


            });

            //inicializando combos
            $scope.currency.selected = $scope.currencies[1];
            $scope.legalEntityPO.selected = $scope.legalEntitiesPO[0];
            $scope.legalEntityCounterParty.selected = $scope.legalEntitiesCounterParty[0];

            $scope.filterIssuerRisk();

        });

}]);