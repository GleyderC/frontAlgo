'use strict';

var DashboardApp = angular.module('DashboardApp')

DashboardApp.controller(
    'BilateralAgreementsController', [
        'LegalEntityService',
        '$scope',
        '$document',
        '$timeout',
        '$request',
        'localStorageService',
        '$filter',
        function (LegalEntityService,
                  $scope,
                  $document,
                  $timeout,
                  $request,
                  $localStorage,
                  $filter) {


            var currenciesList = [];

            angular.forEach($localStorage.get("CurrencyEnum"), function (obj) {
                currenciesList.push(
                    {
                        id: obj.key,
                        codigo: obj.name
                    }
                );
            });

            currenciesList = $filter('orderBy')(currenciesList, 'codigo');

            $scope.BilateralAgreements =
            {
                staticData: {
                    contractType: $localStorage.get("BilateralContractType"),
                    currencies: currenciesList,
                    financialCalendar: $localStorage.get("FinancialCalendar")
                }
            };

            $scope.$on('$includeContentLoaded', function (event,url) {
                $scope.workspaceTabs.active = $scope.workspaceTabs.tabList.length;
                $scope.workspaceTabs.tabList[$scope.workspaceTabs.tabList.length - 1].head.icon = 'fa fa-money';
            });

            $scope.workspaceTabs = {
                name: 'collateral-tabs',
                active: 1,
                tabList: [
                    {
                        head: {
                            icon: 'fa fa-money',
                            text: 'Search Billateral Agreement'
                        },
                        templateUrl: paths.views + "/configuration/BilateralAgreements/le_bilateral_a_add_search.html",
                        active: true
                    }
                ]
            };

            $scope.addNewBillateralAgreement = function () {

                $scope.workspaceTabs.tabList.push(
                    {
                        head: {
                            icon: 'glyphicon glyphicon-refresh glyphicon-refresh-animate',
                            text: 'New Billateral Agreement(' + ($scope.workspaceTabs.tabList.length) + ')'
                        },
                        templateUrl: paths.views + "/configuration/BilateralAgreements/le_bilteral_a_tabs_container.html",
                        closable: true
                    }
                );

            };

            $scope.editBillateralAgreement = function () {

                $scope.workspaceTabs.tabList.push(
                    {
                        head: {
                            icon: '',
                            text: 'Editing Billateral Agreement (' + ($scope.workspaceTabs.tabList.length) + ')'
                        },
                        templateUrl: paths.views + "/configuration/BilateralAgreements/le_bilteral_a_tabs_container.html",
                        closable: true
                    }
                );

            };

            //main fields
            $scope.legalEntities = [];
            $scope.LegalEntity = {};
            $scope.LegalEntity.BilateralAgreements = {};
            $scope.LegalEntity.BilateralAgreements.main = {};
            $scope.LegalEntity.BilateralAgreements.main.callFrequency = "daily";

            LegalEntityService.getAll().then(function (result) {
                $scope.legalEntities = result.data.dataResponse;
            });
        }
    ])
;


DashboardApp.controller(
    'BAFormController', [
        '$scope',
        '$document',
        '$timeout',
        '$request',
        'localStorageService',
        function ($scope,
                  $document,
                  $timeout,
                  $request,
                  $localStorage) {

            $scope.$on('$includeContentLoaded', function (event,url) {

            });

            $scope.workspaceTabs = {
                name: 'collateral-tabs',
                active: 1,
                tabList: [
                    {
                        head: {
                            icon: 'glyphicon glyphicon-blackboard',
                            text: 'Main'
                        },
                        templateUrl: paths.views + "/configuration/BilateralAgreements/le_bilateral_a_main.html"
                    },
                    {
                        head: {
                            icon: 'glyphicon glyphicon-list-alt',
                            text: 'CSA Margin'
                        },
                        templateUrl: paths.views + "/configuration/BilateralAgreements/le_bilateral_a_csa_margins.html"
                    },
                    {
                        head: {
                            icon: 'glyphicon glyphicon-piggy-bank',
                            text: 'Eligible currencies'
                        },
                        templateUrl: paths.views + "/configuration/BilateralAgreements/le_bilateral_a_eligible_currencies.html"
                    },
                    {
                        head: {
                            icon: 'glyphicon glyphicon-eye-open',
                            text: 'Eligible securities'
                        },
                        templateUrl: paths.views + "/configuration/BilateralAgreements/le_bilateral_a_eligible_securities.html"
                    }
                ]
            };

        }]);

