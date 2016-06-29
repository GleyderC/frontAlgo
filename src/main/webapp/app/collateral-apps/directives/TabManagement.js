'use strict';

/**
 * WORKSPACE TAB MENU
 */

angular.module('DashboardApp')
    .directive('workspaceTabs', ['$q', 'toastr', '$timeout', function ($q, $toastr, $timeout) {

        return {
            restrict: "E",
            scope: true,
            controller: function ($scope) {
                $scope.findWorkspace = function (workspace, coord) {

                    let wst = workspace.tabList[coord];

                    if (!wst) {
                        console.log("Error in coord");
                        return false;
                    }
                    else {
                        return wst;
                    }
                }
            },
            templateUrl: paths.tpls + "/TabManagementTemplate.html",
            link: function ($scope, element, attrs) {

                if (!$scope.workspaceTabs) {
                    $scope.workspaceTabs = new Object();
                }

                $scope.workspaceTabs = $scope.$eval(attrs.workspaceInfo);

                if (attrs.id !== undefined) {
                    $scope.workspaceTabs.id = attrs.id;
                }
                else {
                    let hash = parseInt(Date.now() * Math.random()).toString(16); //CREATE HEXADECIMAL HASH
                    element.attr("id", hash);
                    $scope.workspaceTabs.id = hash;
                }

                //$scope.workspace.tabList[0].childWorkspace.active = 2;

                $scope.workspaceTabs.addTab = function (tabConfig, coordinates) {

                    let deferred = $q.defer();

                    if (!!$scope.workspaceTabs.maxTabs && $scope.workspaceTabs.maxTabs < ($scope.workspaceTabs.tabList.length + 1)) {
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

                        if (!!tabConfig.head && !!tabConfig.head.text) {
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

                        if (!!tabConfig.autoload) {
                            globalTabConfig.autoload = tabConfig.autoload;
                        }

                        if (!!tabConfig.callback && tabConfig.callback === 'function') {
                            globalTabConfig.callback = tabConfig.callback;
                        }

                        if (!!tabConfig.head.icon) {
                            globalTabConfig.head.icon = tabConfig.head.icon;
                        }

                        if (!!tabConfig.parameters) {
                            globalTabConfig.parameters = tabConfig.parameters;
                            $scope.parameters = tabConfig.parameters;
                        }
                        else
                        {
                            $scope.parameters = {};
                        }

                    }

                    if(!coordinates)
                        coordinates = [];

                    let ws = $scope.workspaceTabs.getWorkspaceTabs(coordinates);

                    if (!ws) {
                        $toastr.error("There was an error calling the tab!", "Opps", {closeButton: true})
                        deferred.reject("error loading tab");
                        return false;
                    }

                    if (coordinates.length === 1) {
                        ws.childWorkspace.tabList.push(globalTabConfig);

                        $timeout(function () {
                            coordinates.push(ws.childWorkspace.tabList.length);
                            $scope.workspaceTabs.setWorkspaceTabFocus(coordinates);
                        });
                    }
                    else if (coordinates.length === 0 || coordinates.length > 1) {
                        ws.tabList.push(globalTabConfig);

                        $timeout(function () {
                            coordinates.push(ws.tabList.length);
                            $scope.workspaceTabs.setWorkspaceTabFocus(coordinates);
                        });
                    }


                    //MANAGE REQUEST TEMPLATES
                    var loading_stack = [];
                    $scope.$on('$includeContentRequested', function (event, url) {
                        loading_stack.push(url)
                    });

                    $scope.$on('$includeContentLoaded', function (event, url) {
                        loading_stack.splice(loading_stack.indexOf(url), 1);

                        if (loading_stack.length === 0) {

                            //REMOVE ICON LOADING
                            /*if (!!tabConfig.head.icon) {
                                $scope.workspaceTabs.tabList[$scope.workspaceTabs.tabList.length - 1].head.icon = tabConfig.head.icon;
                            }
                            else {
                                $scope.workspaceTabs.tabList[$scope.workspaceTabs.tabList.length - 1].head.icon = '';
                            }*/

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

                //GETTING A WOARKSPACE TABS BY COORDINATES
                $scope.workspaceTabs.getWorkspaceTabs = function (coordinates) {

                    if (!angular.isArray(coordinates) && !!coordinates) {
                        console.error("Bad Coord!");
                        return false;
                    }

                    let rootWorkspace = $scope.workspaceTabs;

                    if (!rootWorkspace) {
                        console.error("Bad Coord!");
                        return false;
                    }

                    if (!coordinates || coordinates.length === 0) {

                        return rootWorkspace;

                    }
                    else if (coordinates.length == 1) {

                        return rootWorkspace.tabList[coordinates[0]--];

                    }
                    else if (coordinates.length > 1) {

                        let rootNode = null;
                        let workspaceChild = null;
                        let badCoord = false;

                        angular.forEach(coordinates, function (coord, index) {

                            coord--;

                            if (badCoord) {
                                return true;
                            }

                            if (!rootNode) {

                                rootNode = rootWorkspace.tabList[coord];

                                if (!rootNode) {
                                    badCoord = true;
                                    console.error("Bad Coord!")
                                }

                                return true;

                            }
                            else if (!workspaceChild) {

                                if(!rootNode.childWorkspace)
                                {
                                    badCoord = true;
                                    console.error("Bad Coord!");
                                    return false;
                                }
                                workspaceChild = rootNode.childWorkspace.tabList[coord];

                            }
                            else {

                                if (!workspaceChild.childWorkspace) {
                                    badCoord = true;
                                    console.error("Bad Coord!")
                                    return false;
                                }
                                if(!workspaceChild.childWorkspace)
                                {
                                    workspaceChild.childWorkspace= {};
                                }
                                workspaceChild = workspaceChild.childWorkspace.tabList[coord];

                            }

                        });

                        if (!!workspaceChild) {

                            if(!workspaceChild.childWorkspace)
                            {
                                workspaceChild.childWorkspace = {
                                    active: 1,
                                    tabList: []
                                };
                            }

                            return workspaceChild.childWorkspace;
                        }
                        else{

                            return false;

                        }

                    }

                };

                //SET FOCUS BY COORDINATES
                $scope.workspaceTabs.setWorkspaceTabFocus = function (coordinates) {

                    let workspace = null;
                    let rootWorkspace = null;


                    if (angular.isArray(coordinates) && coordinates.length == 1) {

                        workspace = $scope.workspaceTabs.getWorkspaceTabs();
                        workspace.active = coordinates[0];

                    }
                    else if (angular.isArray(coordinates) && coordinates.length > 1) {

                        angular.forEach(coordinates, function (coord, index) {

                            if (workspace === false) {
                                return true;
                            }

                            if (index === 0) {

                                workspace = $scope.workspaceTabs.getWorkspaceTabs();

                                if (workspace != false) {

                                    workspace.active = coord;
                                    coord--;
                                    workspace = workspace.tabList[coord];

                                }
                                else {
                                    console.error("Bad coord");
                                }

                                return true;

                            }
                            else {

                                workspace = workspace.childWorkspace;

                                if (!!workspace) {
                                    workspace.active = coord;
                                    coord--;
                                    workspace = workspace.tabList[coord];
                                }
                                else {
                                    console.error("Bad coord");
                                }

                            }

                        });
                    }

                };

                $scope.loadParameters = function (parameters) {

                    $scope.parameters = {};

                    for (var key in parameters) {

                        if (parameters.hasOwnProperty(key)) {

                            if(!!parameters[key])
                                $scope.parameters[key] = parameters[key];

                        }

                    }

                }

                $scope.workspaceTabs.loadTabContent = function (tab) {

                    tab.autoload = true;

                }

            } // END LINK FUNCTION
        }

    }])

    .directive('tabHighlight', [function () {
        return {
            restrict: 'A',
            link: function (scope, element) {
                var x, y, initial_background = 'rgba(211, 227, 245, 0.64)';

                element
                    .removeAttr('style')
                    .mousemove(function (e) {
                        // Add highlight effect on inactive tabs
                        if (!element.hasClass('active')) {
                            x = e.pageX - this.offsetLeft;
                            y = e.pageY - this.offsetTop;
                            let rgb = '255,255,255';
                            element
                                .css({background: '-moz-radial-gradient(circle at ' + x + 'px ' + y + 'px, rgba(' + rgb + ',0.5) 0px, rgba(' + rgb + ',0.0) 45px), ' + initial_background})
                                .css({background: '-webkit-radial-gradient(circle at ' + x + 'px ' + y + 'px, rgba(' + rgb + ',0.5) 0px, rgba(' + rgb + ',0.0) 45px), ' + initial_background})
                                .css({background: 'radial-gradient(circle at ' + x + 'px ' + y + 'px, rgba(' + rgb + ',0.5) 0px, rgba(' + rgb + ',0.0) 45px), ' + initial_background});
                        }
                    })
                    .mouseout(function () {
                        element.removeAttr('style');
                    });
            }
        };
    }]);

