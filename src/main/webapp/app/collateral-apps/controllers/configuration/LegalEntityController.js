angular.module('DashboardApp')

    .controller('LegalEntityController', ['$scope', 'elementService',
        '$timeout', '$request', 'localStorageService', 'DTOptionsBuilder',
        'DTColumnBuilder', 'DTColumnDefBuilder','toastr',
        function ($scope, elementService, $timeout, $request, $localStorage, DTOptionsBuilder,
                  DTColumnBuilder, DTColumnDefBuilder,toastr) {

            $scope.$on('$includeContentLoaded', function () {
                App.initAjax();
                buildLegalData();
            });

            $request.get('/servlet/LegalEntity/SelectAll').then(function (Response) {
                //Response.data.dataResponse[0].rolList.push('Other');
                $scope.legalEntities = Response.data.dataResponse;

            });
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
                $scope.legalEntity = {
                    id: "",
                    name: "",
                    LEI: "",
                    BIC: "",
                    otherName: "",
                    isBranch: "",
                    motherLegalEntity: "",
                    country: "",
                    holidays: "",
                    rolList: ""
                };
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

                if(!element){
                    toastr.warning('Your computer is about to explode!', 'Warning');
                    false;
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
                elementService.collapsePortlet('legal-entity-table');
                elementService.expandPortlet(element);

                var offset = $("#" + element).offset().top - $("#legal-entity-table").offset().top;
                elementService.scrollToElement(element, offset);

                $scope.setFocusInput('le-general-data');

                $scope.legalEntity = $scope.legalEntities[index];

            };

            $scope.updateLegalEntity = function () {

            }

            // Delete legalEntity
            $scope.deleteLegalEntity = function (index) {

                var params = {

                    "id": $scope.legalEntities[index].id
                };

                $request.post('/servlet/LegalEntity/Delete', params)
                    .then(function (Response) {
                        $scope.legalEntities.splice(index, 1);
                    },
                    function (Response) {
                        alert("There is an error on Server");
                        console.log(Response)
                    })
            }

            $scope.cancel = function () {
                elementService.collapsePortlet('legal-entity-tabs');
                elementService.expandPortlet('legal-entity-table');
            }


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

DashboardApp.controller('ModalDemoCtrl', function ($scope, $uibModal, $log) {

    $scope.items = ['item1', 'item2', 'item3'];

    $scope.animationsEnabled = true;

    $scope.open = function (size) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            backdrop: false,
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };

});

// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

DashboardApp.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items) {

    $scope.items = items;
    $scope.selected = {
        item: $scope.items[0]
    };

    $scope.ok = function () {
        $uibModalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});


