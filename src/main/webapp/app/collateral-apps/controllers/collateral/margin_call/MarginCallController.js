'use strict';

var DashboardApp = angular.module('DashboardApp')
var MarginCallCtrl = DashboardApp
    .controller(
        'MarginCallController',
        [
            '$scope',
            '$document',
            '$timeout',
            '$request',
            '$interval',
            'localStorageService',
            'elementService',
            'uiGridConstants',
            'MarginCallService',
            function ($scope, $document, $timeout, $request,
                      $interval, $localStorage, elementService,
                      uiGridConstants, MarginCallService) {

                $scope.$on('$includeContentLoaded', function () {

                });
                $scope.workspaceTabs = {
                    name: 'margin-call-tabs',
                    active: true,
                    tabList: [{
                        head: {
                            icon: 'fa fa-home',
                            text: 'Main'
                        },
                        templateUrl: paths.views
                        + "/collateral/margin_call/main.html",
                        active: true
                    }]
                };
                $scope.currentMarginCall = {};
                $scope.setCurrentMarginCall = function (MarginCallEntity) {
                    $scope.currentMarginCall = MarginCallEntity;
                };
                $scope.viewMarginCall = function (value) {
                    $scope.gridApi.selection.getSelectedRows();
                    $scope.setCurrentMarginCall(value);
                    $scope.workspaceTabs.addTab({
                            head: {
                                icon: 'icon-call-in font-dark font-green-haze',
                                text: 'Margin call ('
                                + value.contract.counterpartyA.name
                                + ')',
                            },
                            templateUrl: paths.views
                            + "/collateral/margin_call/margin_call_detail.html",
                            closable: true,
                            resolve: {
                                formData: [
                                    {
                                        type: "text",
                                        id: "le-bilateral-ag-call-issuance",
                                        value: "Demo"
                                    }
                                ]
                            }
                        });

                };
                $scope.contractTypeList = [];
                $scope.counterPartyAList = [];
                $scope.counterPartyBList = [];
                $scope.gridOptions = {

                    enableFiltering: true,
                    data: $scope.gridData,
                    columnDefs: [
                        {
                            name: 'Principal',
                            field: 'contract.counterpartyA.name',
                            headerCellClass: $scope.highlightFilteredHeader,
                            filter: {
                                type: uiGridConstants.filter.SELECT,
                                selectOptions: $scope.counterPartyAList

                            },
                        },
                        {
                            name: 'Fund/Clearing Broker',
                            field: 'ccpName',
                            enableFiltering: false

                        },
                        {
                            name: 'Counter Party',
                            field: "contract.counterpartyB.name",
                            filter: {
                                type: uiGridConstants.filter.SELECT,
                                selectOptions: $scope.counterPartyBList
                            },
                        },
                        {
                            name: 'Contract Type',
                            field: 'contract.contractType',
                            width: 140,
                            filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div modal-types></div></div>'

                        },
                        {
                            name: 'Currency',
                            field: 'contract.baseCurrency',
                            filter: {
                                type: uiGridConstants.filter.SELECT,
                                selectOptions: [{
                                    value: 'EUR',
                                    label: 'EUR'
                                }, {
                                    value: 'USD',
                                    label: 'USD'
                                }
                                ],
                                condition: function (searchTerm, cellValue) {
                                    return cellValue === searchTerm;
                                }
                            }
                        },
                        {
                            name: 'Status',
                            field: "marginCalls[0].status",
                            filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div modal-status></div></div>'

                        },
                        {
                            name: 'VM',
                            field: 'marginCallAmount',
                            enableFiltering: false
                        },
                        {
                            name: 'IM',
                            enableFiltering: false,
                            width: 80
                        },
                        {
                            name: 'Action buttons',
                            cellTemplate: '<div class="text-center"> <button class="btn btn-sm btn-primary uigrid-btn" ng-click="grid.appScope.viewMarginCall(row.entity)" ><i class="fa fa-eye"></i></button> </div>',
                            enableColumnMenu: false,
                            width: 120,
                            enableFiltering: false,
                            enableSorting: false
                        }

                    ],
                    rowHeight: 45,
                    enableGridMenu: true,
                    onRegisterApi: function (gridApi) {
                        $scope.gridApi = gridApi;
                    }
                };

                $scope.today = function () {
                    $scope.dt = new Date();
                };
                $scope.today();
                $scope.clear = function () {
                    $scope.dt = null;
                };
                $scope.inlineOptions = {
                    customClass: getDayClass,
                    minDate: new Date(),
                    showWeeks: true
                };

                $scope.dateOptions = {
                    dateDisabled: disabled,
                    formatYear: 'yy',
                    maxDate: new Date(2020, 5, 22),
                    minDate: new Date(),
                    startingDay: 1
                };

                $scope.toggleMin = function () {

                    $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null
                        : new Date();
                    $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
                };

                $scope.toggleMin();

                $scope.openDatePicker = function () {
                    $scope.popup.opened = true;
                };

                $scope.setDate = function (year, month, day) {
                    $scope.dt = new Date(year, month, day);
                };

                $scope.formats = [, 'yyyy/MM/dd', 'dd.MM.yyyy',
                    'shortDate'];
                $scope.format = $scope.formats[0];
                $scope.altInputFormats = ['M!/d!/yyyy'];

                $scope.popup = {
                    opened: false
                };

                var tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                var afterTomorrow = new Date();
                afterTomorrow.setDate(tomorrow.getDate() + 1);
                $scope.events = [{
                    date: tomorrow,
                    status: 'full'
                }, {
                    date: afterTomorrow,
                    status: 'partially'
                }];

                function disabled(data) {
                    var date = data.date, mode = data.mode;
                    return mode === 'day'
                        && (date.getDay() === 0 || date
                            .getDay() === 6);
                }

                function getDayClass(data) {
                    var date = data.date, mode = data.mode;
                    if (mode === 'day') {
                        var dayToCheck = new Date(date).setHours(0,
                            0, 0, 0);

                        for (var i = 0; i < $scope.events.length; i++) {
                            var currentDay = new Date(
                                $scope.events[i].date)
                                .setHours(0, 0, 0, 0);

                            if (dayToCheck === currentDay) {
                                return $scope.events[i].status;
                            }
                        }
                    }
                };
                $scope.dateChange = function($$scope){
                	 MarginCallService.getByDate(moment($$scope.dt).format("YYYY-MM-DD")).success(function(data){
                      	$scope.onResponse(data);
                      });
                }
                $scope.onResponse =    function (data) {
                	console.log(data);
                    var arr = {};
                    arr["contractType"] = {};
                    arr["counterpartyB"] = {};
                    arr["counterpartyA"] = {};
                    
                    data.dataResponse.forEach(function (v, k) {
                            if (v.contract.hasOwnProperty("clearingMemberLegalEntity")) {// CCPHouseAccount

                                v.contract["counterpartyA"] = {};
                                v.contract["counterpartyA"] = v.contract.clearingMemberLegalEntity;
                                v.contract["counterpartyB"] = {};
                                v.contract["counterpartyB"]["name"] = v.contract.ccpName;
                            }
                            if (v.contract.hasOwnProperty("client") && v.contract.hasOwnProperty("clearingBroker")) {
                                v.contract["counterpartyA"] = {};
                                v.contract["counterpartyA"] = v.client;
                                v.contract["contractType"] = "CCP Client Clearing";
                                v.contract["ccpName"] = v.clearingBroker.name;
                                v.contract["counterpartyB"] = {};
                                v.contract["counterpartyB"]["name"] = v.contract.ccpName;
                            }

                            if (v.contract.hasOwnProperty("contractType")) {
                            	if(v.contract.contractType.toUpperCase()==="BILATERAL"){
                            		let bilateralContractType = v.contract.bilateralContractType;
                            		v.contract.contractType =  v.contract.bilateralContractType;
                            	}
                            	arr["contractType"][v.marginCalls[0].contractType] = v.marginCalls[0].contractType;
                            	
                            }
                            if (v.contract.hasOwnProperty("counterpartyA")) {
                                arr["counterpartyA"][v.contract.counterpartyA.name] = v.contract.counterpartyA;
                            }
                            if (v.contract.hasOwnProperty("counterpartyB")) {
                                arr["counterpartyB"][v.contract.counterpartyB.name] = v.contract.counterpartyB;
                            }
                        });
                    
                    $scope.gridOptions.data = data.dataResponse;
                    
                    if (Object.keys(arr.contractType).length > 0) {
                        Object.keys(arr.contractType).forEach(function (val, k) {

                            $scope.contractTypeList.push({
                                value: arr.contractType[val],
                                label: arr.contractType[val]
                            })
                        });
                    }
                    if (Object.keys(arr.counterpartyA).length > 0) {
                        Object.keys(arr.counterpartyA).forEach(function (val, k) {
                            $scope.counterPartyAList.push({
                                value: arr.counterpartyA[val].name,
                                label: arr.counterpartyA[val].name
                            })
                        });
                    }
                    if (Object.keys(arr.counterpartyB).length > 0) {
                        Object.keys(arr.counterpartyB).forEach(function (val, k) {
                            $scope.counterPartyBList.push({
                                value: arr.counterpartyB[val].name,
                                label: arr.counterpartyB[val].name
                            })
                        });
                    }
                };
                
                MarginCallService.getByDate(moment().format("YYYY-MM-DD")).success(function(data){
                	$scope.onResponse(data);
                });

            }]);

