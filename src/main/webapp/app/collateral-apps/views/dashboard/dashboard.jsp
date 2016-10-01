<!DOCTYPE html>
<!--[if IE 8]>
<html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]>
<html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en" ng-app="CollateralApp">
<!--<![endif]-->
<!-- BEGIN HEAD -->
<head>
    <meta charset="utf-8"/>
    <title>Collateral Management</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1" name="viewport"/>
    <meta content="" name="description"/>
    <meta content="" name="author"/>
    <!-- BEGIN GLOBAL MANDATORY STYLES -->

    <!-- bower:css -->
    <link rel="stylesheet" href="assets/vendor/jquery-ui/themes/smoothness/theme.css"/>
    <link rel="stylesheet" href="assets/vendor/jquery-ui/themes/smoothness/jquery-ui.min.css"/>
    <link rel="stylesheet" href="assets/vendor/bootstrap/dist/css/bootstrap.min.css"/>
    <link rel="stylesheet" href="assets/vendor/bootstrap/dist/css/bootstrap-theme.min.css"/>
    <link rel="stylesheet" href="assets/vendor/angular-toastr/dist/angular-toastr.css"/>
    <link rel="stylesheet" href="assets/vendor/split-pane/split-pane.css"/>
    <link rel="stylesheet" href="assets/vendor/world-flags-sprite/stylesheets/flags32.css"/>
    <!-- endbower -->

    <link href="http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700&subset=all" rel="stylesheet"
          type="text/css"/>
    <link href="assets/global/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css"/>
    <link href="assets/global/plugins/simple-line-icons/simple-line-icons.min.css" rel="stylesheet" type="text/css"/>
    <!--<link href="assets/global/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />-->
    <link href="assets/global/plugins/bootstrap-switch/css/bootstrap-switch.min.css" rel="stylesheet" type="text/css"/>
    <!-- END GLOBAL MANDATORY STYLES -->
    <!-- BEGIN PAGE LEVEL PLUGINS -->
    <link href="assets/global/plugins/bootstrap-daterangepicker/daterangepicker.min.css" rel="stylesheet"
          type="text/css"/>
    <link href="assets/global/plugins/morris/morris.css" rel="stylesheet" type="text/css"/>
    <link href="assets/global/plugins/fullcalendar/fullcalendar.min.css" rel="stylesheet" type="text/css"/>
    <link href="assets/global/plugins/jqvmap/jqvmap/jqvmap.css" rel="stylesheet" type="text/css"/>
    <!-- END PAGE LEVEL PLUGINS -->
    <!-- BEGIN THEME GLOBAL STYLES -->
    <link href="assets/global/css/components-md.min.css" rel="stylesheet" id="style_components" type="text/css"/>
    <link href="assets/global/css/plugins-md.min.css" rel="stylesheet" type="text/css"/>
    <!-- END THEME GLOBAL STYLES -->
    <!-- BEGIN THEME LAYOUT STYLES -->
    <link href="assets/layouts/layout/css/layout.min.css" rel="stylesheet" type="text/css"/>
    <!--<link href="assets/layouts/layout/css/themes/darkblue.min.css" rel="stylesheet" type="text/css" id="style_color" />-->
    <link href="assets/layouts/layout/css/themes/grey.min.css" rel="stylesheet" type="text/css" id="style_color"/>
    <link href="assets/layouts/layout/css/custom.css" rel="stylesheet" type="text/css"/>
    <!-- END THEME LAYOUT STYLES -->
    <link rel="shortcut icon" href="favicon.ico"/>
</head>
<!-- END HEAD -->

<body class="page-header-fixed page-sidebar-closed-hide-logo page-content-white page-md page-on-load"
      ng-controller="AppController">
<!-- BEGIN PAGE SPINNER -->
<div id="mainSpinnerBar" collateral-spinner-bar class="page-spinner-bar">
    <div class="bounce1"></div>
    <div class="bounce2"></div>
    <div class="bounce3"></div>
