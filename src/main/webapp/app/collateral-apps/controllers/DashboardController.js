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
            $scope.htmlTreeMenu = $menuService.htmlTreeMenu;
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

           

            // set sidebar closed and body solid layout mode
            $rootScope.settings.layout.pageContentWhite = true;
            $rootScope.settings.layout.pageBodySolid = false;
            $rootScope.settings.layout.pageSidebarClosed = false;
        }]);
