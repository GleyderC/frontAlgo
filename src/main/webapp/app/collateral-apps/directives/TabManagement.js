'use strict';

/**
 * WORKSPACE TAB MENU
 */

angular.module('DashboardApp').directive('workspaceTabs', ['$q', function ($q) {

    return {
        restrict: "E",
        templateUrl: paths.tpls + "/TabManagementTemplate.html",
        link: function ($scope, element, attrs) {

            if ($scope.workspaceTabs == undefined) {
                $scope.workspaceTabs = new Object();
            }

            $scope.workspaceTabs.id = attrs.id;

            $scope.workspaceTabs.addTab = function (tabConfig) {

                let deferred = $q.defer();

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
                                    angular.forEach(globalTabConfig.resolve.formData, function (element, index) {

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
                                            workspace_tab_container.find("div#" + element.id).attr("selected-elements", element.value);
                                            workspace_tab_container.find("div#" + element.id).scope().$apply();
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

}]);