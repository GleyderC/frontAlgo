angular.module('CollateralApp').controller('DashboardController',
    [
        '$rootScope',
        '$scope',
        '$request',
        '$socket',
        'toastr',
        'localStorageService',
        'MenuService',
		'ModalService',
        function ($rootScope, $scope, $request,$socket, toastr,localStorageService, $menuService, ModalService) {

            $scope.$workspaceTabsMgm = $menuService.MenuTree;

			//SET USER TYPE
			localStorageService.set('user_rol', 'admin');
			
			$scope.userRol = localStorageService.get('user_rol');

			$scope.userManagementModal = function(){

				ModalService.open({
					templateUrl: paths.views + "/admin/user_management.html",
					size: 'lg',
					rendered: function () {
						App.initComponents();
					},
					controllerAs: 'UserMgm',
					controller: function (toastr, $scope, $uibModalInstance) {

						this.gridOptions = {

							columnDefs: [
								{
									field: 'name',
									name: 'Name'
								},
								{
									field: 'description',
									name: 'Description'
								},
								{
									field: 'access',
									name: 'Access',
									cellTemplate: '<input type="checkbox" ng-model="MODEL_COL_FIELD" />'
								},
								{
									field: 'create',
									name: 'Create',
									cellTemplate: '<input type="checkbox" ng-model="MODEL_COL_FIELD" />'
								},
								{
									field: 'update',
									name: 'Update',
									cellTemplate: '<input type="checkbox" ng-model="MODEL_COL_FIELD" />'
								},
								{
									field: 'delete',
									name: 'Delete',
									cellTemplate: '<input type="checkbox" ng-model="MODEL_COL_FIELD" />'
								},
							],
							enableGridMenu: true,
							exporterCsvFilename: 'permissions.csv',
							exporterPdfDefaultStyle: {fontSize: 9},
							exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
							exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
							exporterPdfHeader: {text: "Permissions", style: 'headerStyle'},
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
							},
							data: []
						}
						this.gridGroupsOptions = {

							columnDefs: [
								{
									field: 'name',
									name: 'Name'
								},
								{
									field: 'description',
									name: 'Description'
								},
								{
									name: 'Actions',
									cellTemplate: paths.tpls + '/ActionsButtonsTpl.html',
									enableColumnMenu: false,
									enableCellEdit: false,
									width: 120,
									enableFiltering: false
								}
							],
							enableGridMenu: true,
							enableFiltering: true,
							exporterCsvFilename: 'groups.csv',
							exporterPdfDefaultStyle: {fontSize: 9},
							exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
							exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
							exporterPdfHeader: {text: "Groups", style: 'headerStyle'},
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
							},
							data: [{name:"test",description:""}]
						}
						this.gridUsersOptions = {

							columnDefs: [
								{
									field: 'name',
								},
								{
									field: 'lastname',
								},
								{
									field: 'email',
								},
								{
									name: 'Actions',
									cellTemplate: paths.tpls + '/ActionsButtonsTpl.html',
									enableColumnMenu: false,
									enableCellEdit: false,
									width: 120,
									enableFiltering: false
								}
							],
							enableGridMenu: true,
							enableFiltering: true,
							exporterCsvFilename: 'users.csv',
							exporterPdfDefaultStyle: {fontSize: 9},
							exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
							exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
							exporterPdfHeader: {text: "users", style: 'headerStyle'},
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
							},
							data: [{name:"Daniel",lastname:"Nebrera",email:"danielnebrera@commonsms.com"}]
						}

						//data DEMO
						this.gridOptions.data.push(
							{
								name: 'Legal Entity',
								description: ''
							},
							{
								name: 'Bilateral Contract',
								description: ''
							}
						);

						this.save = function(){
							$uibModalInstance.dismiss();
						}

						this.cancel = function(){
							$uibModalInstance.dismiss();
						}
					}
				});

			}
			
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
            
            
            $scope.gridUserMessagesData  = [];
            $scope.Messages  = [];
            /* Socket Management */
        	$socket.onMessage(function(msg){
        		newMessage= JSON.parse(msg.data);
    			if(newMessage.signal == "SGN_MC1_MESSAGE_RECEIVED"){
    				toastr.info("New MC1 Margin Call Entry ","Message Received",{closeButton: true});
    				if(newMessage.hasOwnProperty("marginCall")){
	    				if($scope.Messages.length==0){
	    					$scope.Messages  =  newMessage.marginCall.messages ;
	    				}else{
	    					$scope.Messages.push(newMessage.marginCall.messages[newMessage.marginCall.messages.length-1]);
	    				}
    				}
    			}
    			if(newMessage.signal == "SGN_NEW_USER_MESSAGE"){
    				newMessage = [newMessage];
    				toastr.info("New user message ","Message Received",{closeButton: true});
    				data = [{
    						id : 1, 
    						userMessageType : 'INTEREST_STATEMENT_CORRECTED', 
    						hasBeenRead : false, 
    						messageContentBasic : 'MC1 Margin Call Entry', 
    						messageContentExtendes : 'Margin Call entry for contract abcdef', 
    						hasBeenSentByEmail : true
    				}];
	    			$scope.unReadMessages 		=   data.concat($scope.unReadMessages); 
	    			$scope.qtyMessages 			=   $scope.unReadMessages.length;
	    			$scope.gridUserMessagesData =   data.concat($scope.gridUserMessagesData);
    			}
    		});

            // set sidebar closed and body solid layout mode
            $rootScope.settings.layout.pageContentWhite = true;
            $rootScope.settings.layout.pageBodySolid = false;
            $rootScope.settings.layout.pageSidebarClosed = false;
        }]);
