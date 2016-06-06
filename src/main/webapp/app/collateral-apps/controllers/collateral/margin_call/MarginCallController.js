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

						function($scope, $document, $timeout, $request,
								$interval, $localStorage, elementService,
								uiGridConstants) {

							$scope.$on('$includeContentLoaded', function() {

							});

							$scope.workspaceTabs = {
								name : 'margin-call-tabs',
								active : true,
								tabList : [ {
									head : {
										icon : 'fa fa-home',
										text : 'Main'
									},
									templateUrl : paths.views
											+ "/collateral/margin_call/main.html",
									active : true
								} ]
							};
							$scope.gridData = [ {
								"counterpartyA" : {
									"id" : 1563412744,
									"name" : "Demo Bank"
								},
								"counterpartyB" : {
									"id" : 423287131,
									"name" : "J.P. MORGAN"
								},
								"ccpName" : "SwapClear",
								"marginFrequency" : "DAILY",
								"contractType" : "CSA_MARGINED",
								"vm" : "1200 EUR",
								"currency" : "EUR",
								"status" : "Awaiting Response"

							}, {
								"counterpartyA" : {
									"id" : 1563412744,
									"name" : "Demo Bank",
									"otherName" : "DEMO"
								},
								"counterpartyB" : {
									"id" : 423287131,
									"name" : "J.P. MORGAN",
									"otherName" : "JPMORGAN"
								},
								"vm" : "10000 EUR",
								"currency" : "EUR",
								"status" : "Awaiting Call",
								"partyBPaysVm" : false,
								"marginFrequency" : "WEEKLY",
								"contractType" : "CSA_MARGINED"
							}, {
								"counterpartyA" : {
									"id" : 1563412744,
									"name" : "Demo Bank",
									"riskProfile" : {
										"SPRating" : "Unrated",
										"riskWeight" : 0,
										"cdsSpreadArrayList" : []
									},
									"countryId" : -1,
									"financialCalendarList" : []
								},
								"counterpartyB" : {
									"id" : 423287131,
									"name" : "J.P. MORGAN",
									"otherName" : "JPMORGAN"
								},
								"ccpName" : "BmeClearing",
								"currency" : "EUR",
								"partyBPaysVm" : false,
								"marginFrequency" : "WEEKLY",
								"contractType" : "SCSA_MARGINED",
								"callDay" : 0
							} ];
							$scope.gridOptions = {

								enableFiltering : true,
								onRegisterApi : function(gridApi) {
									$scope.gridApi = gridApi;
								},
								data : $scope.gridData,
								columnDefs : [
										{
											name : 'Principal',
											field : 'counterpartyA.name',
											headerCellClass : $scope.highlightFilteredHeader,
											filter : {
												type : uiGridConstants.filter.SELECT,
												selectOptions : $scope.counterPartyAList

											},
										},
										 {
						                    name : 'Fund/Clearing Broker',
						                    field: 'ccpName',
						                    enableFiltering:false	
						                    
						                },
										{
											name : 'Counter Party',
											field : "counterpartyB.name",
											filter : {
												type : uiGridConstants.filter.SELECT,
												selectOptions : $scope.counterPartyBList

											},
										},
										{

											name : 'Contract Type',
											field : 'contractType',
											width : 140,
											filterHeaderTemplate : '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div modal-types></div></div>'
										
										},

										{
											name : 'Currency',
											field : 'currency',
											filter : {
												type : uiGridConstants.filter.SELECT,
												selectOptions : [ {
													value : 'EUR',
													label : 'EUR'
												}, {
													value : 'USD',
													label : 'USD'
												}

												],
												condition : function(
														searchTerm, cellValue) {
													return cellValue === searchTerm;
												}
											}
										},

										{
											name : 'Status',
											field : "status",
											filterHeaderTemplate : '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div modal-status></div></div>'

										},
										{
											name : 'VM',
											field : 'vm',
											enableFiltering : false
										},
										{
											name : 'IM',
											enableFiltering : false,
											width:80
										},
										{
											name : 'Action buttons',
											cellTemplate : '<div class="text-center"> <button class="btn btn-sm btn-primary uigrid-btn" ><i class="fa fa-eye"></i></button> </div>',
											enableColumnMenu : false,
											width : 120,
											enableFiltering : false,
											enableSorting : false
										}

								],
								rowHeight : 45,
								enableGridMenu : true,
								onRegisterApi : function(gridApi) {
									$scope.gridApi = gridApi;
									$interval(function() {
										$scope.gridApi.core
												.handleWindowResize();
									}, 1000, 10);
								}
							};

							$scope.today = function() {
								$scope.dt = new Date();
							};
							$scope.today();

							$scope.clear = function() {
								$scope.dt = null;
							};

							$scope.inlineOptions = {
								customClass : getDayClass,
								minDate : new Date(),
								showWeeks : true
							};

							$scope.dateOptions = {
								dateDisabled : disabled,
								formatYear : 'yy',
								maxDate : new Date(2020, 5, 22),
								minDate : new Date(),
								startingDay : 1
							};

							$scope.toggleMin = function() {

								$scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null
										: new Date();
								$scope.dateOptions.minDate = $scope.inlineOptions.minDate;
							};

							$scope.toggleMin();

							$scope.openDatePicker = function() {
								$scope.popup.opened = true;
							};

							$scope.setDate = function(year, month, day) {
								$scope.dt = new Date(year, month, day);
							};

							$scope.formats = [ , 'yyyy/MM/dd', 'dd.MM.yyyy',
									'shortDate' ];
							$scope.format = $scope.formats[0];
							$scope.altInputFormats = [ 'M!/d!/yyyy' ];

							$scope.popup = {
								opened : false
							};

							var tomorrow = new Date();
							tomorrow.setDate(tomorrow.getDate() + 1);
							var afterTomorrow = new Date();
							afterTomorrow.setDate(tomorrow.getDate() + 1);
							$scope.events = [ {
								date : tomorrow,
								status : 'full'
							}, {
								date : afterTomorrow,
								status : 'partially'
							} ];

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
							}

							$scope.$watch("dt", function(newValue, oldValue) {
								console.log("I've changed : ", newValue);
							});

						} ]);

