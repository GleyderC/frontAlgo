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
							function buildBilateralContractTypeList(){
								var list=  $localStorage.get("BilateralContractType");
								var buildList  = [];
								list.forEach(function(v,k){
									buildList.push({na: v.key ,  value:v.key}); 
								});
								console.log(buildList);
								return buildList;
							}
							$scope.typeList = $localStorage.get("BilateralContractType");
					
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
							$scope.gridData = [
							                   {
							                	    "counterpartyA": {
							                	      "id": 1563412744,
							                	      "name": "Demo Bank"
							                	    },
							                	    "counterpartyB": {
							                	      "id": 423287131,
							                	      "name": "J.P. MORGAN"
							                	    },
							                	    "marginFrequency": "DAILY",
							                	    "contractType": "CSA_MARGINED",
							                	    "vm": "1200 EUR",
							                	    "currency": "EUR",
							                	    "status" : "Awaiting Response"
							                	   
							                	  },
							                	  {
							                	    "counterpartyA": {
							                	      "id": 1563412744,
							                	      "name": "Demo Bank",
							                	      "otherName": "DEMO"
							                	    },
							                	    "counterpartyB": {
							                	      "id": 423287131,
							                	      "name": "J.P. MORGAN",
							                	      "otherName": "JPMORGAN"
							                	    },
							                	    "vm": "10000 EUR",
							                	    "currency": "EUR",
							                	    "status" : "Awaiting Call",
							                	    "partyBPaysVm": false,
							                	    "marginFrequency": "WEEKLY",
							                	    "contractType": "CSA_MARGINED"
							                	  },
							                	  {
							                	    "counterpartyA": {
							                	      "id": 1563412744,
							                	      "name": "Demo Bank",
							                	      "riskProfile": {
							                	        "SPRating": "Unrated",
							                	        "riskWeight": 0,
							                	        "cdsSpreadArrayList": []
							                	      },
							                	      "countryId": -1,
							                	      "financialCalendarList": []
							                	    },
							                	    "counterpartyB": {
							                	      "id": 423287131,
							                	      "name": "J.P. MORGAN",
							                	      "otherName": "JPMORGAN"
							                	    },
							                	    "currency": "EUR",
							                	    "partyBPaysVm": false,
							                	    "marginFrequency": "WEEKLY",
							                	    "contractType": "SCSA_MARGINED",
							                	    "callDay": 0
							                	  }
							                	];
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
												type : 	uiGridConstants.filter.SELECT,
												selectOptions : $scope.counterPartyAList

											},
										},
										{

											name : ' Type',
											field : 'contractType',
											enableFiltering : false
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
											enableFiltering : false
										},
										{
											name : 'VM',
											field : 'vm',
											enableFiltering : false
										},
										{
											name : 'IM',
											enableFiltering : false
										},
										{
											name : 'Action buttons',
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
						    dateDisabled: disabled,
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

						  function disabled(data) {
							    var date = data.date,
							      mode = data.mode;
							    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
							}
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

						  $scope.$watch("dt", function(newValue, oldValue) {
						      console.log("I've changed : ",newValue );
						  });
						
						} ]);
