'use strict';

angular.module('CollateralApp').controller('DashboardController',
    [
        '$rootScope',
        '$scope',
        '$request',
        '$socket',
        'toastr',
        '$timeout',
        'localStorageService',
        'MenuService',
        'ModalService',
        'UserMessageService',
        function ($rootScope, $scope, $request, $socket, toastr, $timeout, localStorageService, $menuService, ModalService, UserMessage) {

            $scope.$workspaceTabsMgm = $menuService.MenuTree;
            $scope.$workspaceTabsMgm.createLinkParent = $menuService.linkParents;

            //SET USER TYPE
            localStorageService.set('user_rol', 'admin');

            $scope.userRol = localStorageService.get('user_rol');

            //GET STATIC DATA FROM THE SERVER
            $request.get("/servlet/StaticData/SelectAll").then(function (response) {
                angular.forEach(response.data.dataResponse, function (obj, key) {
                    localStorageService.set(obj.type, obj.value);
                });
            });

            $scope.$on('$includeContentLoaded', function () {
                App.initAjax();
                $(".go2top").show();
            });


            $scope.gridUserMessagesData = [];
            $scope.Messages = [];
            /* Socket Management */
            $socket.onMessage(function (msg) {
                var newMessage = {};
                newMessage = JSON.parse(msg.data);
                if (newMessage.signal == "SGN_MC1_MESSAGE_RECEIVED") {
                    toastr.info("New MC1 Margin Call Entry ", "Message Received", {closeButton: true});
                    if (newMessage.hasOwnProperty("marginCall")) {
                        if ($scope.Messages.length == 0) {
                            $scope.Messages = newMessage.marginCall.messages;
                        } else {
                            $scope.Messages.push(newMessage.marginCall.messages[newMessage.marginCall.messages.length - 1]);
                        }
                    }
                }
                if (newMessage.signal == "SGN_NEW_USER_MESSAGE") {
                    toastr.info("New user message ", "Message Received", {closeButton: true});
                    var data = [{
                        id: 1,
                        userMessageType: 'INTEREST_STATEMENT_CORRECTED',
                        hasBeenRead: false,
                        messageContentBasic: 'MC1 Margin Call Entry',
                        messageContentExtendes: 'Margin Call entry for contract abcdef',
                        hasBeenSentByEmail: true
                    }];
                    $scope.unReadMessages = data.concat($scope.unReadMessages);
                    $scope.qtyMessages = $scope.unReadMessages.length;
                    UserMessage.getByDate(moment().format("YYYY-MM-DD")).success(function (data) {
                        $scope.gridUserMessagesData = data.dataResponse;
                    });
                }
            });

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

                let workspaceContainer = $scope.$workspaceTabsMgm.getWorkspaceTabsByID($menuService.MenuTree, parentTabObj.tabContainer);

                if (workspaceContainer == false) {

                    workspaceContainer = $scope.$workspaceTabsMgm.getWorkspaceTabsByID($menuService.MenuTree, $menuService.MenuTree.id);

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

            // set sidebar closed and body solid layout mode
            $rootScope.settings.layout.pageContentWhite = true;
            $rootScope.settings.layout.pageBodySolid = false;
            $rootScope.settings.layout.pageSidebarClosed = false;
        }]);
