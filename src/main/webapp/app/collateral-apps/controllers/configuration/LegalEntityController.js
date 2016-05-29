'use strict';

var DashboardApp = angular.module('DashboardApp');

DashboardApp.controller('LegalEntityController', ['LegalEntityService', '$scope', 'elementService',
    '$timeout', '$request', 'localStorageService', 'DTOptionsBuilder',
    'DTColumnBuilder', 'DTColumnDefBuilder',
    function (LegalEntityService, $scope, elementService, $timeout, $request, $localStorage, DTOptionsBuilder,
              DTColumnBuilder, DTColumnDefBuilder) {

        $scope.$on('$includeContentLoaded', function () {
            App.initAjax();
        });

        buildLegalData();

        LegalEntityService.getAll().then(function (result) {
            $scope.legalEntities = result;
        });

        //console.log($scope.legalEntities);

        /* Cargando datos en legal entity datatable*/
        $scope.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers');
        $scope.dtColumnDefs = [
            DTColumnDefBuilder.newColumnDef(0),
            DTColumnDefBuilder.newColumnDef(1),
            DTColumnDefBuilder.newColumnDef(2),
            DTColumnDefBuilder.newColumnDef(3),
            DTColumnDefBuilder.newColumnDef(4),
            DTColumnDefBuilder.newColumnDef(5),
            DTColumnDefBuilder.newColumnDef(6).notSortable()
        ];

        function buildLegalData() {
            $scope.legalEntity =
            {
                "name": "",
                "otherName": "",
                "otherName2": "",
                "otherName3": "",
                "otherName4": "",
                "otherName5": "",
                "otherName6": "",
                "BIC": "",
                "LEI": "",
                "isBranch": false,
                "motherLegalEntity": -1,
                "cdsMarketDataName": "",
                "contactPersonList": [],
                "rolList": [],
                "ccpOwnClientAccounts": [],
                "ccpMyClientsAccounts": [],
                "rwaMultiplier": 0,
                "leverageRatioMultiplier": 0,
                "cvaComputes": false,
                "riskProfile": {"SPRating": "", "riskWeight": 0, "cdsSpreadArrayList": []},
                "countryId": -1,
                "financialCalendarList": []

            };
            $scope.isEditLegal = false;

        }

        /*$scope.dtOptions = DTOptionsBuilder.fromFnPromise(
         $request.get('/servlet/LegalEntity/SelectAll').then(function (Response) {
         //console.log(Response.data.dataResponse);
         //Response.data.dataResponse[0].rolList.push('Other');
         return Response.data.dataResponse
         }))
         .withDataProp('dataResponse')
         ;
         $scope.dtColumns = [
         DTColumnBuilder.newColumn('id').withTitle('ID'),
         DTColumnBuilder.newColumn('name').withTitle('Entity Name'),
         DTColumnBuilder.newColumn('isBranch').withTitle('isBranch'),
         DTColumnBuilder.newColumn('LEI').withTitle('LEI'),
         DTColumnBuilder.newColumn('BIC').withTitle('BIC'),
         DTColumnBuilder.newColumn('rolList').withTitle('Rols')
         ];
         */

        $scope.setFocusInput = function (element) {
            //console.log("#"+element+" input:first:not([readonly])");
            $("#" + element + " input:first:not([readonly])").focus();
        }

        $scope.addLegalEntity = function (element) {

            if (!element) {
                //toastr.warning('Your computer is about to explode!', 'Warning', {closeButton: true});
                console.log("Problemas al recibir el elemento");
                return false;
            }

            elementService.collapsePortlet('legal-entity-table');
            elementService.expandPortlet(element);
            var offset = $("#" + element).offset().top - $("#legal-entity-table").offset().top;
            elementService.scrollToElement(element, offset);

            $scope.setFocusInput('le-general-data');

            buildLegalData();

        }

        // Edit legalEntity
        $scope.editLegalEntity = function (element, index) {

            if (!element || index == null) {
                console.log("Problemas al recibir el elemento o el indice del objeto");
                return false;
            }

            elementService.collapsePortlet('legal-entity-table');
            elementService.expandPortlet(element);

            var offset = $("#" + element).offset().top - $("#legal-entity-table").offset().top;
            elementService.scrollToElement(element, offset);

            $scope.setFocusInput('le-general-data')

            $scope.isEditLegal = true;

            $scope.legalEntity = $scope.legalEntities[index];

        };

        $scope.saveLegalEntity = function (legalEntity) {

            LegalEntityService.set(legalEntity, $scope.isEditLegal);
            buildLegalData();

        }

        // Delete legalEntity
        $scope.deleteLegalEntity = function (index) {

            if (index == null) {
                console.log("Problemas al recibir el indice del objeto");
                return false;
            }

            LegalEntityService.delete(index);
        }

        $scope.cancel = function () {
            elementService.collapsePortlet('legal-entity-tabs');
            elementService.expandPortlet('legal-entity-table');
        }


        $scope.rols = ['Counterparty', 'PO', 'Issuer', 'CCP'];
        $scope.regulatories_status = ['NFC', 'NFC_PLUS', 'CATEGORY_1', 'CATEGORY_2', 'CATEGORY_3'];
        $scope.country = {};
        $scope.countries = [ // Taken from https://gist.github.com/unceus/6501985
            {
                name: 'Afghanistan',
                code: 'AF'
            }, {
                name: 'Åland Islands',
                code: 'AX'
            }, {
                name: 'Albania',
                code: 'AL'
            }, {
                name: 'Algeria',
                code: 'DZ'
            }, {
                name: 'American Samoa',
                code: 'AS'
            }, {
                name: 'Andorra',
                code: 'AD'
            }, {
                name: 'Angola',
                code: 'AO'
            }, {
                name: 'Anguilla',
                code: 'AI'
            }, {
                name: 'Antarctica',
                code: 'AQ'
            }, {
                name: 'Antigua and Barbuda',
                code: 'AG'
            }, {
                name: 'Argentina',
                code: 'AR'
            }, {
                name: 'Armenia',
                code: 'AM'
            }, {
                name: 'Aruba',
                code: 'AW'
            }, {
                name: 'Australia',
                code: 'AU'
            }, {
                name: 'Austria',
                code: 'AT'
            }, {
                name: 'Azerbaijan',
                code: 'AZ'
            }, {
                name: 'Bahamas',
                code: 'BS'
            }, {
                name: 'Bahrain',
                code: 'BH'
            }, {
                name: 'Bangladesh',
                code: 'BD'
            }, {
                name: 'Barbados',
                code: 'BB'
            }, {
                name: 'Belarus',
                code: 'BY'
            }, {
                name: 'Belgium',
                code: 'BE'
            }, {
                name: 'Belize',
                code: 'BZ'
            }, {
                name: 'Benin',
                code: 'BJ'
            }, {
                name: 'Bermuda',
                code: 'BM'
            }, {
                name: 'Bhutan',
                code: 'BT'
            }, {
                name: 'Bolivia',
                code: 'BO'
            }, {
                name: 'Bosnia and Herzegovina',
                code: 'BA'
            }, {
                name: 'Botswana',
                code: 'BW'
            }, {
                name: 'Bouvet Island',
                code: 'BV'
            }, {
                name: 'Brazil',
                code: 'BR'
            }, {
                name: 'British Indian Ocean Territory',
                code: 'IO'
            }, {
                name: 'Brunei Darussalam',
                code: 'BN'
            }, {
                name: 'Bulgaria',
                code: 'BG'
            }, {
                name: 'Burkina Faso',
                code: 'BF'
            }, {
                name: 'Burundi',
                code: 'BI'
            }, {
                name: 'Cambodia',
                code: 'KH'
            }, {
                name: 'Cameroon',
                code: 'CM'
            }, {
                name: 'Canada',
                code: 'CA'
            }, {
                name: 'Cape Verde',
                code: 'CV'
            }, {
                name: 'Cayman Islands',
                code: 'KY'
            }, {
                name: 'Central African Republic',
                code: 'CF'
            }, {
                name: 'Chad',
                code: 'TD'
            }, {
                name: 'Chile',
                code: 'CL'
            }, {
                name: 'China',
                code: 'CN'
            }, {
                name: 'Christmas Island',
                code: 'CX'
            }, {
                name: 'Cocos (Keeling) Islands',
                code: 'CC'
            }, {
                name: 'Colombia',
                code: 'CO'
            }, {
                name: 'Comoros',
                code: 'KM'
            }, {
                name: 'Congo',
                code: 'CG'
            }, {
                name: 'Congo, The Democratic Republic of the',
                code: 'CD'
            }, {
                name: 'Cook Islands',
                code: 'CK'
            }, {
                name: 'Costa Rica',
                code: 'CR'
            }, {
                name: 'Cote D\'Ivoire',
                code: 'CI'
            }, {
                name: 'Croatia',
                code: 'HR'
            }, {
                name: 'Cuba',
                code: 'CU'
            }, {
                name: 'Cyprus',
                code: 'CY'
            }, {
                name: 'Czech Republic',
                code: 'CZ'
            }, {
                name: 'Denmark',
                code: 'DK'
            }, {
                name: 'Djibouti',
                code: 'DJ'
            }, {
                name: 'Dominica',
                code: 'DM'
            }, {
                name: 'Dominican Republic',
                code: 'DO'
            }, {
                name: 'Ecuador',
                code: 'EC'
            }, {
                name: 'Egypt',
                code: 'EG'
            }, {
                name: 'El Salvador',
                code: 'SV'
            }, {
                name: 'Equatorial Guinea',
                code: 'GQ'
            }, {
                name: 'Eritrea',
                code: 'ER'
            }, {
                name: 'Estonia',
                code: 'EE'
            }, {
                name: 'Ethiopia',
                code: 'ET'
            }, {
                name: 'Falkland Islands (Malvinas)',
                code: 'FK'
            }, {
                name: 'Faroe Islands',
                code: 'FO'
            }, {
                name: 'Fiji',
                code: 'FJ'
            }, {
                name: 'Finland',
                code: 'FI'
            }, {
                name: 'France',
                code: 'FR'
            }, {
                name: 'French Guiana',
                code: 'GF'
            }, {
                name: 'French Polynesia',
                code: 'PF'
            }, {
                name: 'French Southern Territories',
                code: 'TF'
            }, {
                name: 'Gabon',
                code: 'GA'
            }, {
                name: 'Gambia',
                code: 'GM'
            }, {
                name: 'Georgia',
                code: 'GE'
            }, {
                name: 'Germany',
                code: 'DE'
            }, {
                name: 'Ghana',
                code: 'GH'
            }, {
                name: 'Gibraltar',
                code: 'GI'
            }, {
                name: 'Greece',
                code: 'GR'
            }, {
                name: 'Greenland',
                code: 'GL'
            }, {
                name: 'Grenada',
                code: 'GD'
            }, {
                name: 'Guadeloupe',
                code: 'GP'
            }, {
                name: 'Guam',
                code: 'GU'
            }, {
                name: 'Guatemala',
                code: 'GT'
            }, {
                name: 'Guernsey',
                code: 'GG'
            }, {
                name: 'Guinea',
                code: 'GN'
            }, {
                name: 'Guinea-Bissau',
                code: 'GW'
            }, {
                name: 'Guyana',
                code: 'GY'
            }, {
                name: 'Haiti',
                code: 'HT'
            }, {
                name: 'Heard Island and Mcdonald Islands',
                code: 'HM'
            }, {
                name: 'Holy See (Vatican City State)',
                code: 'VA'
            }, {
                name: 'Honduras',
                code: 'HN'
            }, {
                name: 'Hong Kong',
                code: 'HK'
            }, {
                name: 'Hungary',
                code: 'HU'
            }, {
                name: 'Iceland',
                code: 'IS'
            }, {
                name: 'India',
                code: 'IN'
            }, {
                name: 'Indonesia',
                code: 'ID'
            }, {
                name: 'Iran, Islamic Republic Of',
                code: 'IR'
            }, {
                name: 'Iraq',
                code: 'IQ'
            }, {
                name: 'Ireland',
                code: 'IE'
            }, {
                name: 'Isle of Man',
                code: 'IM'
            }, {
                name: 'Israel',
                code: 'IL'
            }, {
                name: 'Italy',
                code: 'IT'
            }, {
                name: 'Jamaica',
                code: 'JM'
            }, {
                name: 'Japan',
                code: 'JP'
            }, {
                name: 'Jersey',
                code: 'JE'
            }, {
                name: 'Jordan',
                code: 'JO'
            }, {
                name: 'Kazakhstan',
                code: 'KZ'
            }, {
                name: 'Kenya',
                code: 'KE'
            }, {
                name: 'Kiribati',
                code: 'KI'
            }, {
                name: 'Korea, Democratic People\'s Republic of',
                code: 'KP'
            }, {
                name: 'Korea, Republic of',
                code: 'KR'
            }, {
                name: 'Kuwait',
                code: 'KW'
            }, {
                name: 'Kyrgyzstan',
                code: 'KG'
            }, {
                name: 'Lao People\'s Democratic Republic',
                code: 'LA'
            }, {
                name: 'Latvia',
                code: 'LV'
            }, {
                name: 'Lebanon',
                code: 'LB'
            }, {
                name: 'Lesotho',
                code: 'LS'
            }, {
                name: 'Liberia',
                code: 'LR'
            }, {
                name: 'Libyan Arab Jamahiriya',
                code: 'LY'
            }, {
                name: 'Liechtenstein',
                code: 'LI'
            }, {
                name: 'Lithuania',
                code: 'LT'
            }, {
                name: 'Luxembourg',
                code: 'LU'
            }, {
                name: 'Macao',
                code: 'MO'
            }, {
                name: 'Macedonia, The Former Yugoslav Republic of',
                code: 'MK'
            }, {
                name: 'Madagascar',
                code: 'MG'
            }, {
                name: 'Malawi',
                code: 'MW'
            }, {
                name: 'Malaysia',
                code: 'MY'
            }, {
                name: 'Maldives',
                code: 'MV'
            }, {
                name: 'Mali',
                code: 'ML'
            }, {
                name: 'Malta',
                code: 'MT'
            }, {
                name: 'Marshall Islands',
                code: 'MH'
            }, {
                name: 'Martinique',
                code: 'MQ'
            }, {
                name: 'Mauritania',
                code: 'MR'
            }, {
                name: 'Mauritius',
                code: 'MU'
            }, {
                name: 'Mayotte',
                code: 'YT'
            }, {
                name: 'Mexico',
                code: 'MX'
            }, {
                name: 'Micronesia, Federated States of',
                code: 'FM'
            }, {
                name: 'Moldova, Republic of',
                code: 'MD'
            }, {
                name: 'Monaco',
                code: 'MC'
            }, {
                name: 'Mongolia',
                code: 'MN'
            }, {
                name: 'Montserrat',
                code: 'MS'
            }, {
                name: 'Morocco',
                code: 'MA'
            }, {
                name: 'Mozambique',
                code: 'MZ'
            }, {
                name: 'Myanmar',
                code: 'MM'
            }, {
                name: 'Namibia',
                code: 'NA'
            }, {
                name: 'Nauru',
                code: 'NR'
            }, {
                name: 'Nepal',
                code: 'NP'
            }, {
                name: 'Netherlands',
                code: 'NL'
            }, {
                name: 'Netherlands Antilles',
                code: 'AN'
            }, {
                name: 'New Caledonia',
                code: 'NC'
            }, {
                name: 'New Zealand',
                code: 'NZ'
            }, {
                name: 'Nicaragua',
                code: 'NI'
            }, {
                name: 'Niger',
                code: 'NE'
            }, {
                name: 'Nigeria',
                code: 'NG'
            }, {
                name: 'Niue',
                code: 'NU'
            }, {
                name: 'Norfolk Island',
                code: 'NF'
            }, {
                name: 'Northern Mariana Islands',
                code: 'MP'
            }, {
                name: 'Norway',
                code: 'NO'
            }, {
                name: 'Oman',
                code: 'OM'
            }, {
                name: 'Pakistan',
                code: 'PK'
            }, {
                name: 'Palau',
                code: 'PW'
            }, {
                name: 'Palestinian Territory, Occupied',
                code: 'PS'
            }, {
                name: 'Panama',
                code: 'PA'
            }, {
                name: 'Papua New Guinea',
                code: 'PG'
            }, {
                name: 'Paraguay',
                code: 'PY'
            }, {
                name: 'Peru',
                code: 'PE'
            }, {
                name: 'Philippines',
                code: 'PH'
            }, {
                name: 'Pitcairn',
                code: 'PN'
            }, {
                name: 'Poland',
                code: 'PL'
            }, {
                name: 'Portugal',
                code: 'PT'
            }, {
                name: 'Puerto Rico',
                code: 'PR'
            }, {
                name: 'Qatar',
                code: 'QA'
            }, {
                name: 'Reunion',
                code: 'RE'
            }, {
                name: 'Romania',
                code: 'RO'
            }, {
                name: 'Russian Federation',
                code: 'RU'
            }, {
                name: 'Rwanda',
                code: 'RW'
            }, {
                name: 'Saint Helena',
                code: 'SH'
            }, {
                name: 'Saint Kitts and Nevis',
                code: 'KN'
            }, {
                name: 'Saint Lucia',
                code: 'LC'
            }, {
                name: 'Saint Pierre and Miquelon',
                code: 'PM'
            }, {
                name: 'Saint Vincent and the Grenadines',
                code: 'VC'
            }, {
                name: 'Samoa',
                code: 'WS'
            }, {
                name: 'San Marino',
                code: 'SM'
            }, {
                name: 'Sao Tome and Principe',
                code: 'ST'
            }, {
                name: 'Saudi Arabia',
                code: 'SA'
            }, {
                name: 'Senegal',
                code: 'SN'
            }, {
                name: 'Serbia and Montenegro',
                code: 'CS'
            }, {
                name: 'Seychelles',
                code: 'SC'
            }, {
                name: 'Sierra Leone',
                code: 'SL'
            }, {
                name: 'Singapore',
                code: 'SG'
            }, {
                name: 'Slovakia',
                code: 'SK'
            }, {
                name: 'Slovenia',
                code: 'SI'
            }, {
                name: 'Solomon Islands',
                code: 'SB'
            }, {
                name: 'Somalia',
                code: 'SO'
            }, {
                name: 'South Africa',
                code: 'ZA'
            }, {
                name: 'South Georgia and the South Sandwich Islands',
                code: 'GS'
            }, {
                name: 'Spain',
                code: 'ES'
            }, {
                name: 'Sri Lanka',
                code: 'LK'
            }, {
                name: 'Sudan',
                code: 'SD'
            }, {
                name: 'Suriname',
                code: 'SR'
            }, {
                name: 'Svalbard and Jan Mayen',
                code: 'SJ'
            }, {
                name: 'Swaziland',
                code: 'SZ'
            }, {
                name: 'Sweden',
                code: 'SE'
            }, {
                name: 'Switzerland',
                code: 'CH'
            }, {
                name: 'Syrian Arab Republic',
                code: 'SY'
            }, {
                name: 'Taiwan, Province of China',
                code: 'TW'
            }, {
                name: 'Tajikistan',
                code: 'TJ'
            }, {
                name: 'Tanzania, United Republic of',
                code: 'TZ'
            }, {
                name: 'Thailand',
                code: 'TH'
            }, {
                name: 'Timor-Leste',
                code: 'TL'
            }, {
                name: 'Togo',
                code: 'TG'
            }, {
                name: 'Tokelau',
                code: 'TK'
            }, {
                name: 'Tonga',
                code: 'TO'
            }, {
                name: 'Trinidad and Tobago',
                code: 'TT'
            }, {
                name: 'Tunisia',
                code: 'TN'
            }, {
                name: 'Turkey',
                code: 'TR'
            }, {
                name: 'Turkmenistan',
                code: 'TM'
            }, {
                name: 'Turks and Caicos Islands',
                code: 'TC'
            }, {
                name: 'Tuvalu',
                code: 'TV'
            }, {
                name: 'Uganda',
                code: 'UG'
            }, {
                name: 'Ukraine',
                code: 'UA'
            }, {
                name: 'United Arab Emirates',
                code: 'AE'
            }, {
                name: 'United Kingdom',
                code: 'GB'
            }, {
                name: 'United States',
                code: 'US'
            }, {
                name: 'United States Minor Outlying Islands',
                code: 'UM'
            }, {
                name: 'Uruguay',
                code: 'UY'
            }, {
                name: 'Uzbekistan',
                code: 'UZ'
            }, {
                name: 'Vanuatu',
                code: 'VU'
            }, {
                name: 'Venezuela',
                code: 'VE'
            }, {
                name: 'Vietnam',
                code: 'VN'
            }, {
                name: 'Virgin Islands, British',
                code: 'VG'
            }, {
                name: 'Virgin Islands, U.S.',
                code: 'VI'
            }, {
                name: 'Wallis and Futuna',
                code: 'WF'
            }, {
                name: 'Western Sahara',
                code: 'EH'
            }, {
                name: 'Yemen',
                code: 'YE'
            }, {
                name: 'Zambia',
                code: 'ZM'
            }, {
                name: 'Zimbabwe',
                code: 'ZW'
            }
        ];


    }]);