</div>
<!-- BEGIN HEADER -->
<div class="page-header navbar navbar-fixed-top">
    <!-- BEGIN HEADER INNER -->
    <div class="page-header-inner ">
        <!-- BEGIN LOGO -->
        <div class="page-logo">
            <a href="#">
                <!--<img src="assets/layouts/layout/img/logo.png" alt="logo" class="logo-default"/> </a-->
                <img src="assets/global/img/logo-common.png" alt="logo" class="logo-default"/> </a>
            <div class="menu-toggler sidebar-toggler">
                <span></span>
            </div>
        </div>
        <!-- END LOGO -->
        <!-- BEGIN RESPONSIVE MENU TOGGLER -->
        <a href="javascript:;" class="menu-toggler responsive-toggler" data-toggle="collapse"
           data-target=".navbar-collapse">
            <span></span>
        </a>
        <!-- END RESPONSIVE MENU TOGGLER -->
        <!-- BEGIN TOP NAVIGATION MENU -->
        <div class="top-menu">
            <ul class="nav navbar-nav pull-right">
                <!-- BEGIN NOTIFICATION DROPDOWN -->
                <!-- DOC: Apply "dropdown-dark" class after below "dropdown-extended" to change the dropdown styte -->
                <li class="dropdown dropdown-extended dropdown-notification" id="header_notification_bar">
                    <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown"
                       data-close-others="true">
                        <i class="icon-bell"></i>
                        <span class="badge badge-default"> 7 </span>
                    </a>
                    <ul class="dropdown-menu">
                        <li class="external">
                            <h3>
                                <span class="bold">12 pending</span> notifications</h3>
                            <a href="page_user_profile_1.html">view all</a>
                        </li>
                        <li>
                            <ul class="dropdown-menu-list scroller" style="height: 250px;" data-handle-color="#637283">
                                <li>
                                    <a href="javascript:;">
                                        <span class="time">just now</span>
                                                <span class="details">
                                                    <span class="label label-sm label-icon label-success">
                                                        <i class="fa fa-plus"></i>
                                                    </span> New user registered. </span>
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:;">
                                        <span class="time">3 mins</span>
                                                <span class="details">
                                                    <span class="label label-sm label-icon label-danger">
                                                        <i class="fa fa-bolt"></i>
                                                    </span> Server #12 overloaded. </span>
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:;">
                                        <span class="time">10 mins</span>
                                                <span class="details">
                                                    <span class="label label-sm label-icon label-warning">
                                                        <i class="fa fa-bell-o"></i>
                                                    </span> Server #2 not responding. </span>
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:;">
                                        <span class="time">14 hrs</span>
                                                <span class="details">
                                                    <span class="label label-sm label-icon label-info">
                                                        <i class="fa fa-bullhorn"></i>
                                                    </span> Application error. </span>
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:;">
                                        <span class="time">2 days</span>
                                                <span class="details">
                                                    <span class="label label-sm label-icon label-danger">
                                                        <i class="fa fa-bolt"></i>
                                                    </span> Database overloaded 68%. </span>
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:;">
                                        <span class="time">3 days</span>
                                                <span class="details">
                                                    <span class="label label-sm label-icon label-danger">
                                                        <i class="fa fa-bolt"></i>
                                                    </span> A user IP blocked. </span>
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:;">
                                        <span class="time">4 days</span>
                                                <span class="details">
                                                    <span class="label label-sm label-icon label-warning">
                                                        <i class="fa fa-bell-o"></i>
                                                    </span> Storage Server #4 not responding dfdfdfd. </span>
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:;">
                                        <span class="time">5 days</span>
                                                <span class="details">
                                                    <span class="label label-sm label-icon label-info">
                                                        <i class="fa fa-bullhorn"></i>
                                                    </span> System Error. </span>
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:;">
                                        <span class="time">9 days</span>
                                                <span class="details">
                                                    <span class="label label-sm label-icon label-danger">
                                                        <i class="fa fa-bolt"></i>
                                                    </span> Storage server failed. </span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <!-- END NOTIFICATION DROPDOWN -->
                <!-- BEGIN INBOX DROPDOWN -->
                <!-- DOC: Apply "dropdown-dark" class after below "dropdown-extended" to change the dropdown styte -->
                <li class="dropdown dropdown-extended dropdown-inbox" id="header_inbox_bar">
                    <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown"
                       data-close-others="true">
                        <i class="icon-envelope-open"></i>
                        <span class="badge badge-default"> 4 </span>
                    </a>
                    <ul class="dropdown-menu">
                        <li class="external">
                            <h3>You have
                                <span class="bold">7 New</span> Messages</h3>
                            <a href="app_inbox.html">view all</a>
                        </li>
                        <li>
                            <ul class="dropdown-menu-list scroller" style="height: 275px;" data-handle-color="#637283">
                                <li>
                                    <a href="#">
                                                <span class="photo">
                                                    <img src="assets/layouts/layout3/img/avatar2.jpg" class="img-circle"
                                                         alt=""> </span>
                                                <span class="subject">
                                                    <span class="from"> Lisa Wong </span>
                                                    <span class="time">Just Now </span>
                                                </span>
                                        <span class="message"> Vivamus sed auctor nibh congue nibh. auctor nibh auctor nibh... </span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                                <span class="photo">
                                                    <img src="assets/layouts/layout3/img/avatar3.jpg" class="img-circle"
                                                         alt=""> </span>
                                                <span class="subject">
                                                    <span class="from"> Richard Doe </span>
                                                    <span class="time">16 mins </span>
                                                </span>
                                        <span class="message"> Vivamus sed congue nibh auctor nibh congue nibh. auctor nibh auctor nibh... </span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                                <span class="photo">
                                                    <img src="assets/layouts/layout3/img/avatar1.jpg" class="img-circle"
                                                         alt=""> </span>
                                                <span class="subject">
                                                    <span class="from"> Bob Nilson </span>
                                                    <span class="time">2 hrs </span>
                                                </span>
                                        <span class="message"> Vivamus sed nibh auctor nibh congue nibh. auctor nibh auctor nibh... </span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                                <span class="photo">
                                                    <img src="assets/layouts/layout3/img/avatar2.jpg" class="img-circle"
                                                         alt=""> </span>
                                                <span class="subject">
                                                    <span class="from"> Lisa Wong </span>
                                                    <span class="time">40 mins </span>
                                                </span>
                                        <span class="message"> Vivamus sed auctor 40% nibh congue nibh... </span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                                <span class="photo">
                                                    <img src="assets/layouts/layout3/img/avatar3.jpg" class="img-circle"
                                                         alt=""> </span>
                                                <span class="subject">
                                                    <span class="from"> Richard Doe </span>
                                                    <span class="time">46 mins </span>
                                                </span>
                                        <span class="message"> Vivamus sed congue nibh auctor nibh congue nibh. auctor nibh auctor nibh... </span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <!-- END INBOX DROPDOWN -->
                <!-- BEGIN TODO DROPDOWN -->
                <!-- DOC: Apply "dropdown-dark" class after below "dropdown-extended" to change the dropdown styte -->
                <li class="dropdown dropdown-extended dropdown-tasks" id="header_task_bar">
                    <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown"
                       data-close-others="true">
                        <i class="icon-calendar"></i>
                        <span class="badge badge-default"> 3 </span>
                    </a>
                    <ul class="dropdown-menu extended tasks">
                        <li class="external">
                            <h3>You have
                                <span class="bold">12 pending</span> tasks</h3>
                            <a href="app_todo.html">view all</a>
                        </li>
                        <li>
                            <ul class="dropdown-menu-list scroller" style="height: 275px;" data-handle-color="#637283">
                                <li>
                                    <a href="javascript:;">
                                                <span class="task">
                                                    <span class="desc">New release v1.2 </span>
                                                    <span class="percent">30%</span>
                                                </span>
                                                <span class="progress">
                                                    <span style="width: 40%;" class="progress-bar progress-bar-success"
                                                          aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">
                                                        <span class="sr-only">40% Complete</span>
                                                    </span>
                                                </span>
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:;">
                                                <span class="task">
                                                    <span class="desc">Application deployment</span>
                                                    <span class="percent">65%</span>
                                                </span>
                                                <span class="progress">
                                                    <span style="width: 65%;" class="progress-bar progress-bar-danger"
                                                          aria-valuenow="65" aria-valuemin="0" aria-valuemax="100">
                                                        <span class="sr-only">65% Complete</span>
                                                    </span>
                                                </span>
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:;">
                                                <span class="task">
                                                    <span class="desc">Mobile app release</span>
                                                    <span class="percent">98%</span>
                                                </span>
                                                <span class="progress">
                                                    <span style="width: 98%;" class="progress-bar progress-bar-success"
                                                          aria-valuenow="98" aria-valuemin="0" aria-valuemax="100">
                                                        <span class="sr-only">98% Complete</span>
                                                    </span>
                                                </span>
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:;">
                                                <span class="task">
                                                    <span class="desc">Database migration</span>
                                                    <span class="percent">10%</span>
                                                </span>
                                                <span class="progress">
                                                    <span style="width: 10%;" class="progress-bar progress-bar-warning"
                                                          aria-valuenow="10" aria-valuemin="0" aria-valuemax="100">
                                                        <span class="sr-only">10% Complete</span>
                                                    </span>
                                                </span>
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:;">
                                                <span class="task">
                                                    <span class="desc">Web server upgrade</span>
                                                    <span class="percent">58%</span>
                                                </span>
                                                <span class="progress">
                                                    <span style="width: 58%;" class="progress-bar progress-bar-info"
                                                          aria-valuenow="58" aria-valuemin="0" aria-valuemax="100">
                                                        <span class="sr-only">58% Complete</span>
                                                    </span>
                                                </span>
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:;">
                                                <span class="task">
                                                    <span class="desc">Mobile development</span>
                                                    <span class="percent">85%</span>
                                                </span>
                                                <span class="progress">
                                                    <span style="width: 85%;" class="progress-bar progress-bar-success"
                                                          aria-valuenow="85" aria-valuemin="0" aria-valuemax="100">
                                                        <span class="sr-only">85% Complete</span>
                                                    </span>
                                                </span>
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:;">
                                                <span class="task">
                                                    <span class="desc">New UI release</span>
                                                    <span class="percent">38%</span>
                                                </span>
                                                <span class="progress progress-striped">
                                                    <span style="width: 38%;"
                                                          class="progress-bar progress-bar-important" aria-valuenow="18"
                                                          aria-valuemin="0" aria-valuemax="100">
                                                        <span class="sr-only">38% Complete</span>
                                                    </span>
                                                </span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <!-- END TODO DROPDOWN -->
                <!-- BEGIN USER LOGIN DROPDOWN -->
                <!-- DOC: Apply "dropdown-dark" class after below "dropdown-extended" to change the dropdown styte -->
                <li class="dropdown dropdown-user">
                    <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown"
                       data-close-others="true">
                        <img alt="" class="img-circle" src="assets/global/img/avatar.png"/>
                        <span class="username username-hide-on-mobile"> Hi, Username </span>
                        <i class="fa fa-angle-down"></i>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-default">
                        <li>
                            <a href="page_user_profile_1.html">
                                <i class="icon-user"></i> My Profile </a>
                        </li>
                        <li>
                            <a href="app_calendar.html">
                                <i class="icon-calendar"></i> My Calendar </a>
                        </li>
                        <li>
                            <a href="app_inbox.html">
                                <i class="icon-envelope-open"></i> My Inbox
                                <span class="badge badge-danger"> 3 </span>
                            </a>
                        </li>
                        <li>
                            <a href="app_todo.html">
                                <i class="icon-rocket"></i> My Tasks
                                <span class="badge badge-success"> 7 </span>
                            </a>
                        </li>
                        <li class="divider"></li>
                        <li>
                            <a href="page_user_lock_1.html">
                                <i class="icon-lock"></i> Lock Screen </a>
                        </li>
                        <li>
                            <a ui-sref="login" href="#/login"> <i class="icon-key"></i> Log Out</a>
                        </li>
                    </ul>
                </li>
                <!-- END USER LOGIN DROPDOWN -->
                <!-- BEGIN QUICK SIDEBAR TOGGLER -->
                <!-- DOC: Apply "dropdown-dark" class after below "dropdown-extended" to change the dropdown styte -->
                <li class="dropdown dropdown-quick-sidebar-toggler">
                    <a href="javascript:;" class="dropdown-toggle">
                        <i class="icon-logout"></i>
                    </a>
                </li>
                <!-- END QUICK SIDEBAR TOGGLER -->
            </ul>
        </div>
        <!-- END TOP NAVIGATION MENU -->
    </div>
    <!-- END HEADER INNER -->
