'use strict';

/**
 * WORKSPACE TAB MENU
 */

angular.module('DashboardApp')
    .directive('workspaceTabs', ['$q', 'toastr', function ($q, $toastr) {

        return {
            restrict: "E",
            scope: true,
            controller: function ($scope) {
                $scope.hasSelectTab = function($event){
                    console.log($event)
                }
            },
            templateUrl: "TabsMgTpl.html",
            link: function ($scope, element, attrs) {

                if ($scope.workspaceTabs == undefined) {
                    $scope.workspaceTabs = new Object();
                }

                if (attrs.id !== undefined) {
                    $scope.workspaceTabs.id = attrs.id;
                }
                else {
                    let hash = parseInt(Date.now() * Math.random()).toString(16); //CREATE HEXADECIMAL HASH
                    element.attr("id", hash);
                    $scope.workspaceTabs.id = hash;
                }

                $scope.workspaceTabs.addTab = function (tabConfig) {

                    let deferred = $q.defer();

                    if ($scope.workspaceTabs.maxTabs !== undefined && $scope.workspaceTabs.maxTabs < ($scope.workspaceTabs.tabList.length + 1)) {
                        $toastr.error("It has reached the maximum allowed tabs", "Error Opening", {closeButton: true})
                        deferred.reject("limit exceeded tabs");
                        return false;
                    }


                    let globalTabConfig = {
                        head: {
                            icon: 'glyphicon glyphicon-refresh glyphicon-refresh-animate',
                            text: ''
                        },
                        content: '',
                        templateUrl: '',
                        resolve: {
                            formData: []
                        },
                        disabled: false,
                        closable: false,
                        callback: function () {
                        }
                    };

                    if (!!tabConfig && typeof tabConfig === 'object') {

                        if (!!tabConfig.head.text) {
                            globalTabConfig.head.text = tabConfig.head.text;
                        }

                        if (!!tabConfig.content) {
                            globalTabConfig.content = tabConfig.content;
                        }

                        if (!!tabConfig.templateUrl) {
                            globalTabConfig.templateUrl = tabConfig.templateUrl;
                        }

                        if (!!tabConfig.resolve) {
                            globalTabConfig.resolve = tabConfig.resolve;
                        }

                        if (!!tabConfig.disabled) {
                            globalTabConfig.disabled = tabConfig.disabled;
                        }

                        if (!!tabConfig.closable) {
                            globalTabConfig.closable = tabConfig.closable;
                        }

                        if (!!tabConfig.callback && tabConfig.callback === 'function') {
                            globalTabConfig.callback = tabConfig.callback;
                        }

                    }

                    $scope.workspaceTabs.tabList.push(globalTabConfig);

                    //MANAGE REQUEST TEMPLATES
                    var loading_stack = [];
                    $scope.$on('$includeContentRequested', function (event, url) {
                        loading_stack.push(url)
                    });

                    $scope.$on('$includeContentLoaded', function (event, url) {
                        loading_stack.splice(loading_stack.indexOf(url), 1);

                        if (loading_stack.length === 0) {

                            //SET LAST TAB ACTIVE
                            $scope.workspaceTabs.active = $scope.workspaceTabs.tabList.length;
                            //REMOVE ICON LOADING
                            if (!!tabConfig.head.icon) {
                                $scope.workspaceTabs.tabList[$scope.workspaceTabs.tabList.length - 1].head.icon = tabConfig.head.icon;
                            }
                            else {
                                $scope.workspaceTabs.tabList[$scope.workspaceTabs.tabList.length - 1].head.icon = '';
                            }

                            //RESOLVE SECTION

                            if (!!globalTabConfig.resolve) {

                                if (!!globalTabConfig.resolve.formData.length > 0) {

                                    var last_index = $scope.workspaceTabs.tabList.length;
                                    var workspace_tab_container = element.find('div[data-tabid="' + $scope.workspaceTabs.id + last_index + '"][role="tab-content"]');

                                    if (workspace_tab_container.length > 0) {

                                        let formDataCpy = [];

                                        angular.copy(globalTabConfig.resolve.formData, formDataCpy);

                                        angular.forEach(formDataCpy, function (element, index) {

                                            if (element.type == "text") {
                                                workspace_tab_container.find("input#" + element.id).val(element.value);
                                            }
                                            else if (element.type == "select") {
                                                workspace_tab_container.find("input#" + element.id).val(element.value);
                                            }
                                            else if (element.type == "checkbox") {
                                                workspace_tab_container.find("input#" + element.id).prop("checked", element.value);
                                            }
                                            else if (element.type == "bootstrap-switch") {
                                                workspace_tab_container.find("input#" + element.id).bootstrapSwitch('state', element.value);
                                            }
                                            else if (element.type == "multiselect-dual") {
                                                let data_multiselect;

                                                if (angular.isArray(element.value)) {
                                                    data_multiselect = JSON.stringify(element.value);
                                                }
                                                else if (typeof element.value === 'string') {
                                                    data_multiselect = element.value;
                                                }

                                                workspace_tab_container.find("div#" + element.id).attr("selected-elements", data_multiselect);
                                            }
                                            else if (element.type == "ui-select") {

                                                var ngModel = workspace_tab_container.find("div#" + element.id + ".ui-select-container").attr("ng-model");
                                                var arrayObjNgModel = ngModel.split(".");
                                                var elementScope = workspace_tab_container.find("div#" + element.id + ".ui-select-container").scope().$parent;

                                                if (arrayObjNgModel.length > 1) {
                                                    var expEvalObj = "elementScope";

                                                    angular.forEach(arrayObjNgModel, function (objName, index) {
                                                        expEvalObj += '["' + objName + '"]';

                                                        if (eval(expEvalObj) === undefined) {
                                                            eval(expEvalObj + ' = new Object()');
                                                        }
                                                    });

                                                    eval(expEvalObj + ' = ' + JSON.stringify(element.value))
                                                }
                                                else {
                                                    elementScope[arrayObjNgModel[0]] = element.value;
                                                }

                                                //elementScope.$apply();

                                            }
                                            else if (element.type == "html") {
                                                workspace_tab_container.find("#" + element.id).html(element.value);
                                            }

                                            //clean array to set form inputs
                                            globalTabConfig.resolve.formData.splice(index, 1);

                                        });
                                    }

                                }
                            }

                            //CALLBACK
                            if (!!globalTabConfig.callback && typeof globalTabConfig.callback === 'function') {
                                globalTabConfig.callback();
                            }

                            console.log("saludos desde el promise")
                            //RETURN RESOLVE PROMISE
                            deferred.resolve(globalTabConfig);
                        }

                    });

                    return deferred.promise;

                }

                $scope.workspaceTabs.closeTab = function (tab, event) {

                    event.preventDefault();

                    if ($scope.workspaceTabs.tabList.length >= 0) {

                        $scope.workspaceTabs.tabList.splice(tab.$index, 1);

                    }

                }

                $scope.workspaceTabs.delAllTabRight = function (tab) {

                    if ($scope.workspaceTabs.tabList.length >= 0) {

                        $scope.workspaceTabs.tabList.splice(tab.$index + 1);

                    }

                }

                $scope.workspaceTabs.delAllTabLeft = function (tab) {

                    if ($scope.workspaceTabs.tabList.length >= 0) {

                        angular.forEach($scope.workspaceTabs.tabList, function (index, tab) {

                            if (index >= tab.$index)
                                return false;

                            $scope.workspaceTabs.tabList.splice(index);

                        });

                    }

                }

                $scope.workspaceTabs.backTab = function () {
                    if ($scope.workspaceTabs.active > 1)
                        $scope.workspaceTabs.active--;
                }

                $scope.workspaceTabs.nextTab = function () {
                    if ($scope.workspaceTabs.active < ($scope.workspaceTabs.tabList.length))
                        $scope.workspaceTabs.active++;
                }


                //SETTING MOUSE FOCUS
                var x, y, initial_background = '#c3d5e6';

                element
                    .removeAttr('style')
                    .mousemove(function (e) {
                        // Add highlight effect on inactive tabs
                        if (!element.hasClass('active')) {
                            x = e.pageX - this.offsetLeft;
                            y = e.pageY - this.offsetTop;

                            element
                                .css({background: '-moz-radial-gradient(circle at ' + x + 'px ' + y + 'px, rgba(255,255,255,0.4) 0px, rgba(255,255,255,0.0) 45px), ' + initial_background})
                                .css({background: '-webkit-radial-gradient(circle at ' + x + 'px ' + y + 'px, rgba(255,255,255,0.4) 0px, rgba(255,255,255,0.0) 45px), ' + initial_background})
                                .css({background: 'radial-gradient(circle at ' + x + 'px ' + y + 'px, rgba(255,255,255,0.4) 0px, rgba(255,255,255,0.0) 45px), ' + initial_background});
                        }
                    })
                    .mouseout(function () {
                        element.removeAttr('style');
                    });

            }
        }

    }])
    .run(['$templateCache', 'MenuService', function ($templateCache, MenuService) {

        let templateTabs = '';
        let objMenu = MenuService.MenuTree;
        let depth = 0;

        templateTabs += ''
            + '<uib-tabset class="workspace-tabs" id="{{workspaceTabs.id}}">';

        var iterateTree = function (tabList) {

            angular.forEach(tabList, function (tab, index) {

                templateTabs += ''
                    + '<uib-tab index="' + (index + 1) + '" disable="tab.disabled" select="hasSelectTab(this)">'
                    + ' <uib-tab-heading>'
                    + '     <i class="{{ tab.head.icon }}"></i> ' + tab.head.text
                    + '     <i ng-show="tab.closable" title="Close" class="close-tab-icon glyphicon glyphicon-remove-sign" ng-click="workspaceTabs.closeTab(this, $event)"></i>'
                    + ' </uib-tab-heading>'
                    + ' <div class="container-fluid">'
                    + '     <div class="page-content">'
                    + '         <div class="fade-in-up" data-tabId="{{ workspaceTabs.id + (' + (index + 1) + ' + 1)}}" role="tab-plain-content" ng-if="!!tab.content">{{ tab.content }}</div>'
                    + '         <div class="fade-in-up" data-tabId="{{ workspaceTabs.id + (' + (index + 1) + ' + 1)}}" role="tab-content" ng-if="!!tab.templateUrl" ng-include="tab.templateUrl"></div>'

                if (typeof tab.childrenTabs === 'object' && tab.hasOwnProperty('childrenTabs') && tab.childrenTabs.length > 0) {

                    depth++;

                    templateTabs += ''
                        + '      <div class="children-tabs-container">'
                        + '         <uib-tabset class="workspace-tabs" id="{{workspaceTabs.id}}" >';

                    iterateTree(tab.childrenTabs);

                    templateTabs += ''
                        + '         </uib-tabset>'
                        + '      </div>'
                        + '    </div>'
                        + '  </div>'
                        + '</uib-tab>';

                }else
                {
                    templateTabs += ''
                        + '     </div>'
                        + '    </div>'
                        + '</uib-tab>';
                }

            });



        }


        iterateTree(objMenu);

        templateTabs += ''
            + '</uib-tabset>';

        $templateCache.put('TabsMgTpl.html', templateTabs);

    }]);