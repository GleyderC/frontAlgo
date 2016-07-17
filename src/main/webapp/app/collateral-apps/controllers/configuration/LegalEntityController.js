'use strict';

var DashboardApp = angular.module('DashboardApp');


DashboardApp.controller('SearchLegalEntityController', ['LegalEntityService', '$scope', 'elementService',
    '$timeout', 'localStorageService', 'uiGridConstants',
    function (LegalEntityService, $scope, elementService, $timeout, localStorageService, uiGridConstants) {

        /* Cargando datos en legal entity ui-grid*/

        $scope.gridLegalEntityOptions = {
            showGridFooter: true,
            paginationPageSizes: [12, 50, 100, 200, 500],
            paginationPageSize: 12,
            enableColumnResizing: true,
            enableFiltering: true,
            rowHeight: 35, // set height to each row
            enableGridMenu: true,
            exporterCsvFilename: 'legal_entity.csv',
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
                /*$scope.gridApi.selection.on.rowSelectionChanged($scope,function(row){
                 console.log('row selected ' + row.isSelected);

                 });*/
                /*gridApi.edit.on.afterCellEdit($scope,function(rowEntity, colDef, newValue, oldValue){
                 //console.log('edited row id:' + rowEntity.id + ' Column:' + colDef.name + ' newValue:' + newValue + ' oldValue:' + oldValue );
                 if(newValue!=oldValue)
                 LegalEntityService.set(rowEntity, true);

                 $scope.$apply();
                 });*/
            },
            columnDefs: [
                {field: 'id', enableCellEdit: false, width: 90,},
                {
                    field: 'name', enableCellEdit: false,
                    sort: {
                        direction: uiGridConstants.ASC,
                        priority: 0
                    }
                },
                {field: 'otherName', enableCellEdit: false},
                {
                    field: 'isBranch', name: 'Branch', enableCellEdit: false, width: 70,
                    cellTemplate: "<div>{{grid.appScope.booleanValue(row)}}</div>",
                    filter: {
                        type: uiGridConstants.filter.SELECT,
                        selectOptions: [{value: true, label: 'Yes'}, {value: false, label: 'No'}]
                    },

                },
                {field: 'namemotherLegalEntity', name: 'Mother', enableCellEdit: false},
                /*{   name: 'Country',
                 field: 'countryId.name',
                 editModelField: 'countryId',
                 editableCellTemplate: paths.tpls + '/UiSelect.html'$scope.country.selected,
                 editDropdownOptionsArray : $scope.countries
                 },*/
                {field: 'LEI', enableCellEdit: false},
                {field: 'BIC', enableCellEdit: false},
                {
                    field: 'rolList',
                    displayName: 'Roles',
                    cellFilter: 'stringArrayFilter',
                    enableCellEdit: false
                },
                {
                    name: 'Actions',
                    cellTemplate: paths.tpls + '/ActionsButtonsTpl.html',
                    enableColumnMenu: false,
                    enableCellEdit: false,
                    width: 120,
                    enableFiltering: false
                }
            ]
        };

        LegalEntityService.getAll().then(function (result) {
            $scope.legalEntities = result.data.dataResponse;
            /*$scope.legalEntities.forEach(function(legal){
             var country = $scope.countries.filter(function (country) {
             return country.key == legal.countryId;
             });
             legal.countryId = country[0];
             });*/
            $scope.legalEntities.forEach(function (legalEntity) {

                //Insert mother Legal Entity
                var MotherLegal = $scope.legalEntities.filter(function (legal) {
                    if (legal.id == legalEntity.motherLegalEntity)
                        return legal.name;
                    else return "";

                });

                if (MotherLegal[0]) {
                    legalEntity.namemotherLegalEntity = MotherLegal[0].name;
                }
            });
            $scope.gridLegalEntityOptions.data = $scope.legalEntities;

        });

        $scope.addLegalEntity = function (element) {

            if (!element) {
                //toastr.warning('Your computer is about to explode!', 'Warning', {closeButton: true});
                console.log("Problemas al recibir el elemento");
                return false;
            }

            //elementService.collapsePortlet('legal-entity-table');
            //elementService.expandPortlet(element);
            //var offset = $("#" + element).offset().top;
            //elementService.scrollToElement(element, 80);


            $scope.$workspaceTabsMgm.addTab({
                head: {
                    icon: 'fa fa-bank',
                    text: 'New Legal Entity',
                },
                templateUrl: paths.views + "/configuration/le_form_container.html",
                closable: true,
                autoload: true
            }, [3, 1]);

            //buildLegalData();

        }

        // Edit legalEntity
        $scope.editRow = function (grid, row) {

            $scope.$workspaceTabsMgm.addTab({
                head: {
                    icon: 'fa fa-bank',
                    text: 'Editing Legal Entity',
                },
                templateUrl: paths.views + "/configuration/le_form_container.html",
                parameters: {
                    legalEntity: row.entity
                },
                closable: true,
                autoload: true
            }, [3, 1]);

            //elementService.scrollToElement("legal-entity-tabs", 80);
        };

    }]);