MarginCallCtrl.controller(
        'modalTypesCtrl',
        [
            '$scope',
            '$compile',
            '$timeout',
            'localStorageService',
            function ($scope, $compile, $timeout, $localStorage) {
                var $elm;
                $scope.listOfTypes = $localStorage
                    .get("BilateralContractType");
                $scope.showModal = function () {
                    $scope.gridOptionsContractType = {
                        data: [],
                        enableColumnMenus: false,
                        onRegisterApi: function (gridApi) {
                            $scope.gridApi = gridApi;
                            if ($scope.colFilter && $scope.colFilter.listTerm) {
                                $timeout(function () {
                                    $scope.colFilter.listTerm.forEach(function (type) {
                                            var entities = $scope.gridOptionsContractType.data.filter(function (row) {
                                                    return row.type === type;
                                                });
                                            if (entities.length > 0) {
                                                $scope.gridApi.selection.selectRow(entities[0]);
                                            }
                                        });
                                });
                            }
                        }
                    };
                    $scope.listOfTypes.forEach(function (contractType) {
                        $scope.gridOptionsContractType.data.push({
                            type: contractType.key
                        });
                    });
                    var html = '<div class="modal" ng-style="{display: \'block\'}"><div class="modal-dialog"><div class="modal-content"><div class="modal-header">Filter Contract Type</div><div class="modal-body"><div id="grid1" ui-grid="gridOptionsContractType" ui-grid-selection class="modalGrid"></div></div><div class="modal-footer"><button id="buttonClose" class="btn btn-primary" ng-click="close()">Filter</button></div></div></div></div>';
                    $elm = angular.element(html);
                    angular.element(document.body).prepend($elm);
                    $compile($elm)($scope);
                };
                $scope.close = function () {
                    var contractTypes = $scope.gridApi.selection
                        .getSelectedRows();
                    $scope.colFilter.listTerm = [];

                    contractTypes.forEach(function (val) {
                        $scope.colFilter.listTerm.push(val.type);
                    });

                    $scope.colFilter.term = $scope.colFilter.listTerm
                        .join(', ');
                    $scope.colFilter.condition = new RegExp(
                        $scope.colFilter.listTerm.join('|'));

                    if ($elm) {
                        $elm.remove();
                    }
                };
            }])
    .directive(
        'modalTypes',
        function () {
            return {
                template: '<label></label><button class="btn btn-default" ng-click="showModal()">Filter</button>',
                controller: 'modalTypesCtrl'
            };
        })
    .controller(
        'modalStatusCtrl',
        function ($scope, $compile, $timeout) {
            var $elm;
            $scope.showStatusModal = function () {
                $scope.listOfStatus = ["Awaiting Response",
                    "Awaiting Call", "Completed", "Computed",
                    "Disputed"];
                $scope.gridStatusFilterOptions = {
                    data: [],
                    enableColumnMenus: false,
                    onRegisterApi: function (gridApi) {
                        $scope.gridApi = gridApi;

                        if ($scope.colFilter
                            && $scope.colFilter.listTerm) {
                            $timeout(function () {
                                $scope.colFilter.listTerm
                                    .forEach(function (status) {
                                        var entities = $scope.gridStatusFilterOptions.data
                                            .filter(function (row) {
                                                return row.status === status;
                                            });

                                        if (entities.length > 0) {
                                            $scope.gridApi.selection
                                                .selectRow(entities[0]);
                                        }
                                    });
                            });
                        }

                    }
                };

                $scope.listOfStatus.forEach(function (val) {
                    $scope.gridStatusFilterOptions.data.push({
                        status: val
                    });
                });
                var html = '<div class="modal" ng-style="{display: \'block\'}"><div class="modal-dialog"><div class="modal-content"><div class="modal-header">Filter Status</div><div class="modal-body"><div ng-if="!refresh" id="gridFilter" ui-grid="gridStatusFilterOptions" ui-grid-selection class="modalGrid"></div></div><div class="modal-footer"><button id="buttonClose" class="btn btn-primary" ng-click="close()">Filter</button></div></div></div></div>';
                $elm = angular.element(html);
                angular.element(document.body).prepend($elm);
                $compile($elm)($scope);

            };

            $scope.close = function () {
                var status = $scope.gridApi.selection.getSelectedRows();
                $scope.colFilter.listTerm = [];

                status.forEach(function (val) {
                    $scope.colFilter.listTerm.push(val.status);
                });

                $scope.colFilter.term = $scope.colFilter.listTerm
                    .join(', ');
                $scope.colFilter.condition = new RegExp(
                    $scope.colFilter.listTerm.join('|'));
                if ($elm) {
                    $elm.remove();
                }

            };
        })
    .directive(
        'modalStatus',
        function () {
            return {
                template: '<label>{{colFilter.term}}</label><button class="btn btn-default" ng-click="showStatusModal()">Filter</button>',
                controller: 'modalStatusCtrl'
            };
        });