DashboardApp.controller('TabsLegalEntityController', ['$scope', function ($scope) {

    $scope.tabs = [
        {
            id: 'le-general-data',
            title: 'General Data',
            templateUrl: 'collateral-apps/views/configuration/le_general_data.html',
            icon: 'icon-note'
        },
        {
            id: 'le-contact-info',
            title: 'Contact info',
            templateUrl: 'collateral-apps/views/configuration/le_contact_info.html',
            icon: 'icon-user'
        },
        {
            id: 'le-regulatory',
            title: 'Regulatory Settings',
            templateUrl: 'collateral-apps/views/configuration/le_regulatory.html',
            icon: ''
        },
        {
            id: 'le-risk-profile',
            title: 'Risk Profiles',
            templateUrl: 'collateral-apps/views/configuration/le_risk_profile.html',
            icon: ''
        },
        {
            id: 'le-billateral-a',
            title: 'Bilateral agreements',
            templateUrl: 'collateral-apps/views/configuration/le_billateral_a.html',
            icon: ''
        },
        {
            id: 'le-clearing-a',
            title: 'Clearing agreements',
            templateUrl: 'collateral-apps/views/configuration/le_clearing_a.html',
            icon: ''
        },
        {id: 'le-sdi', title: 'SDI', templateUrl: 'collateral-apps/views/configuration/le_sdi.html', icon: ''}
    ];

}]);