DashboardApp.controller('LegalEntityController', ['LegalEntityService', '$scope', 'elementService',
    '$timeout', 'localStorageService', 'uiGridConstants',
    function (LegalEntityService, $scope, elementService, $timeout, localStorageService, uiGridConstants) {

        $scope.$on('$includeContentLoaded', function () {
            App.initAjax();
        });

        $scope.legalEntities = [];

        LegalEntityService.getAll().then(function (result) {
            $scope.legalEntities = result.data.dataResponse;

            $scope.legalEntities.forEach(function (legalEntity) {

                //Insert mother Legal Entity
                var MotherLegal = $scope.legalEntities.filter(function (legal) {
                    if (legal.id == legalEntity.motherLegalEntity)
                        return legal.name;
                    else return "";

                });

                if (MotherLegal[0]) {
                    legalEntity.namemotherLegalEntity = MotherLegal[0].name;
                }
            });

        });

        var financialCalendar = localStorageService.get('FinancialCalendar');
        var i = 0;

        $scope.holidays = {
            searchSelect: true,
            searchSelected: true,
            data: financialCalendar
        };

        $scope.setFocusInput = function (element) {
            //console.log("#"+element+" input:first:not([readonly])");
            $("#" + element + " input:first:not([readonly])").focus();
        }

        $scope.setFocusInput('le-general-data');

        $scope.rols =
        {
            searchSelect: true,
            searchSelected: true,
            data: localStorageService.get('RolType')
        };
        $scope.regulatories_status = ['NFC', 'NFC_PLUS', 'CATEGORY_1', 'CATEGORY_2', 'CATEGORY_3'];
        $scope.country = {};
        $scope.countries = localStorageService.get('CountryEnum');

        //console.log($scope.countries);

        buildLegalData();

        function buildLegalData() {

            $scope.legalEntityMother = {selected: {id: -1}};

            $scope.country = {selected: {id: -1}};

            $scope.legalEntity =
            {
                id: -1,
                name: "",
                otherName: "",
                otherName2: "",
                otherName3: "",
                otherName4: "",
                otherName5: "",
                otherName6: "",
                BIC: "",
                LEI: "",
                isBranch: false,
                motherLegalEntity: -1,
                cdsMarketDataName: "",
                contactPersonList: [],
                rolList: [],
                ccpOwnClientAccounts: [],
                ccpMyClientsAccounts: [],
                rwaMultiplier: 0,
                leverageRatioMultiplier: 0,
                cvaComputes: false,
                riskProfile: {SPRating: "", riskWeight: 0, cdsSpreadArrayList: []},
                countryId: "-1",
                financialCalendarList: []

            };
            $scope.isEditLegal = false;

            //console.log($scope.legalEntities);

        }

        $scope.booleanValue = function (row) {
            return row.entity.isBranch ? 'Yes' : 'No';
        };

        $scope.saveLegalEntity = function (legalEntity) {

            if ($scope.legalEntityMother.selected) {
                legalEntity.motherLegalEntity = $scope.legalEntityMother.selected.id;
                legalEntity.namemotherLegalEntity = $scope.legalEntityMother.selected.name;

            }
            if ($scope.country.selected) {
                //console.log($scope.country.selected);
                legalEntity.countryId = $scope.country.selected.key;
            }


            if (!$scope.isEditLegal) {
                $scope.gridLegalEntityOptions.data.push(legalEntity);
            }
            LegalEntityService.set(legalEntity, $scope.isEditLegal);

            buildLegalData();
        }

        // Delete legalEntity
        $scope.deleteRow = function (grid, row) {

            var index = $scope.gridLegalEntityOptions.data.indexOf(row.entity);
            $scope.gridLegalEntityOptions.data.splice(index, 1);
            LegalEntityService.delete(row.entity.id);

        }

        $scope.cancel = function () {
            buildLegalData();
        }

        //#### Editing a Legal Entity ####
        if (!$scope.parameters.legalEntity)
            return false;

        $scope.legalEntity = $scope.parameters.legalEntity;

        $scope.legalEntityMother = {selected: {id: -1}};
        if ($scope.legalEntity.motherLegalEntity != -1) {
            LegalEntityService.getById($scope.legalEntity.motherLegalEntity).then(function (result) {
                var legalEntityMother = result.data.dataResponse;
                //console.log(legalEntityMother);
                $scope.legalEntityMother.selected = legalEntityMother;
            });
        }

        $scope.holidays.selectedItems = $scope.legalEntity.financialCalendarList;

        $scope.rols.selectedItems = $scope.legalEntity.rolList;

        $scope.country = {selected: {id: -1}};
        var country = $scope.countries.filter(function (country) {
            return country.key == $scope.legalEntity.countryId;
        });
        $scope.country.selected = country[0];

        $scope.isEditLegal = true;

    }]);

