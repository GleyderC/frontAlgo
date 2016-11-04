'use strict';

var DashboardApp = angular.module('DashboardApp');


DashboardApp.controller('CCPsEligibleCurrenciesController', ['ModalService', '$scope', '$request', '$interval', '$filter','localStorageService', function (ModalService, $scope, $request, $interval, $filter, $localStorage) {

    var _that = this;

    var currenciesList = $filter('orderBy')(currenciesList, 'codigo');

    $scope.CCPsBilateralAgreements =
    {
        staticData: {
            contractType: $localStorage.get("BilateralContractType"),
            currencies: currenciesList,
            financialCalendar: $filter('orderBy')($localStorage.get("FinancialCalendar"), 'name'),
            marginFrequency: $localStorage.get("MarginFrequencyEnum"),
            contracts: [],
            supportedindexes: $filter('orderBy')($localStorage.get("Supportedindexes"), 'name'),
        }
    };

    var supportedindexes = $scope.CCPsBilateralAgreements.staticData.supportedindexes;

    //clean index array
    angular.forEach(supportedindexes, function (index, key) {
        if (!index.key) {
            supportedindexes.splice(key, 1);
        }
    });

    var interestDateRules = [
        {
            key: 'FBD',
            name: 'Monthly, first business date'
        },
    ]

    var collateralPolicies = [
        {
            key: 'CSA_DISCOUNTING',
            name: 'CSA Discounting'
        },
    ]

    this.interestDateRulesList = interestDateRules;
    this.interestDateRule = {key: 'FBD'};
    this.collateralPolicyList = collateralPolicies;
    this.collateralPolicy = {key: 'CSA_DISCOUNTING'};
    this.interestDateRuleOnly = true;
    this.rollInterestPricipal = true;

    this.modalAddCurrencty = function (parameters) {

        if(!parameters)
        {
            parameters = {};
        }

        ModalService.open({
            templateUrl: "modalAddCurrency.html",
            size: 'lg',
            rendered: function () {
                App.initComponents();
            },
            resolve: {  params: parameters },
            controller: function (toastr, $scope, $uibModalInstance, params) {

                let editing = false;

                //SETTING DEFAULT VALUES
                $scope.CCPsseCurrency  = {};
                $scope.currenciesList = currenciesList;
                $scope.supportedindexesList = supportedindexes;
                $scope.compounding = false;
                $scope.includeInterestPosition = false;
                $scope.adjustmentCurrency = false;
                $scope.projectInterestPosition = false;
                $scope.hairCut = 0;
                $scope.inverse = false;

                //Fixed Rate 'EligCurRate'
                $scope.interestDateRuleOnlyFixedRate = 0;

                //Floating Rate
                $scope.index = 0;
                $scope.tenor = '';
                $scope.spread = 0;
                $scope.factor = 0;
                $scope.floor = false;
                $scope.floorAmount = 0;

                //EDIT START

                if( typeof params === 'object' && params.currency !== undefined )
                {
                    editing = true;

                    //SETTING DEFAULT VALUES
                    $scope.compounding = params.compounding;
                    $scope.CCPsseCurrency.id = params.currency;
                    $scope.CCPsseCurrency.codigo = params.currency;
                    $scope.includeInterestPosition = params.included;
                    $scope.adjustmentCurrency = params.adjustmentCurrency;
                    $scope.projectInterestPosition = params.projected;
                    $scope.hairCut = params.hairCut;
                    $scope.inverse = params.hairCutMethod == "REGULAR" ? false : true;

                    //Fixed Rate 'EligCurRate'
                    $scope.interestDateRuleOnlyFixedRate = params.fixedRate;

                    //Floating Rate
                    $scope.index = params.index;
                    $scope.tenor = params.tenor;
                    $scope.spread = params.spread;
                    $scope.factor = params.factor;
                    $scope.floor = params.floor;
                    $scope.floorAmount = params.floorAmount;
                }
                //EDIT END

                $scope.save = function () {
                    //console.log("Press Ok")

                    if(editing === true)
                    {
                        _that.gridOptions.data.splice(_that.gridOptions.data.indexOf(params),1);
                    }

                    if (!$scope.CCPsseCurrency) {
                        toastr.error("Please, fill all fields");
                        return false;
                    }

                    if ($scope.EligCurRate == 'fixed') {
                        if (!$scope.index) {
                            $scope.index = {
                                key: '',
                                name: ''
                            }
                        }
                    }

                    _that.gridOptions.data.push({
                        currency: $scope.CCPsseCurrency.codigo,
                        type: $scope.EligCurRate,
                        fixedRate: $scope.interestDateRuleOnlyFixedRate,
                        index: $scope.index.key,
                        tenor: $scope.tenor,
                        source: "",
                        spread: $scope.spread,
                        factor: $scope.factor,
                        floor: $scope.floor,
                        floorAmount: $scope.floorAmount,
                        compounding: $scope.compounding,
                        included: $scope.includeInterestPosition,
                        projected: $scope.projectInterestPosition,
                        adjustmentCurrency: $scope.adjustmentCurrency,
                        hairCut: $scope.hairCut,
                        hairCutMethod: $scope.inverse == false ? "REGULAR" : "INVERSE"

                    });

                    $uibModalInstance.close();
                };

                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };

                $scope.EligCurRate = 'fixed';

            }
        });
    };

    $scope.editRow = function (grid, row) {
        _that.modalAddCurrencty(row.entity);
    }

    $scope.deleteRow = function (grid, row) {
        var index = this.gridOptions.data.indexOf(row.entity);
        this.gridOptions.data.splice(index, 1);
    }

    this.gridOptions = {
        columnDefs: [
            {
                field: 'currency',
                name: 'Currency'
            },
            {
                field: 'fixedRate',
                name: 'Fixed Rate'
            },
            {
                field: 'index',
                name: 'Index'
            },
            {
                field: 'tenor',
                name: 'Tenor'
            },
            {
                name: 'Actions',
                cellTemplate: paths.tpls + '/ActionsButtonsTpl.html',
                enableColumnMenu: false,
                width: 160
            }
        ],
        enableGridMenu: true,
        enableSelectAll: true,
        exporterCsvFilename: 'myFile.csv',
        exporterPdfDefaultStyle: {fontSize: 9},
        exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
        exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
        exporterPdfHeader: {text: "My Header", style: 'headerStyle'},
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
        exporterPdfMaxGridWidth: 500,
        exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
            // call resize every 500 ms for 5 s after modal finishes opening
            $interval(function () {
                $scope.gridApi.core.handleWindowResize();
            }, 1000, 10);
        }
    };

    this.gridOptions.data = [];

    if (!!$scope.parameters && !!$scope.parameters.BilateralContract) {
        this.gridOptions.data = $scope.parameters.BilateralContract.eligibleCurrencyConfig.eligibleCurrenciesPartyAList;
    }

}]);