MarginCallCtrl
		.controller(
				'modalTypesCtrl',
				[ '$scope','$compile','$timeout','localStorageService',function($scope, $compile, $timeout,$localStorage) {
					var $elm;
					$scope.listOfTypes  =$localStorage.get("BilateralContractType");
					$scope.showModal = function() {
						$scope.gridOptions = {
								data : [],
								enableColumnMenus : false,
								onRegisterApi : function(gridApi) {
									$scope.gridApi = gridApi;

									if ($scope.colFilter
											&& $scope.colFilter.listTerm) {
										$timeout(function() {
											$scope.colFilter.listTerm
													.forEach(function(type) {
														var entities = $scope.gridOptions.data
																.filter(function(
																		row) {
																	return row.type === type;
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
						$scope.listOfTypes.forEach(function(contractType) {
							$scope.gridOptions.data.push({
								type : contractType.key
							});
						});
						var html = '<div class="modal" ng-style="{display: \'block\'}"><div class="modal-dialog"><div class="modal-content"><div class="modal-header">Filter Contract Type</div><div class="modal-body"><div id="grid1" ui-grid="gridOptions" ui-grid-selection class="modalGrid"></div></div><div class="modal-footer"><button id="buttonClose" class="btn btn-primary" ng-click="close()">Filter</button></div></div></div></div>';
						$elm = angular.element(html);
						angular.element(document.body).prepend($elm);
						$compile($elm)($scope);
					};
					$scope.close = function() {
						var contractTypes = $scope.gridApi.selection.getSelectedRows();
						$scope.colFilter.listTerm = [];

						contractTypes.forEach(function(val) {
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
				} ])
		.directive(
				'modalTypes',
				function() {
					return {
						template : '<label></label><button class="btn btn-default" ng-click="showModal()">Filter</button>',
						controller : 'modalTypesCtrl'
					};
				})
		.controller(
				'modalStatusCtrl',
				function($scope, $compile, $timeout) {
					var $elm;
					$scope.showStatusModal = function() {
						$scope.listOfStatus = [ "Awaiting Response",
								"Awaiting Call", "Completed", "Computed",
								"Disputed" ];
						$scope.gridOptions = {
							data : [],
							enableColumnMenus : false,
							onRegisterApi : function(gridApi) {
								$scope.gridApi = gridApi;

								if ($scope.colFilter
										&& $scope.colFilter.listTerm) {
									$timeout(function() {
										$scope.colFilter.listTerm
												.forEach(function(status) {
													var entities = $scope.gridOptions.data
															.filter(function(
																	row) {
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

						$scope.listOfStatus.forEach(function(val) {
							$scope.gridOptions.data.push({
								status : val
							});
						});

						var html = '<div class="modal" ng-style="{display: \'block\'}"><div class="modal-dialog"><div class="modal-content"><div class="modal-header">Filter Status</div><div class="modal-body"><div id="grid1" ui-grid="gridOptions" ui-grid-selection class="modalGrid"></div></div><div class="modal-footer"><button id="buttonClose" class="btn btn-primary" ng-click="close()">Filter</button></div></div></div></div>';
						$elm = angular.element(html);
						angular.element(document.body).prepend($elm);
						$compile($elm)($scope);

					};

					$scope.close = function() {
						var status = $scope.gridApi.selection.getSelectedRows();
						$scope.colFilter.listTerm = [];

						status.forEach(function(val) {
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
				function() {
					return {
						template : '<label>{{colFilter.term}}</label><button class="btn btn-default" ng-click="showStatusModal()">Filter</button>',
						controller : 'modalStatusCtrl'
					};
				});
