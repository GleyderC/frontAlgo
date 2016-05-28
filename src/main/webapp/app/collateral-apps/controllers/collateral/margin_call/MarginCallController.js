'use strict';

var DashboardApp = angular.module('DashboardApp')

DashboardApp
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
						
						
						function($scope, $document, $timeout, $request,$interval,
								$localStorage, elementService,uiGridConstants ) {

							$scope.$on('$includeContentLoaded', function() {

							});
							$scope.status = {};
							$scope.statusList = [ {
								name : "Awaiting Response"
							}, {
								name : "Awaiting Call"
							}, {
								name : "Computed"
							}, {
								name : "Completed"
							}, {
								name : "Disputed"
							} ];
							$scope.type = {};
							$scope.typeList = [ {
								name : "CSA - SCSA"
							}, {
								name : "REPO"
							}, {
								name : "SEC Lending"
							}, {
								name : "CCP"
							}
							 ];
							
					
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

							$scope.gridOptions = {

								enableFiltering : true,
								onRegisterApi : function(gridApi) {
									$scope.gridApi = gridApi;
								},
								columnDefs : [
										{
											name : 'Principal',
											field : 'principal',
//											field : 'counterpartyA.name',
											headerCellClass : $scope.highlightFilteredHeader,
											filter : {
												type : uiGridConstants.filter.SELECT,
												selectOptions : $scope.counterPartyAList

											},
										},
										{
											name : 'Counter Party',
											field : "counterparty",
//											field : 'counterpartyB.name',
											filter : {
												type : uiGridConstants.filter.SELECT,
												selectOptions : $scope.counterPartyBList

											},
										},

										{

											name : ' Type',
											field : 'contractType',
											filter : {
												type : uiGridConstants.filter.SELECT,
												selectOptions : $scope.contractTypeList,
												condition : function(
														searchTerm, cellValue) {
													return cellValue === searchTerm;
												}
											}
										},
										{
											name : 'Currency',
											field : 'currency',
											filter : {
												type : uiGridConstants.filter.SELECT,
												selectOptions : [ {
													value : '1',
													label : 'EUR'
												}, {
													value : '2',
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
											name : 'Action required',
											cellTemplate : '<ul> <li class="list-group-item" >Yes</li><li class="list-group-item">No</li></ul>',
											enableFiltering : false
										},
										{
											name : 'VM',
											field : 'vm',
											enableFiltering : false
										},
										{
											name : 'IM',
											field : 'im',
											enableFiltering : false
										},
										{
											name : 'Actions',
											cellTemplate : ' <button class="btn btn-sm btn-primary uigrid-btn" ><i class="fa fa-eye"></i></button>',
											enableColumnMenu : false,
											width : 160,
											enableFiltering : false,
											enableSorting : false
										}

								],
								rowHeight : 45,
								enableGridMenu : true,
								exporterCsvFilename : 'Margin_Call.csv',
								exporterPdfDefaultStyle : {
									fontSize : 9
								},
								exporterPdfTableStyle : {
									margin : [ 30, 30, 30, 30 ]
								},
								exporterPdfTableHeaderStyle : {
									fontSize : 10,
									bold : true,
									italics : true,
									color : 'red'
								},
								exporterPdfHeader : {
									text : "Margin Call ",
									style : 'headerStyle'
								},
								exporterPdfFooter : function(currentPage,
										pageCount) {
									return {
										text : currentPage.toString() + ' of '
												+ pageCount.toString(),
										style : 'footerStyle'
									};
								},
								exporterPdfCustomFormatter : function(
										docDefinition) {
									docDefinition.styles.headerStyle = {
										fontSize : 22,
										bold : true
									};
									docDefinition.styles.footerStyle = {
										fontSize : 10,
										bold : true
									};
									return docDefinition;
								},
								exporterPdfOrientation : 'Portrait',
								exporterPdfPageSize : 'LETTER',
								exporterPdfMaxGridWidth : 500,
								exporterCsvLinkElement : angular
										.element(document
												.querySelectorAll(".custom-csv-link-location")),
								onRegisterApi : function(gridApi) {
									$scope.gridApi = gridApi;
									$interval(function() {
										$scope.gridApi.core
												.handleWindowResize();
									}, 1000, 10);
								}
							};
						$scope.gridData = [{
							principal: "Test",
							counterparty : "counter test",
							vm : "Vm test",
							im : "im test",
							currency : "EUR",
							contractType : "CSA"
							
								
						}];
						$scope.today = function() {
						    $scope.dt = new Date();
						  };
						  $scope.today();

						  $scope.clear = function() {
						    $scope.dt = null;
						  };

						  $scope.inlineOptions = {
						    customClass: getDayClass,
						    minDate: new Date(),
						    showWeeks: true
						  };



						  $scope.dateOptions = {
						    dateDisabled: false,
						    formatYear: 'yy',
						    maxDate: new Date(2020, 5, 22),
						    minDate: new Date(),
						    startingDay: 1
						  };

						  $scope.toggleMin = function() {
						    $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
						    $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
						  };

						  $scope.toggleMin();


						  $scope.openDatePicker = function() {
						    $scope.popup.opened = true;
						  };

						  $scope.setDate = function(year, month, day) {
						    $scope.dt = new Date(year, month, day);
						  };

						  $scope.formats = [, 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
						  $scope.format = $scope.formats[0];
						  $scope.altInputFormats = ['M!/d!/yyyy'];

						  $scope.popup = {
						    opened: false
						  };

						  var tomorrow = new Date();
						  tomorrow.setDate(tomorrow.getDate() + 1);
						  var afterTomorrow = new Date();
						  afterTomorrow.setDate(tomorrow.getDate() + 1);
						  $scope.events = [
						    {
						      date: tomorrow,
						      status: 'full'
						    },
						    {
						      date: afterTomorrow,
						      status: 'partially'
						    }
						  ];

						  function getDayClass(data) {
						    var date = data.date,
						      mode = data.mode;
						    if (mode === 'day') {
						      var dayToCheck = new Date(date).setHours(0,0,0,0);

						      for (var i = 0; i < $scope.events.length; i++) {
						        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

						        if (dayToCheck === currentDay) {
						          return $scope.events[i].status;
						        }
						      }
						    }
						  }

						
						} ]);