DashboardApp.filter('stringArrayFilter', function () {
    return function (myArray) {
        return myArray.join(', ');
    };
});
DashboardApp.filter('mapBranch', function () {
    var branchHash = {
        1: 'Yes',
        2: 'No'
    };
    return function (input) {
        if (!input) {
            return '';
        } else {
            return branchHash[input];
        }
    };
});
DashboardApp.controller('TabsLegalEntityController', ['$scope', function ($scope) {

    $scope.tabs = [
        {
            id: 'le-general-data',
            title: 'General Data',
            templateUrl: 'collateral-apps/views/configuration/LegalEntity/le_general_data.html',
            icon: 'icon-note'
        },
        {
            id: 'le-contact-info',
            title: 'Contact info',
            templateUrl: 'collateral-apps/views/configuration/LegalEntity/le_contact_info.html',
            icon: 'icon-user'
        },
        {
            id: 'le-regulatory',
            title: 'Regulatory Settings',
            templateUrl: 'collateral-apps/views/configuration/LegalEntity/le_regulatory.html',
            icon: ''
        },
        {
            id: 'le-risk-profile',
            title: 'Risk Profiles',
            templateUrl: 'collateral-apps/views/configuration/LegalEntity/le_risk_profile.html',
            icon: ''
        },
        {
            id: 'le-billateral-a',
            title: 'Bilateral agreements',
            templateUrl: 'collateral-apps/views/configuration/LegalEntity/le_billateral_a.html',
            icon: ''
        },
        {
            id: 'le-clearing-a',
            title: 'Clearing agreements',
            templateUrl: 'collateral-apps/views/configuration/LegalEntity/le_clearing_a.html',
            icon: ''
        },
        {
            id: 'le-sdi',
            title: 'SDI',
            templateUrl: 'collateral-apps/views/configuration/LegalEntity/le_sdi.html',
            icon: ''
        }
    ];

}]);

DashboardApp.controller('ContactInfoController', ['$scope', '$log', 'toastr', 'RowEditorModalService', 'uiGridConstants',
    function ($scope, $log, toastr, RowEditorModalService, uiGridConstants) {

        $scope.$watchCollection('$parent.legalEntity.contactPersonList', function (newContactPerson, oldContactPerson) {
            if (newContactPerson === oldContactPerson) {
                return false;
            }
            $scope.gridContactPersonOptions.data = newContactPerson;
            //console.log($scope.gridContactPersonOptions.data);

        });

        //set templateUrl with id modal edit
        RowEditorModalService.templateUrl = 'edit-modal-contact.html';

        /*ui-grid contactPerson*/
        $scope.addRow = function () {
            var newContact = {
                "address": "",
                "city": "",
                "comments": "",
                "contactType": "",
                "countryId": 0,
                "email": "",
                "fax": "",
                "firstName": "",
                "id": -1,
                "idLegalEntity": 0,
                "lastName": "",
                "linkedInProfileUrl": "",
                "phone": "",
                "state": "",
                "swift": "",
                "telex": "",
                "title": "",
                "zipCode": ""
            };
            var rowTmp = {};
            rowTmp.entity = newContact;
            $scope.editRow($scope.gridContactPersonOptions, rowTmp);
        };

        $scope.editRow = RowEditorModalService.editRow;

        $scope.deleteRow = function (grid, row) {

            $scope.gridContactPersonOptions.data.splice(row, 1);
            toastr.success("Data successfully removed", "Success");

        };

        $scope.gridContactPersonOptions = {
            showGridFooter: true,
            paginationPageSizes: [12, 50, 100, 200, 500],
            paginationPageSize: 12,
            enableColumnResizing: true,
            enableFiltering: true,
            rowHeight: 35, // set height to each row
            enableGridMenu: true,
            exporterCsvFilename: 'contact_info.csv',
            exporterPdfDefaultStyle: {fontSize: 9},
            exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
            exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
            exporterPdfHeader: {text: "Contact Person", style: 'headerStyle'},
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
            }
        };

        $scope.gridContactPersonOptions.columnDefs = [
            {
                field: 'lastName',
                sort: {
                    direction: uiGridConstants.ASC,
                    priority: 0
                }
            },
            {field: 'firstName',},
            {field: 'city'},
            {field: 'state'},
            {field: 'phone'},
            {field: 'email'},
            {field: 'swift'},
            {field: 'linkedInProfileUrl', name: "Linkedin",},
            {
                name: 'Actions',
                cellTemplate: paths.tpls + '/ActionsButtonsTpl.html',
                enableColumnMenu: false,
                enableCellEdit: false,
                width: 120,
                enableFiltering: false
            }
        ];

        $scope.contactFilter = function (renderableRows) {
            var matcher = new RegExp($scope.filterValue);
            renderableRows.forEach(function (row) {
                var match = false;
                ['lastName', 'firstName', 'city', 'state', 'phone', 'email', 'swift', 'linkedInProfileUrl'].forEach(function (field) {
                    if (row.entity[field].match(matcher)) {
                        match = true;
                    }
                });
                if (!match) {
                    row.visible = false;
                }
            });
            return renderableRows;
        };

    }]);

