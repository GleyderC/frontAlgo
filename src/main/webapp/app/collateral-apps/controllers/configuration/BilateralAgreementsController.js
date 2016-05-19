'use strict';

var DashboardApp = angular.module('DashboardApp')

DashboardApp.controller(
    'BilateralAgreementsController', [
        '$scope',
        '$document',
        '$timeout',
        '$request',
        'localStorageService',
        'DTOptionsBuilder',
        'DTColumnBuilder',
        'elementService',
        function ($scope,
                  $document,
                  $timeout,
                  $request,
                  $localStorage,
                  DTOptionsBuilder,
                  DTColumnBuilder,
                  elementService) {

            $scope.$on('$includeContentLoaded', function () {

            });

            $scope.workspaceTabs = {
                name: 'collateral-tabs',
                active: 0,
                tabList: []
            };

            $scope.addNewBillateralAgreement = function () {

                $scope.workspaceTabs.tabList.push(
                    {
                        head: {
                            icon: '',
                            text: 'New Billateral Agreement(' + ($scope.workspaceTabs.tabList.length + 1) + ')'
                        },
                        templateUrl: paths.views + "/configuration/BilateralAgreements/index.html",
                        closable: true
                    }
                );

            };

            $scope.editBillateralAgreement = function () {

                $scope.workspaceTabs.tabList.push(
                    {
                        head: {
                            icon: '',
                            text: 'Editing Billateral Agreement (' + ($scope.workspaceTabs.tabList.length + 1) + ')'
                        },
                        templateUrl: paths.views + "/configuration/BilateralAgreements/index.html",
                        closable: true
                    }
                );

            };

        }]);


DashboardApp.controller(
    'BAFormController', [
        '$scope',
        '$document',
        '$timeout',
        '$request',
        'localStorageService',
        'DTOptionsBuilder',
        'DTColumnBuilder',
        function ($scope,
                  $document,
                  $timeout,
                  $request,
                  $localStorage,
                  DTOptionsBuilder,
                  DTColumnBuilder) {

            $scope.$on('$includeContentLoaded', function () {

            });

            console.log($scope.$parent.workspaceTabs.active)

            $scope.workspaceTabs = {
                name: 'collateral-tabs',
                active: 0,
                tabList: [
                    {
                        head: {
                            icon: 'glyphicon-blackboard',
                            text: 'Main'
                        },
                        templateUrl: paths.views + "/configuration/BilateralAgreements/le_bilateral_a_main.html"
                    },
                    {
                        head: {
                            icon: 'glyphicon-list-alt',
                            text: 'CSA Margin'
                        },
                        templateUrl: paths.views + "/configuration/BilateralAgreements/le_bilateral_a_csa_margins.html"
                    },
                    {
                        head: {
                            icon: 'glyphicons-piggy-bank',
                            text: 'Eligible currencies'
                        },
                        templateUrl: paths.views + "/configuration/BilateralAgreements/le_bilateral_a_elegible_currencies.html"
                    },
                    {
                        head: {
                            icon: 'glyphicon-eye-open',
                            text: 'Eligible securities'
                        },
                        templateUrl: paths.views + "/configuration/BilateralAgreements/le_bilateral_a_elegible_securities.html"
                    }
                ]
            };

        }]);

DashboardApp.controller('LEBillateralAgrElegibleCurrenciesController', function($scope, $compile, DTOptionsBuilder, DTColumnBuilder){

        var vm = this;
        vm.message = '';
        vm.edit = edit;
        vm.delete = deleteRow;
        vm.dtInstance = {};
        vm.persons = {};
        vm.dtOptions = DTOptionsBuilder.fromSource('data1.json')
            .withPaginationType('full_numbers')
            .withOption('createdRow', createdRow);
        vm.dtColumns = [
            DTColumnBuilder.newColumn('id').withTitle('ID'),
            DTColumnBuilder.newColumn('firstName').withTitle('First name'),
            DTColumnBuilder.newColumn('lastName').withTitle('Last name'),
            DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable()
                .renderWith(actionsHtml)
        ];

        function edit(person) {
            vm.message = 'You are trying to edit the row: ' + JSON.stringify(person);
            // Edit some data and call server to make changes...
            // Then reload the data so that DT is refreshed
            vm.dtInstance.reloadData();
        }
        function deleteRow(person) {
            vm.message = 'You are trying to remove the row: ' + JSON.stringify(person);
            // Delete some data and call server to make changes...
            // Then reload the data so that DT is refreshed
            vm.dtInstance.reloadData();
        }
        function createdRow(row, data, dataIndex) {
            // Recompiling so we can bind Angular directive to the DT
            $compile(angular.element(row).contents())($scope);
        }
        function actionsHtml(data, type, full, meta) {
            vm.persons[data.id] = data;
            return '<button class="btn btn-warning" ng-click="showCase.edit(showCase.persons[' + data.id + '])">' +
                '   <i class="fa fa-edit"></i>' +
                '</button>&nbsp;' +
                '<button class="btn btn-danger" ng-click="showCase.delete(showCase.persons[' + data.id + '])" )"="">' +
                '   <i class="fa fa-trash-o"></i>' +
                '</button>';
        }

});

