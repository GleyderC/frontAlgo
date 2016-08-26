<div class="page-header-fixed page-sidebar-closed-hide-logo page-md" ng-app="DashboardApp">

	<!-- TEMPLATE TO CHANGE PASS BEGIN-->
	<script type="text/ng-template" id="modalChangePassword.html">

		<div class="modal-header">
			<h4 class="modal-title">Change Password</h4>
		</div>
		<div class="modal-body">

			<div class="row" style="text-align: center;">
				<div class="form-group col-md-12">
					<label class="control-label col-md-4">Current Password</label>
					<input type="password" class="form-control input-medium">
					<label class="control-label col-md-4">New Password</label>
					<input type="password" class="form-control input-medium">
					<label class="control-label col-md-4">Re-type New Password</label>
					<input type="password" class="form-control input-medium">
				</div>

				<div class="modal-footer">
					<button class="btn btn-warning" type="button" ng-click="cancel()">Cancel</button>
					<button class="btn btn-primary" type="button" ng-click="save()">Save</button>
				</div>
			</div>
		</div>

	</script>
	<!-- TEMPLATE TO CHANGE PASS END -->
	<!-- BEGIN CONTAINER -->
	<div class="wrapper">
		<!-- BEGIN HEADER -->
		<header class="page-header">
			<nav class="navbar mega-menu" role="navigation">
				<div class="container-fluid">
					<div class="clearfix navbar-fixed-top">
						<!-- Brand and toggle get grouped for better mobile display -->
						<button type="button" class="navbar-toggle hide"
							data-toggle="collapse" data-target=".navbar-responsive-collapse">
							<span class="sr-only">Toggle navigation</span> <span
								class="toggle-icon"> <span class="icon-bar"></span> <span
								class="icon-bar"></span> <span class="icon-bar"></span>
							</span>
						</button>
						<!-- End Toggle Button -->
						<!-- BEGIN LOGO -->
						<div class="logo-container">
							<img src="assets/global/img/logo-common.png" alt="Logo" /> <img
								src="assets/global/img/logo-collateral.png" alt="Logo" />
						</div>
						<!-- END LOGO -->
						<!-- BEGIN SEARCH -->
						<form class="search hide" action="extra_search.html" method="GET">
							<input type="name" class="form-control" name="query"
								placeholder="Search..."> <a href="javascript:;"
								class="btn submit md-skip"> <i class="fa fa-search"></i>
							</a>
						</form>
						<!-- END SEARCH -->
						<!-- BEGIN TOPBAR ACTIONS -->
						<div class="topbar-actions">


							<!--ADMIN SECTION START--><!--ADMIN SECTION END-->

							<!-- BEGIN GROUP NOTIFICATION -->
							<div ng-controller="NotificationsController"
								class="btn-group-notification btn-group"
								id="header_notification_bar">
								<button type="button" class="btn btn-sm md-skip dropdown-toggle"
									data-toggle="dropdown" data-hover="dropdown"
									data-close-others="true">
									<i class="icon-bell"></i>
									
									 <span ng-if="qtyMessages > 0 " class="badge">{{qtyMessages}}</span>
								</button>
								<ul class="dropdown-menu-v2">
									<li class="external">
										<h3>
											<span class="bold">{{qtyMessages}} pending</span> notifications
										</h3> <a href="#">view all</a>
									</li>
									<li>
										<ul class="dropdown-menu-list scroller"
											style="height: 250px; padding: 0;"
											data-handle-color="#637283">
											<li  ng-repeat="notif in unReadMessages">
												<a href="javascript:;"> <span class="details">
															<span class="label label-sm label-icon label-success md-skip">
																<i class="fa  fa-envelope-o"></i>
																
															</span>
															{{notif.messageContentBasic}}
													</span> <span class="time">just now</span>
												</a>
											</li>
										</ul>
									</li>
								</ul>
							</div>
							<!-- END GROUP NOTIFICATION -->
							<!-- BEGIN GROUP INFORMATION -->
							<div class="btn-group-red btn-group">
								<button type="button" class="btn btn-sm md-skip dropdown-toggle"
									data-toggle="dropdown" data-hover="dropdown"
									data-close-others="true">
									<i class="fa fa-plus"></i>
								</button>
								<ul class="dropdown-menu-v2" role="menu">
									<li class="active"><a href="#">New Post</a></li>
									<li><a href="#">New Comment</a></li>
									<li><a href="#">Share</a></li>
									<li class="divider"></li>
									<li><a href="#">Comments <span
											class="badge badge-success">4</span>
									</a></li>
									<li><a href="#">Feedbacks <span
											class="badge badge-danger">2</span>
									</a></li>
								</ul>
							</div>
							<!-- END GROUP INFORMATION -->
							<!-- BEGIN USER PROFILE -->
							<div class="btn-group-img btn-group">
								<button type="button" class="btn btn-sm md-skip dropdown-toggle"
									data-toggle="dropdown" data-hover="dropdown"
									data-close-others="true">
									<span>Hi, Username</span> <img
										src="assets/global/img/avatar.png" alt="">
								</button>
								<ul class="dropdown-menu-v2" role="menu" ng-controller="UserProfileController as UserProfileCtrl">
									<li><a href="#" ng-click="UserProfileCtrl.modalChangePass()"> <i class="icon-user"></i> Change Password
											<span class="badge badge-danger">1</span>
									</a></li>
									<li><a href="#"> <i class="icon-calendar"></i> My
											Calendar
									</a></li>
									<li><a href="#"> <i class="icon-envelope-open"></i> My
											Inbox <span class="badge badge-danger"> 3 </span>
									</a></li>
									<li><a href="#"> <i class="icon-rocket"></i> My Tasks
											<span class="badge badge-success"> 7 </span>
									</a></li>
									<li class="divider"></li>
									<li><a href="#"> <i class="icon-lock"></i> Lock Screen
									</a></li>
									<li><a ui-sref="login"> <i class="icon-key"></i> Log
											Out
									</a></li>
								</ul>
							</div>
							<!-- END USER PROFILE -->

						</div>
						<!-- END TOPBAR ACTIONS -->
					</div>
				</div>
				<!--/container-->
			</nav>
		</header>
		<!-- END HEADER -->

		<!-- PAGE CONTENT-->
		<!-- BEGIN HEADER MENU -->
		<div menu-collateral></div>
		<!-- END HEADER MENU -->

		<%--<div class="container-fluid">
            <div class="page-content">
                <!-- BEGIN BREADCRUMBS -->
                &lt;%&ndash;<div class="breadcrumbs">
                    <h1>Dashboard</h1>
                    <ol class="breadcrumb">
                        <li>
                            <a href="#">Home</a>
                        </li>
                        <li class="active">Dashboard</li>
                    </ol>
                </div>&ndash;%&gt;
                <!-- END BREADCRUMBS -->


                <!-- BEGIN PAGE BASE CONTENT -->

                <div ui-view="content" class="fade-in-up"> </div>

                <!-- END PAGE BASE CONTENT -->
            </div>
        </div>--%>
	</div>

	<!-- BEGIN PAGE LEVEL SCRIPTS -->
	<script src="assets/pages/scripts/dashboard.js" type="text/javascript"></script>
	<!-- END PAGE LEVEL SCRIPTS -->
	<!-- BEGIN THEME LAYOUT SCRIPTS -->
	<script src="assets/layouts/layout/scripts/layout.js"
		type="text/javascript"></script>
	<script src="assets/layouts/global/scripts/quick-sidebar.min.js"
		type="text/javascript"></script>

	<!-- END THEME LAYOUT SCRIPTS -->

	<!-- BEGIN TEMPLATE DIRECTIVES-->
	<!--<script src="collateral-apps/directives/AngularMultiselectDual.js" type="text/javascript"></script>-->
	<!-- END TEMPLATE DIRECTIVES-->

</div>

<!-- BEGIN FOOTER -->
<div data-ng-include="'collateral-apps/views/footer.jsp'"
	data-ng-controller="FooterController"></div>
<!-- END FOOTER -->