DashboardApp.controller('LEBilateralController', ['$scope', '$log', 'toastr', 'RowEditorModalService', 'uiGridConstants', 'LegalEntityService', 'BilateralContractService',
    function ($scope, $log, toastr, RowEditorModalService, uiGridConstants, LegalEntityService, BilateralContractService) {
        /* Cargando datos en legal entity ui-grid*/

        $scope.gridBilateralAgreementsOptions = {
            showGridFooter: true,
            paginationPageSizes: [12, 50, 100, 200, 500],
            paginationPageSize: 12,
            enableColumnResizing: true,
            enableFiltering: true,
            rowHeight: 35, // set height to each row
            enableGridMenu: true,
            exporterCsvFilename: 'legal_entity.csv',
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
            },
            columnDefs: [
                {
                    name: 'Contract Code',
                    field: 'contractCode',
                    sort: {
                        direction: uiGridConstants.ASC,
                        priority: 0
                    }
                },
                {
                    name: 'Contract type',
                    field: 'contractType'
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
            data: []
        };

        if (!$scope.legalEntity)
            return false;

        var legalEntityID = $scope.legalEntity.id;

        BilateralContractService.getAllByLegalEntityID(legalEntityID).then(function (result) {

            $scope.gridBilateralAgreementsOptions.data = result.data.dataResponse;

        })


    }]);

DashboardApp.controller('LEClearingAgrController', ['$scope', '$log', 'toastr', 'RowEditorModalService', 'uiGridConstants', 'LegalEntityService', 'BilateralContractService',
    function ($scope, $log, toastr, RowEditorModalService, uiGridConstants, LegalEntityService, BilateralContractService) {

        $scope.gridClearingAgreementsOptions = {
            showGridFooter: true,
            paginationPageSizes: [12, 50, 100, 200, 500],
            paginationPageSize: 12,
            enableColumnResizing: true,
            enableFiltering: true,
            rowHeight: 35,
            enableGridMenu: true,
            exporterCsvFilename: 'bilateral_contracts.csv',
            exporterPdfDefaultStyle: {fontSize: 9},
            exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
            exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
            exporterPdfHeader: {text: "Bilateral Contracts", style: 'headerStyle'},
            exporterPdfFooter: function (currentPage, pageCount) {
                return {
                    text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle'
                };
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
            },
            columnDefs: [
                {
                    name: 'Principal',
                    field: 'principal',
                    sort: {
                        direction: uiGridConstants.ASC,
                        priority: 0
                    }
                },
                {
                    name: 'Contract name',
                    field: 'contract_name',
                },
                {
                    name: 'CCP',
                    field: 'ccp'
                },
                {
                    name: 'Account type',
                    field: 'account_type'
                },
                {
                    name: 'CM/FCM',
                    field: 'cm_fcm'
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
            data: []
        };

        var ccp_house_accounts = LegalEntityService.getAllCCPHouseAccounts($scope.legalEntity.id);
        var ccp_client_accounts = LegalEntityService.getAllCCPClientAccounts($scope.legalEntity.id);


    }]);