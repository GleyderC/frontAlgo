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
        'toastr',
        'BillAgreementData',//Factory
        function (LegalEntityService,
                  BilateralContractService,
                  $scope,
                  $document,
                  $timeout,
                  $request,
                  $localStorage,
                  $filter,
                  toastr,
                  BillAgreementData) {

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
                    contracts: [],
                    supportedindexes: $filter('orderBy')($localStorage.get("Supportedindexes"), 'name'),
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
                        templateUrl: paths.views + "/static_data/BilateralAgreements/bilateral_a_main.html",
                        autoload: true
                    },
                    {
                        head: {
                            icon: 'glyphicon glyphicon-list-alt',
                            text: 'CSA Margin'
                        },
                        templateUrl: paths.views + "/static_data/BilateralAgreements/bilateral_a_csa_margins.html",
                        autoload: true
                    },
                    {
                        head: {
                            icon: 'glyphicon glyphicon-piggy-bank',
                            text: 'Eligible currencies'
                        },
                        templateUrl: paths.views + "/static_data/BilateralAgreements/bilateral_a_eligible_currencies.html",
                        autoload: true
                    },
                    {
                        head: {
                            icon: 'glyphicon glyphicon-eye-open',
                            text: 'Eligible securities'
                        },
                        templateUrl: paths.views + "/static_data/BilateralAgreements/bilateral_a_eligible_securities.html",
                        autoload: true
                    }
                ]
            };

            this.saveBilateralAgr = function () {

                var BA = BillAgreementData.getBillateralAgreement();
                $scope.billateralContract = {};

                $scope.billateralContract.contractCode = BA.contractCode;
                $scope.billateralContract.IMthreshold = 0;
                $scope.billateralContract.currentExposure =  0;
                $scope.billateralContract.IM =  false;
                $scope.billateralContract.counterpartyA     = BA.counterpartyA;
                $scope.billateralContract.counterpartyB = BA.counterpartyB;
                $scope.billateralContract.counterpartyAId = BA.counterpartyA.id;
                $scope.billateralContract.counterpartyBId =  BA.counterpartyB.id;
                $scope.billateralContract.partyAPaysVM;
                $scope.billateralContract.partyBPaysVM;
                $scope.billateralContract.billateralContractType = BA.contractType.key ;
                $scope.billateralContract.partyAVmFundingCost ; 
                $scope.billateralContract.partyAImFundingCost ; 
                $scope.billateralContract.partyBVmFundingCost ; 
                $scope.billateralContract.partyBImFundingCost ; 

                $scope.billateralContract.partyAVmProfit ; 
                $scope.billateralContract.partyAVImProfit ; 

                $scope.billateralContract.partyBVmProfit ; 
                $scope.billateralContract.partyBImProfit ; 


                toastr.success("Info Saved", "Good");

                BilateralContractService.save($scope.billateralContract);
            }

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

            $scope.$workspaceTabsMgm.addTabByID({
                head: {
                    icon: 'fa fa-thumbs-o-up',
                    text: 'New Bilateral Agreement',
                },
                templateUrl: paths.views + "/static_data/BilateralAgreements/index.html",
                closable: true,
                autoload: true
            }, 'static_data');
        };
        $scope.refreshBilateralContracts = function(){
          BilateralContractService.getAll().then(function (result) {
                    $scope.BilateralAgreements.contracts = result.data.dataResponse;
                    $scope.gridOptions.data = result.data.dataResponse;
          });
        };
        $scope.editRow = function (grid, row) {

            $scope.$workspaceTabsMgm.addTabByID({
                head: {
                    icon: 'fa fa-thumbs-o-up',
                    text: 'Editing Bilateral Agreement'
                },
                templateUrl: paths.views + "/static_data/BilateralAgreements/index.html",
                parameters: {
                    BilateralContract: row.entity
                },
                closable: true,
                autoload: true
            }, 'static_data');

        }

        $scope.deleteRow = function (grid, row) {
            var index = $scope.gridOptions.data.indexOf(row.entity);
            $scope.gridOptions.data.splice(index, 1);
            BilateralContractService.delete(row.entity.id);
        }

        $scope.gridOptions = {
            columnDefs: [
             {
                    field: 'contractCode',
                    name: 'Contract code'
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
                    field: 'contractType',
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
DashboardApp.controller('BAMainController', ['$scope', '$request', '$interval','BillAgreementData' ,function ($scope, $request, $interval,BillAgreementData) {

    //SETTING DEFAULT INFO
    $scope.BA = {};
    $scope.BA.callIssuanceAuto = false;
    $scope.BA.bilateralAcasiaSoft = false;
    $scope.BA.status = true;

    //Notification TimePicker
    $scope.BA.notification = new Date();
    $scope.BA.hstep = 1;
    $scope.BA.mstep = 1;

    this.options = {
        hstep: [1, 2, 3],
        mstep: [1, 5, 10, 15, 25, 30]
    };
    this.ismeridian = true;
    //TimePicker

    $scope.holidays = {
        searchSelect: true,
        searchSelected: true,
        data: $scope.BilateralAgreements.staticData.financialCalendar
    };

    //EDIT INFO
    if (!!$scope.parameters && !!$scope.parameters.BilateralContract) {

        let BilContract = $scope.parameters.BilateralContract;

        $scope.BA.contractCode = BilContract.contractCode;
        $scope.BA.counterpartyA = {id: BilContract.counterpartyA.id, name: BilContract.counterpartyA.name};
        $scope.BA.counterpartyB = {id: BilContract.counterpartyB.id, name: BilContract.counterpartyB.name};
        $scope.BA.baseCurrency = {id: BilContract.baseCurrency}
        $scope.BA.contractType = {key: BilContract.bilateralContractType};
        $scope.BA.autoSendTime = {};
        $scope.BA.autoSendTime.iLocalMillis = BilContract.autoSendTimes[0].autoSendTime.iLocalMillis
        $scope.BA.autoSendTime.iChronology = BilContract.autoSendTimes[0].autoSendTime.iChronology.iBase.iMinDaysInFirstWeek;

        $scope.BA.callFrequency = {key: BilContract.marginFrequency};
        $scope.BA.callOffset = BilContract.callOffset;

        $scope.holidays.msSelected = BilContract.counterpartyA.financialCalendarList
        //Multiselect
        $scope.BA.holidays = $scope.holidays;
    }
    
    BillAgreementData.setBillateralAgreement($scope.BA);
    $scope.$watchCollection('BA', function (newValue, oldValue) {
        if (newValue !== oldValue) BillAgreementData.setBillateralAgreement(newValue);
    });
}]);

DashboardApp.controller('BACSAMarginsController', ['ModalService', '$scope', '$request', '$interval', '$filter', 'toastr', 'BillAgreementData',
                                    function (ModalService, $scope, $request, $interval, $filter, toastr,BillAgreementData) {

    $scope.BACSA =  {};
    $scope.BACSA.partyA = {};
    $scope.BACSA.partyA.LegEnforceableAgreement = false;
    $scope.BACSA.partyA.independentAmount = false;
    $scope.BACSA.partyA.ratings = false;
    $scope.BACSA.partyA.rehipotecation = false;

    $scope.BACSA.partyB = {};
    $scope.BACSA.partyB.LegEnforceableAgreement = false;
    $scope.BACSA.partyB.independentAmount = false;
    $scope.BACSA.partyB.ratings = false;
    $scope.BACSA.partyB.rehipotecation = false;

    //MODALS
    $scope.modalConfigIndAmount = function () {
        ModalService.open({
            templateUrl: "modalConfigIndependentAmount.html",
            size: 'lg',
            rendered: function () {
                App.initComponents();
            },
            controllerAs: 'mdlConfigIndAmountCtrl',
            controller: function (toastr, $scope, $uibModalInstance) {

                $scope.save = function () {
                    //console.log("Press Ok")
                    $uibModalInstance.close();
                };

                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
            },
            resolve: {}
        });
    }

    $scope.modalConfigBasedOnRatings = function () {
        ModalService.open({
            templateUrl: "modalConfigBasedOnRatings.html",
            size: 'lg',
            rendered: function () {
                App.initComponents();
            },
            controllerAs: 'mdlConfigIndAmountCtrl',
            controller: function (toastr, $scope, $uibModalInstance) {

                $scope.save = function () {
                    //console.log("Press Ok")
                    $uibModalInstance.close();
                };

                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
            },
            resolve: {}
        });
    };

    $scope.partyA = {};
    $scope.partyB = {};
    
    $scope.$watchCollection('BACSA.partyA', function (newValue, oldValue) {
        if (newValue !== oldValue){
            var BA = BillAgreementData.getBillateralAgreement();
            $scope.partyA.thresholdCurrencyPartyA     =newValue.thresholdBaseCurrency  ;
            $scope.partyA.partyAThreshold             =newValue.threshold  ;
            $scope.partyA.minimumTransferAmountCurrencyPartyA = newValue.transfAmountBaseCurrency   ;
            $scope.partyA.minimumTransferAmountPartyA =newValue.minTransfAmount ;
            $scope.partyA.roundingType  = newValue.roundingType;
    

            Object.keys($scope.partyA).forEach(function(v,k){
                    BA[v]  =  $scope.partyA[v];
            });
            BillAgreementData.setBillateralAgreement(BA);
            
        }
    });
    $scope.$watchCollection('BACSA.partyB', function (newValue, oldValue) {
        if (newValue !== oldValue){
            var BA = BillAgreementData.getBillateralAgreement();
            $scope.thresholdCurrencyPartyB =  newValue.thresholdBaseCurrency;
            $scope.partyBThreshold  = newValue.threshold;
            $scope.minimumTransferAmountCurrencyPartyB = newValue.transfAmountBaseCurrency ;
            $scope.minimumTransferAmountPartyB  = newValue.minTransfAmount ;
    

            Object.keys($scope.partyB).forEach(function(v,k){
                    BA[v]  =  $scope.partyB[v];
            });
            BillAgreementData.setBillateralAgreement(BA);
            
        }
    });

}]);

DashboardApp.controller('BAEligibleCurrenciesController', ['ModalService', '$scope', '$request', '$interval', '$filter', function (ModalService, $scope, $request, $interval, $filter) {

 
    var _that = this;
    var currenciesList = $filter('orderBy')($scope.BilateralAgreements.staticData.currencies, 'codigo');
    var supportedindexes = $scope.BilateralAgreements.staticData.supportedindexes;

    angular.forEach(supportedindexes,function(value,k){
              value["code"] = value.name.slice(0,value.name.indexOf("-"));
    });
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
                $scope.baseCurrency  = {};
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
                    $scope.baseCurrency.id = params.currency;
                    $scope.baseCurrency.codigo = params.currency;
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
                $scope.supportedindexesListCopy = $scope.supportedindexesList;
                $scope.changeCurrency = function(){
                    let keepLooking =  true; 
                    $scope.supportedindexesList .forEach(function(v,k){
                        if(keepLooking){
                            if(v.code==$scope.baseCurrency.codigo){
                                keepLooking = false; 
                                $scope.supportedindexesList= $scope.supportedindexesListCopy.filter(function(v){ return $scope.baseCurrency.codigo==v.code})
                            }
                            else{
                                  $scope.supportedindexesList = $scope.supportedindexesListCopy;
                            }
                        }
                        
                    });
                };
                $scope.changeCurrency();
                $scope.save = function () {
                    //console.log("Press Ok")

                    if(editing === true)
                    {
                        _that.gridOptions.data.splice(_that.gridOptions.data.indexOf(params),1);
                    }

                    if (!$scope.baseCurrency) {
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
                        currency: $scope.baseCurrency.codigo,
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
        this.gridOptions.data = $scope.parameters.BilateralContract.eligibleCurrencyConfigPartyA.eligibleCurrenciesList;
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
//Factory to Share BillateralContract Data betw
DashboardApp.factory('BillAgreementData',function(){
var data = {
    BillateralAgreement: {}
};
    return {
            getBillateralAgreement: function () {
                return data.BillateralAgreement;
            },
            setBillateralAgreement: function (billAgreement) {
                data.BillateralAgreement = billAgreement;
            }
        };

});