</div>
<!-- END HEADER -->
<!-- BEGIN HEADER & CONTENT DIVIDER -->
<div class="clearfix"></div>
<!-- END HEADER & CONTENT DIVIDER -->
<!-- BEGIN CONTAINER -->
<div class="page-container">
    <!-- BEGIN SIDEBAR -->
    <div class="page-sidebar-wrapper">
        <!-- BEGIN SIDEBAR -->
        <!-- DOC: Set data-auto-scroll="false" to disable the sidebar from auto scrolling/focusing -->
        <!-- DOC: Change data-auto-speed="200" to adjust the sub menu slide up/down speed -->
        <div class="page-sidebar navbar-collapse collapse">
            <!-- BEGIN SIDEBAR MENU -->
            <!-- DOC: Apply "page-sidebar-menu-light" class right after "page-sidebar-menu" to enable light sidebar menu style(without borders) -->
            <!-- DOC: Apply "page-sidebar-menu-hover-submenu" class right after "page-sidebar-menu" to enable hoverable(hover vs accordion) sub menu mode -->
            <!-- DOC: Apply "page-sidebar-menu-closed" class right after "page-sidebar-menu" to collapse("page-sidebar-closed" class must be applied to the body element) the sidebar sub menu mode -->
            <!-- DOC: Set data-auto-scroll="false" to disable the sidebar from auto scrolling/focusing -->
            <!-- DOC: Set data-keep-expand="true" to keep the submenues expanded -->
            <!-- DOC: Set data-auto-speed="200" to adjust the sub menu slide up/down speed -->
            <ul class="page-sidebar-menu  page-header-fixed " data-keep-expanded="false" data-auto-scroll="true"
                data-slide-speed="200" style="padding-top: 20px">
                <!-- DOC: To remove the sidebar toggler from the sidebar you just need to completely remove the below "sidebar-toggler-wrapper" LI element -->
                <li class="sidebar-toggler-wrapper hide">
                    <!-- BEGIN SIDEBAR TOGGLER BUTTON -->
                    <div class="sidebar-toggler">
                        <span></span>
                    </div>
                    <!-- END SIDEBAR TOGGLER BUTTON -->
                </li>
                <!-- DOC: To remove the search box from the sidebar you just need to completely remove the below "sidebar-search-wrapper" LI element -->
                <li class="sidebar-search-wrapper">
                    <!-- BEGIN RESPONSIVE QUICK SEARCH FORM -->
                    <!-- DOC: Apply "sidebar-search-bordered" class the below search form to have bordered search box -->
                    <!-- DOC: Apply "sidebar-search-bordered sidebar-search-solid" class the below search form to have bordered & solid search box -->
                    <form class="sidebar-search  " action="page_general_search_3.html" method="POST">
                        <a href="javascript:;" class="remove">
                            <i class="icon-close"></i>
                        </a>
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="Search...">
                                    <span class="input-group-btn">
                                        <a href="javascript:;" class="btn submit">
                                            <i class="icon-magnifier"></i>
                                        </a>
                                    </span>
                        </div>
                    </form>
                    <!-- END RESPONSIVE QUICK SEARCH FORM -->
                </li>
                <li class="nav-item start open" id="collateral_management" data-tab-container="root">
                    <a href="javascript:;" class="nav-link nav-toggle">
                        <i class="icon-home"></i>
                        <span class="title">Collateral Management</span>
                        <!--<span class="selected"></span>-->
                        <span class="arrow open"></span>
                    </a>
                    <ul class="sub-menu open" style="display: block;">
                        <li class="nav-item start ">
                            <a href="#" class="nav-link " ng-click="displayTabMenu($event)" id="cm_agreements"
                               data-view="/collateral/agreements/index.html" unique>
                                <i class="fa fa-thumbs-o-up"></i>
                                <span class="title">Agreements</span>
                                <!--<span class="selected"></span>-->
                            </a>
                        </li>
                        <li class="nav-item start ">
                            <a href="#" class="nav-link " ng-click="displayTabMenu($event)" id="cm_margin_call"
                               data-view="/collateral/margin_call/main.html" unique>
                                <i class="fa fa-phone"></i>
                                <span class="title">Margin Call</span>
                                <!--<span class="badge badge-success">1</span>-->
                            </a>
                        </li>
                        <li class="nav-item start ">
                            <a href="#" class="nav-link " ng-click="displayTabMenu($event)" id="cm_interest"
                               data-view="/collateral/interest/main.html">
                                <i class="fa fa-calculator"></i>
                                <span class="title">Interest</span>
                                <span class="badge badge-info"></span>
                            </a>
                        </li>
                    </ul>
                </li><!-- #1 Collateral Management -->
                <li class="nav-item start" id="collateral_exposures" data-tab-container="root">
                    <a href="javascript:;" class="nav-link nav-toggle">
                        <i class="fa fa-warning"></i>
                        <span class="title">Collateral Exposures</span>
                        <!--<span class="selected"></span>-->
                        <span class="arrow"></span>
                    </a>
                    <ul class="sub-menu">
                        <li class="nav-item start ">
                            <a href="#" class="nav-link " ng-click="displayTabMenu($event)" id="ce_ussuer_risk"
                               data-view="/risk/issuer_risk.html" unique>
                                <i class=" "></i>
                                <span class="title">Issuer Risk</span>
                                <!--<span class="selected"></span>-->
                            </a>
                        </li>
                        <li class="nav-item start ">
                            <a href="#" class="nav-link " ng-click="displayTabMenu($event)" id="ce_country_risk"
                               data-view="/risk/country_risk.html" unique>
                                <i class=" "></i>
                                <span class="title">Country Risk</span>
                                <!--<span class="badge badge-success">1</span>-->
                            </a>
                        </li>
                        <li class="nav-item start ">
                            <a href="#" class="nav-link " ng-click="displayTabMenu($event)" id="ce_counterparty_risk"
                               data-view="/risk/counterparty_risk.html" unique>
                                <i class=" "></i>
                                <span class="title">Counterparty Risk </span>
                                <!--<span class="badge badge-danger">5</span>-->
                            </a>
                        </li>
                        <li class="nav-item start ">
                            <a href="#" class="nav-link " ng-click="displayTabMenu($event)" id="ce_fx_risk"
                               data-view="/risk/fx_risk.html" unique>
                                <i class=" "></i>
                                <span class="title">Fx Risk </span>
                                <!--<span class="badge badge-danger">5</span>-->
                            </a>
                        </li>
                    </ul>
                </li><!-- #2 Collateral Exposures -->
                <li class="nav-item start" id="static_data" data-tab-container="root">
                    <a href="javascript:;" class="nav-link nav-toggle">
                        <i class="fa fa-database"></i>
                        <span class="title">Static Data</span>
                        <!--<span class="selected"></span>-->
                        <span class="arrow"></span>
                    </a>
                    <ul class="sub-menu">
                        <li class="nav-item start">
                            <a href="#" class="nav-link " ng-click="displayTabMenu($event)" id="sd_legal_entity"
                               data-view="/static_data/LegalEntity/legal_entity.html" unique>
                                <i class="fa fa-bank"></i>
                                <span class="title">Legal Entities</span>
                                <!--<span class="selected"></span>-->
                            </a>
                        </li>
                        <li class="nav-item start ">
                            <a href="#" class="nav-link " ng-click="displayTabMenu($event)" id="sd_bilateral_agreements"
                               data-view="/static_data/BilateralAgreements/bilateral_a_add_search.html" unique>
                                <i class="fa fa-briefcase"></i>
                                <span class="title">Bilteral Agreements</span>
                                <!--<span class="badge badge-success">1</span>-->
                            </a>
                        </li>
                        <li class="nav-item start " id="sd_instruments" data-tab-container="static_data">
                            <a href="#" class="nav-link nav-toggle">
                                <i class="icon-graph"></i>
                                <span class="title">Instruments </span>
                                <!--<span class="badge badge-danger">5</span>-->
                                <span class="arrow"></span>
                            </a>
                            <ul class="sub-menu">
                                <li class="nav-item ">
                                    <a href="#" class="nav-link "
                                       ng-click="displayTabMenu($event)"
                                       id="sd_inst_bond_definition"
                                       data-view="/static_data/BilateralAgreements/bilateral_a_add_search.html" unique>
                                        <i class="fa fa-briefcase"></i>
                                        <span class="title">Bond definition</span>
                                    </a>
                                </li>
                                <li class="nav-item ">
                                    <a href="#" class="nav-link "
                                       id="sd_inst_equity_definition"
                                       data-view="#" unique>
                                        <i class="fa fa-briefcase"></i>
                                        <span class="title">Equity definition</span>
                                    </a>
                                </li>
                            </ul>

                        </li>
                    </ul>
                </li><!-- #3 Static Data -->
                <li class="nav-item start" id="integration_reporting" data-tab-container="root">
                    <a href="javascript:;" class="nav-link nav-toggle">
                        <i class="fa fa-edit"></i>
                        <span class="title">Integration and Reporting</span>
                        <!--<span class="selected"></span>-->
                        <span class="arrow"></span>
                    </a>
                    <ul class="sub-menu">
                        <li class="nav-item start ">
                            <a href="#" class="nav-link " ng-click="displayTabMenu($event)" id="ir_fpml_upload"
                               data-view="/integration_reporting/FpmlUpload/fpml_upload.html" unique>
                                <i class="fa fa-cloud-upload"></i>
                                <span class="title">FPML Upload </span>
                                <!--<span class="selected"></span>-->
                            </a>
                        </li>
                        <li class="nav-item start ">
                            <a href="#" class="nav-link " ng-click="displayTabMenu($event)" id="ir_man_files_upload"
                               data-view="/integration_reporting/ManualFileUpload/manual_file_upload.html" unique>
                                <i class="fa fa-upload"></i>
                                <span class="title">Manual Files upload </span>
                                <!--<span class="badge badge-success">1</span>-->
                            </a>
                        </li>
                        <li class="nav-item start ">
                            <a href="#" class="nav-link " ng-click="displayTabMenu($event)" id="ir_audit"
                               data-view="/integration_reporting/Integration/integration.html" unique>
                                <i class="fa fa-check-square-o"></i>
                                <span class="title">Audit </span>
                                <!--<span class="badge badge-danger">5</span>-->
                            </a>
                        </li>
                        <li class="nav-item start ">
                            <a href="#" class="nav-link " ng-click="displayTabMenu($event)" id="ir_report"
                               data-view="/integration_reporting/Integration/integration.html" unique>
                                <i class="fa fa-file-text"></i>
                                <span class="title">Reports </span>
                                <!--<span class="badge badge-danger">5</span>-->
                            </a>
                        </li>
                        <li class="nav-item start ">
                            <a href="#" class="nav-link " ng-click="displayTabMenu($event)" id="ir_scheduled_task"
                               data-view="/integration_reporting/ScheduledTask/scheduled_task.html" unique>
                                <i class="fa fa-play-circle-o"></i>
                                <span class="title">Scheduled Task </span>
                                <!--<span class="badge badge-danger">5</span>-->
                            </a>
                        </li>
                    </ul>
                </li><!-- #4 Integration & Reporting -->
                <li class="nav-item start" id="main_configuration" data-tab-container="root">
                    <a href="javascript:;" class="nav-link nav-toggle">
                        <i class="fa fa-cogs"></i>
                        <span class="title">Configuration</span>
                        <!--<span class="selected"></span>-->
                        <span class="arrow"></span>
                    </a>
                    <ul class="sub-menu">
                        <li class="nav-item start " id="configuration_" data-tab-container="main_configuration">
                            <a href="#" class="nav-link nav-toggle">
                                <i class="fa fa-users"></i>
                                <span class="title">Users management</span>
                                <!--<span class="badge badge-danger">5</span>-->
                                <span class="arrow"></span>
                            </a>
                            <ul class="sub-menu">
                                <li class="nav-item start ">
                                    <a href="#" class="nav-link "
                                       ng-click="displayTabMenu($event)" id="conf_users_management"
                                       data-view="/configuration/users_management/users.html" unique>
                                        <i class="fa fa-user"></i>
                                        <span class="title">User</span>
                                    </a>
                                </li>
                                <li class="nav-item start ">
                                    <a href="#" class="nav-link "
                                       ng-click="displayTabMenu($event)" id="conf_group_management"
                                       data-view="/configuration/users_management/groups.html" unique>
                                        <i class="fa fa-group"></i>
                                        <span class="title">Groups</span>
                                    </a>
                                </li>
                                <li class="nav-item start ">
                                    <a href="#" class="nav-link "
                                       ng-click="displayTabMenu($event)" id="conf_users_group"
                                       data-view="/configuration/users_management/users_group.html" unique>
                                        <i class="fa fa-user-plus"></i>
                                        <span class="title">Users - Group </span>
                                    </a>
                                </li>
                                <li class="nav-item start ">
                                    <a href="#" class="nav-link "
                                       ng-click="displayTabMenu($event)" id="conf_group_permission"
                                       data-view="/configuration/users_management/group_permission.html" unique>
                                        <i class="fa fa-unlock-alt"></i>
                                        <span class="title">Group Permissions</span>
                                    </a>
                                </li>
                            </ul>

                        </li>

                        <li class="nav-item start ">
                            <a href="#" class="nav-link ">
                                <i class="fa fa-code-fork"></i>
                                <span class="title">STP Workflows </span>
                                <!--<span class="badge badge-success">1</span>-->
                            </a>
                        </li>
                    </ul>
                </li><!-- #5 Configuration -->
                <li class="nav-item start">
                    <a href="javascript:;" class="nav-link nav-toggle">
                        <i class="fa fa-bar-chart"></i>
                        <span class="title">Analytics</span>
                        <!--<span class="selected"></span>-->
                        <span class="arrow"></span>
                    </a>
                    <ul class="sub-menu">
                        <li class="nav-item start ">
                            <a href="#" class="nav-link ">
                                <i class="icon-bar-chart"></i>
                                <span class="title disabled">Portfolio analysis </span>
                                <!--<span class="selected"></span>-->
                            </a>
                        </li>
                        <li class="nav-item start ">
                            <a href="#" class="nav-link ">
                                <i class="icon-bulb"></i>
                                <span class="title disabled">Trade analysis </span>
                                <!--<span class="badge badge-success">1</span>-->
                            </a>
                        </li>
                        <li class="nav-item start ">
                            <a href="#" class="nav-link ">
                                <i class="icon-graph"></i>
                                <span class="title disabled">What-if simulation </span>
                                <!--<span class="badge badge-danger">5</span>-->
                            </a>
                        </li>
                    </ul>
                </li><!-- #6 Analytics -->
                <li class="nav-item start">
                    <a href="javascript:;" class="nav-link nav-toggle">
                        <i class="fa fa-line-chart"></i>
                        <span class="title">Market Data </span>
                        <!--<span class="selected"></span>-->
                        <span class="arrow"></span>
                    </a>
                    <ul class="sub-menu">
                        <li class="nav-item start">
                            <a href="#" class="nav-link nav-toggle">
                                <i class="icon-bar-chart"></i>
                                <span class="title">Closing prices</span>
                                <!--<span class="selected"></span>-->
                                <span class="arrow"></span>
                            </a>
                            <ul class="sub-menu">
                                <li class="nav-item ">
                                    <a href="#" class="nav-link ">FX </a>
                                </li>
                                <li class="nav-item ">
                                    <a href="#" class="nav-link ">Bonds </a>
                                </li>
                                <li class="nav-item ">
                                    <a href="#" class="nav-link ">Equities </a>
                                </li>
                            </ul>

                        </li>
                    </ul>
                </li><!-- #7 Market Data -->
                <li class="nav-item start" id="cm_user_messages" data-tab-container="root">
                    <a href="javascript:;" class="nav-link nav-toggle">
                        <i class="fa fa-envelope-o"></i>
                        <span class="title">User Messages</span>
                        <!--<span class="selected"></span>-->
                        <span class="arrow"></span>
                    </a>
                    <ul class="sub-menu">
                        <li class="nav-item start ">
                            <a href="#" class="nav-link " ng-click="displayTabMenu($event)" id="cm_um_meesages"
                               data-view="/user_message/messages.html" unique>
                                <i class="fa fa-envelope-o"></i>
                                <span class="title">User Messages </span>
                                <!--<span class="selected"></span>-->
                            </a>
                        </li>
                    </ul>
                </li><!-- #8 User Messages -->


            </ul>

            <!-- END SIDEBAR MENU -->
            <!-- END SIDEBAR MENU -->
        </div>
        <!-- END SIDEBAR -->
    </div>
    <!-- END SIDEBAR -->
    <!-- BEGIN CONTENT -->
    <div class="page-content-wrapper">
        <!-- BEGIN CONTENT BODY -->
        <div class="page-content">
            <!-- BEGIN PAGE HEADER-->

            <!-- BEGIN PAGE BAR -->
            <!--<div class="page-bar">
                <ul class="page-breadcrumb">
                    <li>
                        <a href="index.html">Home</a>
                        <i class="fa fa-circle"></i>
                    </li>
                    <li>
                        <span>Dashboard</span>
                    </li>
                </ul>
                <div class="page-toolbar">
                    <div id="dashboard-report-range" class="pull-right tooltips btn btn-sm" data-container="body"
                         data-placement="bottom" data-original-title="Change dashboard date range">
                        <i class="icon-calendar"></i>&nbsp;
                        <span class="thin uppercase hidden-xs"></span>&nbsp;
                        <i class="fa fa-angle-down"></i>
                    </div>
                </div>
            </div>-->
            <!-- END PAGE BAR -->
            <!-- END PAGE HEADER-->

            <!-- BEGIN HEADER MENU -->
            <div menu-collateral></div>

        </div>
        <!-- END CONTENT BODY -->
    </div>
    <!-- END CONTENT -->
    <!-- BEGIN QUICK SIDEBAR -->
    <a href="javascript:;" class="page-quick-sidebar-toggler">
        <i class="icon-login"></i>
    </a>
    <div class="page-quick-sidebar-wrapper" data-close-on-body-click="false">
        <div class="page-quick-sidebar">
            <ul class="nav nav-tabs">
                <li class="active">
                    <a href="javascript:;" data-target="#quick_sidebar_tab_1" data-toggle="tab"> Users
                        <span class="badge badge-danger">2</span>
                    </a>
                </li>
                <li>
                    <a href="javascript:;" data-target="#quick_sidebar_tab_2" data-toggle="tab"> Alerts
                        <span class="badge badge-success">7</span>
                    </a>
                </li>
            </ul>
            <div class="tab-content">
                <div class="tab-pane active page-quick-sidebar-chat" id="quick_sidebar_tab_1">
                    <div class="page-quick-sidebar-chat-users" data-rail-color="#ddd"
                         data-wrapper-class="page-quick-sidebar-list">
                        <!--<h3 class="list-heading">Staff</h3>
                        <ul class="media-list list-items">
                            <li class="media">
                                <div class="media-status">
                                    <span class="badge badge-success">8</span>
                                </div>
                                <img class="media-object" src="assets/layouts/layout/img/avatar3.jpg" alt="...">
                                <div class="media-body">
                                    <h4 class="media-heading">Bob Nilson</h4>
                                    <div class="media-heading-sub"> Project Manager </div>
                                </div>
                            </li>
                        </ul>-->
                    </div>
                    <div class="page-quick-sidebar-item">
                        <div class="page-quick-sidebar-chat-user">
                            <div class="page-quick-sidebar-nav">
                                <a href="javascript:;" class="page-quick-sidebar-back-to-list">
                                    <i class="icon-arrow-left"></i>Back</a>
                            </div>
                            <div class="page-quick-sidebar-chat-user-messages">
                                <!--<div class="post out">
                                    <img class="avatar" alt="" src="assets/layouts/layout/img/avatar3.jpg" />
                                    <div class="message">
                                        <span class="arrow"></span>
                                        <a href="javascript:;" class="name">Bob Nilson</a>
                                        <span class="datetime">20:15</span>
                                        <span class="body"> When could you send me the report ? </span>
                                    </div>
                                </div>
                                <div class="post in">
                                    <img class="avatar" alt="" src="assets/layouts/layout/img/avatar2.jpg" />
                                    <div class="message">
                                        <span class="arrow"></span>
                                        <a href="javascript:;" class="name">Ella Wong</a>
                                        <span class="datetime">20:15</span>
                                        <span class="body"> Its almost done. I will be sending it shortly </span>
                                    </div>
                                </div>-->
                            </div>
                            <div class="page-quick-sidebar-chat-user-form">
                                <div class="input-group">
                                    <input type="text" class="form-control" placeholder="Type a message here...">
                                    <div class="input-group-btn">
                                        <button type="button" class="btn green">
                                            <i class="icon-paper-clip"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tab-pane page-quick-sidebar-alerts" id="quick_sidebar_tab_2">
                    <div class="page-quick-sidebar-alerts-list">
                        <h3 class="list-heading">General</h3>
                        <ul class="feeds list-items">
                            <!--<li>
                                <div class="col1">
                                    <div class="cont">
                                        <div class="cont-col1">
                                            <div class="label label-sm label-info">
                                                <i class="fa fa-check"></i>
                                            </div>
                                        </div>
                                        <div class="cont-col2">
                                            <div class="desc"> You have 4 pending tasks.
                                                <span class="label label-sm label-warning "> Take action
                                                    <i class="fa fa-share"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col2">
                                    <div class="date"> Just now </div>
                                </div>
                            </li>-->
                        </ul>
                    </div>
                </div>
                <div class="tab-pane page-quick-sidebar-settings" id="quick_sidebar_tab_3">
                    <div class="page-quick-sidebar-settings-list">
                        <h3 class="list-heading">General Settings</h3>
                        <ul class="list-items borderless">
                            <li> Enable Notifications
                                <input type="checkbox" class="make-switch" checked data-size="small"
                                       data-on-color="success" data-on-text="ON" data-off-color="default"
                                       data-off-text="OFF"></li>
                            <li> Allow Tracking
                                <input type="checkbox" class="make-switch" data-size="small" data-on-color="info"
                                       data-on-text="ON" data-off-color="default" data-off-text="OFF"></li>
                            <li> Log Errors
                                <input type="checkbox" class="make-switch" checked data-size="small"
                                       data-on-color="danger" data-on-text="ON" data-off-color="default"
                                       data-off-text="OFF"></li>
                            <li> Auto Sumbit Issues
                                <input type="checkbox" class="make-switch" data-size="small" data-on-color="warning"
                                       data-on-text="ON" data-off-color="default" data-off-text="OFF"></li>
                            <li> Enable SMS Alerts
                                <input type="checkbox" class="make-switch" checked data-size="small"
                                       data-on-color="success" data-on-text="ON" data-off-color="default"
                                       data-off-text="OFF"></li>
                        </ul>
                        <h3 class="list-heading">System Settings</h3>
                        <ul class="list-items borderless">
                            <li> Security Level
                                <select class="form-control input-inline input-sm input-small">
                                    <option value="1">Normal</option>
                                    <option value="2" selected>Medium</option>
                                    <option value="e">High</option>
                                </select>
                            </li>
                            <li> Failed Email Attempts
                                <input class="form-control input-inline input-sm input-small" value="5"/></li>
                            <li> Secondary SMTP Port
                                <input class="form-control input-inline input-sm input-small" value="3560"/></li>
                            <li> Notify On System Error
                                <input type="checkbox" class="make-switch" checked data-size="small"
                                       data-on-color="danger" data-on-text="ON" data-off-color="default"
                                       data-off-text="OFF"></li>
                            <li> Notify On SMTP Error
                                <input type="checkbox" class="make-switch" checked data-size="small"
                                       data-on-color="warning" data-on-text="ON" data-off-color="default"
                                       data-off-text="OFF"></li>
                        </ul>
                        <div class="inner-content">
                            <button class="btn btn-success">
                                <i class="icon-settings"></i> Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- END QUICK SIDEBAR -->
</div>
<!-- END CONTAINER -->
<!--[if lt IE 9]>
<script src="assets/global/plugins/respond.min.js"></script>
<script src="assets/global/plugins/excanvas.min.js"></script>
<![endif]-->
<!-- BEGIN CORE PLUGINS -->

<!-- CORE SCRIPTS -->
<script src="assets/pages/scripts/dashboard.js" type="text/javascript"></script>

</body>
<script>
    $(document).ready(function () {
        $("#mainSpinnerBar").hide("400");
    })
</script>
</html>