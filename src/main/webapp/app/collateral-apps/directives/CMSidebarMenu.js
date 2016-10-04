'use strict';

/**
 * SIDEBAR MENU
 */

angular.module('DashboardApp')
    .directive('cmSidebarMenu', ['$q', 'toastr', '$timeout', function ($q, $toastr, $timeout) {
        return {
            restrict: "E",
            scope: {
                htmlTreeMenu: '=htmlTreeMenu',
                workspaceTabs: '=workspaceTabs'
            },
            templateUrl: paths.tpls + "/CMSidebarMenuTpl.html",
            link: function ($scope, element, attrs) {

                $scope.displayTabMenu = function (link) {

                    let currentTab = angular.element(link.currentTarget).get(0);
                    let currentTabObj = {};

                    currentTabObj.id = angular.element(currentTab).attr("id");

                    currentTabObj.head = {};
                    currentTabObj.head.icon = angular.element(currentTab).find("i:first").attr("class");
                    currentTabObj.head.text = angular.element(currentTab).find("span.title:first").html();
                    currentTabObj.view = angular.element(currentTab).data("view");
                    currentTabObj.unique = angular.element(currentTab).attr("unique") != undefined ? true : false;

                    /*currentTabObj.badgeCounter = angular.element(currentTab).find("span.badge.badge-info");

                     let badgeCounter = parseInt(currentTabObj.badgeCounter.html(),10);

                     if ( isNaN(badgeCounter) ) {
                     badgeCounter = 1;
                     }
                     else
                     {
                     badgeCounter++;
                     }

                     currentTabObj.badgeCounter.html(badgeCounter);*/

                    let parentTab = angular.element(link.currentTarget).parent().parent().parent().get(0);
                    let parentTabObj = {};

                    parentTabObj.id = angular.element(parentTab).attr("id");
                    parentTabObj.head = {};
                    parentTabObj.head.icon = angular.element(parentTab).find("i:first").attr("class");
                    parentTabObj.head.text = angular.element(parentTab).find("span.title:first").html();
                    parentTabObj.alreadyExists = false;

                    parentTabObj.tabContainer = angular.element(parentTab).data("tab-container");

                    let workspaceContainer = $scope.workspaceTabs.getWorkspaceTabsByID($scope.workspaceTabs, parentTabObj.tabContainer);

                    if (workspaceContainer == false) {

                        workspaceContainer = $scope.workspaceTabs.getWorkspaceTabsByID($scope.workspaceTabs, $scope.workspaceTabs.id);

                    }

                    angular.forEach(workspaceContainer.tabList, function (tab) {

                        if (tab.id == parentTabObj.id) {
                            parentTabObj.alreadyExists = true;
                        }

                    });

                    if (!parentTabObj.alreadyExists) {
                        workspaceContainer.addTabByID({
                                id: parentTabObj.id,
                                head: {
                                    icon: parentTabObj.head.icon,
                                    text: parentTabObj.head.text
                                },
                                childWorkspace: {
                                    active: 1,
                                    tabList: []
                                },
                                closable: true
                            },
                            workspaceContainer.id);

                    }

                    $timeout(function () {
                        workspaceContainer.addTabByID({
                            id: currentTabObj.id,
                            head: {
                                icon: currentTabObj.head.icon,
                                text: currentTabObj.head.text
                            },
                            templateUrl: paths.views + currentTabObj.view,
                            autoload: true,
                            closable: true,
                            unique: currentTabObj.unique
                        }, parentTabObj.id);
                    });

                }

                $scope.createParentMenu = function (tabInfo) {

                }

            }
        }
    }])