//BILATERAL AGREEMENT MAIN TAB CONTROLLER
DashboardApp.controller('BAMainController', ['$scope', '$request', '$interval', function ($scope, $request, $interval) {
    $scope.holidays = {
        searchSelect: true,
        searchSelected: true,
        data: $scope.BilateralAgreements.staticData.financialCalendar
    };
}]);

DashboardApp.controller('LEBillateralAgrSearchController', ['$scope', '$request', '$interval', function ($scope, $request, $interval) {

    //FIRST SEARCH TAB

    $scope.editRow = function (grid, row) {
        console.log("editing contract")
        console.log(row)
        $scope.editBillateralAgreement();
    }

    $scope.deleteRow = function (grid, row) {
        console.log("deleting")
    }

    $scope.gridOptions = {
        columnDefs: [
            {
                //field: 'contract_name',
                cellTemplate: '<div>Demo Contract Name</div>',
                name: 'Contract name'
            },
            {
                field: 'counterpartyA.name',
                name: 'Counter Party A'
            },
            {
                field: 'counterpartyB.name',
                name: 'Counter Party B'
            },
            {
                field: 'bilateralContractType',
                name: 'Contract type',
                groupable: true
            },
            {
                name: 'Actions',
                cellTemplate: paths.tpls + '/ActionsButtonsTpl.html',
                enableColumnMenu: false,
                enableFiltering: false,
                enableSorting: false,
                width: 160
            }
        ],
        data: [],
        rowHeight: 35, // set height to each row
        enableGridMenu: true,
        enableFiltering: true,
        exporterCsvFilename: 'Bilateral_Agreements.csv',
        exporterPdfDefaultStyle: {fontSize: 9},
        exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
        exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
        exporterPdfHeader: {text: "Bilateral Agreements", style: 'headerStyle'},
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

    $request.get("/servlet/BilateralContract/SelectAll").then(function(response){
        $scope.BilateralAgreements.contracts = response.data.dataResponse;
        $scope.gridOptions.data = $scope.BilateralAgreements.contracts;
    });

}]);

DashboardApp.controller('LEBillateralAgrEligibleCurrenciesController', ['ModalService', '$scope', '$request', '$interval', '$filter', function (ModalService, $scope, $request, $interval, $filter) {

    var currenciesList = $filter('orderBy')($scope.BilateralAgreements.staticData.currencies, 'codigo');

    this.modal = ModalService;
    this.modal.Options = {
        templateUrl: "modalAddCurrency.html",
        size: 'lg',
        rendered: function () {
            App.initComponents();
        },
        controller: function ($scope, $uibModalInstance, currencies) {

            $scope.currenciesList = currencies;

            $scope.ok = function () {
                console.log("Press Ok")
                $uibModalInstance.close();
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };

            $scope.EligCurRate = 'fixed';

        },
        resolve: {
            currencies: function(){
                return currenciesList;
            }
        }
    }

    $scope.editRow = function (grid, row) {
        console.log("editing")
    }

    $scope.deleteRow = function (grid, row) {
        console.log("deleting")
    }

    $scope.gridOptions = {
        columnDefs: [
            {name: 'Currency'},
            {name: 'Fixed Rate'},
            {name: 'Index'},
            {name: 'Tenor'},
            /*{name: 'Source'},
             {name: 'Factor'},
             {name: 'Compound'},
             {name: 'Included'},
             {name: 'Projected'},
             {name: 'Adjustment Currency'},*/
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

    $scope.gridOptions.data = [];

}]);

DashboardApp.controller('LEBillateralAgrEligibleSecuritiesController', ['$scope', '$request', '$interval', function ($scope, $request, $interval) {

    $scope.gridOptions = {

        columnDefs: [
            {
                field: 'collateralType',
                name: 'Collateral Type'
            },
            {
                name: 'Haircut',
                cellTemplate: '<input type="text" />',
                enableColumnMenu: false
            },
            {
                name: 'Haircut Type',
                cellTemplate: '' +
                '<select id="le-bilateral-ag-eleg-security-haircutType"' +
                'name="" class="form-control"' +
                'ng-model="LegalEntity.BilateralAgreements.elegibleSecurity.partyA.haircutType.selected">' +
                '<option value="regular" selected>REGULAR</option>' +
                '<option value="inverse">INVERSE</option>' +
                '</select>',
                enableColumnMenu: false
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

    $scope.gridOptions.data = [
        {
            selected: false,
            collateralType: "USA Bonds",
        },
        {
            selected: false,
            collateralType: "France Bonds",
        },
        {
            selected: false,
            collateralType: "Equity Options",
        },
        {
            selected: false,
            collateralType: "MBS",
        },
        {
            selected: false,
            collateralType: "European Equity",
        }
    ];

}]);