DashboardApp.controller('ContactInfoController', ['$scope', '$log', 'toastr', 'RowEditorModalService',
    function ($scope, $log, toastr, RowEditorModalService) {

        $scope.$watchCollection('$parent.legalEntity.contactPersonList', function (newContactPerson, oldContactPerson) {
            if (newContactPerson === oldContactPerson) {
                return false;
            }
            $scope.gridContactPersonOptions.data = newContactPerson;

            //console.log($scope.gridContactPersonOptions.data);

        });

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
                "id": 0,
                "idLegalEntity": 0,
                "lastName": "",
                "linkedInProfileUrl": "",
                "phone": "",
                "state": "",
                "swift": "",
                "telex": "",
                "title": "",
                "zipCode": ""
        }
            ;
            var rowTmp = {};
            rowTmp.entity = newContact;
            $scope.editRow($scope.gridContactPersonOptions, rowTmp);
        };

        $scope.editRow = RowEditorModalService.editRow;

        $scope.deleteRow = function (grid, row) {

            $scope.gridContactPersonOptions.data.splice(row, 1);
            toastr.success("Data successfully removed", "Success")

        }

        $scope.gridContactPersonOptions = {
            enableColumnResizing: true,
            enableFiltering: false,
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
                $scope.gridApi.grid.registerRowsProcessor($scope.singleFilter, 200);
            }
        };

        $scope.gridContactPersonOptions.columnDefs = [
            {field: 'lastName', width: 130},
            {field: 'firstName', width: 130},
            {field: 'city', width: 100},
            {field: 'state', width: 100},
            {field: 'phone', width: 100},
            {field: 'email', width: 130},
            {field: 'swift', width: 100},
            {field: 'linkedInProfileUrl', name: "Linkedin", width: 150},
            {
                name: 'Actions',
                cellTemplate: paths.tpls + '/ActionsButtonsTpl.html',
                enableColumnMenu: false,
                enableCellEdit : false,
                width: 120
            }
        ];
        $scope.filter = function () {
            $scope.gridApi.grid.refresh();
        };

        $scope.singleFilter = function (renderableRows) {
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

// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.
DashboardApp.controller('RowEditCtrl', RowEditCtrl);
function RowEditCtrl($scope, $uibModalInstance, grid, row) {

    $scope.entity = angular.copy(row.entity);

    $scope.save = save;

    function save() {

        console.log(row.entity)
        if (row.entity.id === 0) {
            row.entity = angular.extend(row.entity, $scope.entity);
            //real ID come back from response after the save in DB
            row.entity.id = Math.floor(100 + Math.random() * 1000);
            grid.data.push(row.entity);

        }
        else {
            row.entity = angular.extend(row.entity, $scope.entity);
        }

        $uibModalInstance.close(row.entity);

    }

};