'use strict';

var DashboardApp = angular.module('DashboardApp')

DashboardApp.controller(
    'BilateralAgreementsController', [
        'LegalEntityService',
        'BilateralContractService',
        '$scope',
        '$document',
        '$timeout',
        '$request',
        'localStorageService',
        '$filter',
        function (LegalEntityService,
                  BilateralContractService,
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
                    financialCalendar: $filter('orderBy')($localStorage.get("FinancialCalendar"), 'name'),
                    marginFrequency: $localStorage.get("MarginFrequencyEnum"),
                    contracts: []
                }
            };

            //main fields
            $scope.legalEntities = [];
            $scope.LegalEntity = {};
            $scope.LegalEntity.BilateralAgreements = {};
            $scope.LegalEntity.BilateralAgreements.main = {};

            LegalEntityService.getAll().then(function (result) {
                $scope.legalEntities = result.data.dataResponse;
            });

            $scope.bilateralAgrWorkspaceTabs = {
                tabList: [
                    {
                        head: {
                            icon: 'glyphicon glyphicon-blackboard',
                            text: 'Main'
                        },
                        templateUrl: paths.views + "/configuration/BilateralAgreements/le_bilateral_a_main.html",
                        autoload: true
                    },
                    {
                        head: {
                            icon: 'glyphicon glyphicon-list-alt',
                            text: 'CSA Margin'
                        },
                        templateUrl: paths.views + "/configuration/BilateralAgreements/le_bilateral_a_csa_margins.html",
                        autoload: true
                    },
                    {
                        head: {
                            icon: 'glyphicon glyphicon-piggy-bank',
                            text: 'Eligible currencies'
                        },
                        templateUrl: paths.views + "/configuration/BilateralAgreements/le_bilateral_a_eligible_currencies.html",
                        autoload: true
                    },
                    {
                        head: {
                            icon: 'glyphicon glyphicon-eye-open',
                            text: 'Eligible securities'
                        },
                        templateUrl: paths.views + "/configuration/BilateralAgreements/le_bilateral_a_eligible_securities.html",
                        autoload: true
                    }
                ]
            };

        }]);

DashboardApp.controller('LEBilateralAgrSearchController', ['$scope',
    '$request',
    '$interval',
    'localStorageService',
    '$filter',
    'LegalEntityService',
    'BilateralContractService',
    function
        ($scope,
         $request,
         $interval,
         $localStorage,
         $filter,
         LegalEntityService,
         BilateralContractService) {

        if (!$scope.BilateralAgreements)
            $scope.BilateralAgreements = new Object();

        $scope.addNewBilateralAgreement = function () {
            
            $scope.$workspaceTabsMgm.addTab({
                head: {
                    icon: 'fa fa-thumbs-o-up',
                    text: 'New Bilateral Agreement',
                },
                templateUrl: paths.views + "/configuration/BilateralAgreements/index.html",
                closable: true,
                autoload: true
            }, [3, 2]);
        };

        $scope.editRow = function (grid, row) {

            $scope.$workspaceTabsMgm.addTab({
                head: {
                    icon: 'fa fa-thumbs-o-up',
                    text: 'Edit Bilateral Agreement (' + ($scope.$workspaceTabsMgm.getWorkspaceTabs([1, 2]).tabList.length) + ')'
                },
                templateUrl: paths.views + "/configuration/BilateralAgreements/index.html",
                parameters: {
                    BilateralContract: row.entity
                },
                closable: true,
                autoload: true
            }, [3, 2]);

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

        BilateralContractService.getAll().then(function (result) {
            $scope.BilateralAgreements.contracts = result.data.dataResponse;
            $scope.gridOptions.data = result.data.dataResponse;
        });

    }]);


//BILATERAL AGREEMENT MAIN TAB CONTROLLER
DashboardApp.controller('BAMainController', ['$scope', '$request', '$interval', function ($scope, $request, $interval) {

    $scope.holidays = {
        searchSelect: true,
        searchSelected: true,
        data: $scope.BilateralAgreements.staticData.financialCalendar
    };

    //EDIT INFO
    if (!!$scope.parameters && !!$scope.parameters.BilateralContract) {

        let BilContract = $scope.parameters.BilateralContract;

        this.contractCode = BilContract.contractCode;
        this.legalEntityPrimary = {id: BilContract.counterpartyA.id};
        this.legalEntityCounterparty = {id: BilContract.counterpartyB.id};
        this.baseCurrency = {id: BilContract.baseCurrency}
        this.contractType = {key: BilContract.bilateralContractType};
        this.autoSendTime = {};
        this.autoSendTime.iLocalMillis = BilContract.autoSendTime[0].iLocalMillis
        this.autoSendTime.iChronology = BilContract.autoSendTime[0].iChronology.iBase.iMinDaysInFirstWeek;


        this.callFrequency = {key: BilContract.marginFrequency};
        this.callOffset = BilContract.callOffset;

        //Multiselect
        this.holidays = $scope.holidays;
        this.holidays.msSelected = BilContract.counterpartyA.financialCalendarList
    }

}]);

DashboardApp.controller('BACSAMarginsController', ['ModalService', '$scope', '$request', '$interval', '$filter', function (ModalService, $scope, $request, $interval, $filter) {

}]);

DashboardApp.controller('LEBilateralAgrEligibleCurrenciesController', ['ModalService', '$scope', '$request', '$interval', '$filter', function (ModalService, $scope, $request, $interval, $filter) {

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
            currencies: function () {
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

DashboardApp.controller('LEBilateralAgrEligibleSecuritiesController', ['$scope', '$request', '$interval', '$log', function ($scope, $request, $interval, $log) {

    this.gridOptions = {

        columnDefs: [
            {
                field: 'collateralType',
                name: 'Collateral Type'
            },
            {
                field: 'haircut',
                name: 'Haircut',
                cellTemplate: '<input type="text" ng-model="MODEL_COL_FIELD" ng-disabled="!row.entity.disabled"/>',
                enableColumnMenu: false
            },
            {
                field: 'haircutType',
                name: 'Haircut Type',
                cellTemplate: '' +
                '<select id="le-bilateral-ag-eleg-security-haircutType" ' +
                    'ng-disabled="!row.entity.disabled" ' +
                    'name="" class="form-control" ' +
                    'ng-model="MODEL_COL_FIELD"> ' +
                  '<option value="regular">REGULAR</option>' +
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

            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                row.entity.disabled = row.isSelected
                //$log.log(row);
            });

        }
    };

    this.gridOptions.data = [
        {
            selected: false,
            collateralType: "USA Bonds",
            haircut: '',
            haircutType: 'regular',
        },
        {
            selected: false,
            collateralType: "France Bonds",
            haircut: '',
            haircutType: 'regular',
        },
        {
            selected: false,
            collateralType: "Equity Options",
            haircut: '',
            haircutType: 'regular',
        },
        {
            selected: false,
            collateralType: "MBS",
            haircut: '',
            haircutType: 'regular',
        },
        {
            selected: false,
            collateralType: "European Equity",
            haircut: '',
            haircutType: 'regular',
        }
    ];

}]);

