<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js" data-ng-app="CollateralApp"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js" data-ng-app="CollateralApp"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en" data-ng-app="CollateralApp">
<!--<![endif]-->
<!-- BEGIN HEAD -->

<head>

    <!-- bower:css -->
    <link rel="stylesheet" href="assets/vendor/jquery-ui/themes/smoothness/theme.css"/>
    <link rel="stylesheet" href="assets/vendor/jquery-ui/themes/smoothness/jquery-ui.min.css"/>
    <link rel="stylesheet" href="assets/vendor/bootstrap/dist/css/bootstrap.min.css"/>
    <link rel="stylesheet" href="assets/vendor/bootstrap/dist/css/bootstrap-theme.min.css"/>
    <link rel="stylesheet" href="assets/vendor/angular-toastr/dist/angular-toastr.css"/>
    <!-- endbower -->

    <title data-ng-bind="'Collateral | ' + $state.current.data.pageTitle"></title>
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1" name="viewport"/>
    <meta content="" name="description"/>
    <meta content="" name="author"/>

    <!-- BEGIN GLOBAL MANDATORY STYLES -->
    <!--link href="http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700&subset=all" rel="stylesheet"
          type="text/css"/-->
    <link href="assets/global/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css"/>
    <link href="assets/global/plugins/simple-line-icons/simple-line-icons.min.css" rel="stylesheet" type="text/css"/>
    <link href="assets/global/plugins/bootstrap-switch/css/bootstrap-switch.min.css" rel="stylesheet" type="text/css"/>
    <!-- END GLOBAL MANDATORY STYLES -->

    <!-- BEGIN PAGE LEVEL PLUGINS -->
    <link href="assets/global/plugins/bootstrap-daterangepicker/daterangepicker.min.css" rel="stylesheet"
          type="text/css"/>
    <link href="assets/global/plugins/morris/morris.css" rel="stylesheet" type="text/css"/>
    <link href="assets/global/plugins/fullcalendar/fullcalendar.min.css" rel="stylesheet" type="text/css"/>
    <link href="assets/global/plugins/jqvmap/jqvmap/jqvmap.css" rel="stylesheet" type="text/css"/>
    <!-- END PAGE LEVEL PLUGINS -->

    <!-- BEGIN DYMANICLY LOADED CSS FILES(all plugin and page related styles must be loaded between GLOBAL and THEME css files ) -->
    <link id="ng_load_plugins_before"/>
    <!-- END DYMANICLY LOADED CSS FILES -->

    <!-- BEGIN THEME STYLES -->

    <!-- BEGIN THEME GLOBAL STYLES -->
    <link href="assets/global/css/components.css" rel="stylesheet" id="style_components" type="text/css"/>
    <link href="assets/global/css/plugins-md.min.css" rel="stylesheet" type="text/css"/>
    <!-- END THEME GLOBAL STYLES -->

    <!-- BEGIN THEME LAYOUT STYLES -->
    <link href="assets/layouts/layout/css/layout.min.css" rel="stylesheet" type="text/css"/>
    <link href="assets/layouts/layout/css/custom.css" rel="stylesheet" type="text/css"/>
    <!-- END THEME LAYOUT STYLES -->

    <!-- END THEME STYLES -->

    <link rel="shortcut icon" href="favicon.ico"/>
</head>

<!-- END HEAD -->
<!-- BEGIN BODY -->
<!-- DOC: Apply "page-header-menu-fixed" class to set the mega menu fixed  -->
<!-- DOC: Apply "page-header-top-fixed" class to set the top menu fixed  -->

<body ng-controller="AppController" class="page-on-load">

<!-- bower:js -->
<script src="assets/vendor/jquery/dist/jquery.js"></script>
<script src="assets/vendor/jquery-ui/jquery-ui.min.js"></script>
<script src="assets/vendor/bootstrap/dist/js/bootstrap.min.js"></script>
<script src="assets/vendor/angular/angular.js"></script>
<script src="assets/vendor/angular-ui-router/release/angular-ui-router.js"></script>
<script src="assets/vendor/angular-bootstrap/ui-bootstrap-tpls.js"></script>
<script src="assets/vendor/angular-scroll/angular-scroll.js"></script>
<script src="assets/vendor/angular-animate/angular-animate.js"></script>
<script src="assets/vendor/angular-aria/angular-aria.js"></script>
<script src="assets/vendor/angular-resource/angular-resource.js"></script>
<script src="assets/vendor/angular-cookies/angular-cookies.js"></script>
<script src="assets/vendor/angular-touch/angular-touch.js"></script>
<script src="assets/vendor/angular-sanitize/angular-sanitize.js"></script>
<script src="assets/vendor/angular-local-storage/dist/angular-local-storage.js"></script>
<script src="assets/vendor/oclazyload/dist/ocLazyLoad.js"></script>
<script src="assets/vendor/angular-toastr/dist/angular-toastr.tpls.js"></script>
<!-- endbower -->

<!-- BEGIN PAGE SPINNER -->
<div collateral-spinner-bar class="page-spinner-bar">
    <div class="bounce1"></div>
    <div class="bounce2"></div>
    <div class="bounce3"></div>
</div>
<!-- END PAGE SPINNER -->
<!-- BEGIN HEADER -->
<!--<div ui-view="header" class="page-header"> </div>-->
<!-- END HEADER -->
<div class="clearfix"></div>
<!-- BEGIN CONTAINER -->
<div class="page-container">
    <!-- BEGIN PAGE HEAD -->
    <!--<div data-ng-include="'collateral-apps/views/page-head.html'" data-ng-controller="PageHeadController" class="page-head"> </div>-->
    <!-- END PAGE HEAD -->
    <!-- BEGIN PAGE CONTENT -->
    <div class="page-content">
        <!-- BEGIN ACTUAL CONTENT -->
        <div ui-view="main-content" class="fade-in-up"></div>
        <!-- END ACTUAL CONTENT -->
    </div>
    <!-- END PAGE CONTENT -->
</div>
<!-- END CONTAINER -->
<!-- BEGIN FOOTER -->
<!--<div data-ng-include="'collateral-apps/views/footer.jsp'" data-ng-controller="FooterController"> </div>-->
<!-- END FOOTER -->
<!-- BEGIN JAVASCRIPTS(Load javascripts at bottom, this will reduce page load time) -->

<!-- BEGIN CORE JQUERY PLUGINS -->
<!--[if lt IE 9]>
<script src="assets/global/plugins/respond.min.js"></script>
<script src="assets/global/plugins/excanvas.min.js"></script>
<![endif]-->
<script src="assets/global/plugins/jquery-migrate.min.js" type="text/javascript"></script>
<script src="assets/global/plugins/bootstrap-hover-dropdown/bootstrap-hover-dropdown.min.js"
        type="text/javascript"></script>
<script src="assets/global/plugins/jquery-slimscroll/jquery.slimscroll.min.js" type="text/javascript"></script>
<script src="assets/global/plugins/jquery.blockui.min.js" type="text/javascript"></script>
<script src="assets/global/plugins/js.cookie.min.js" type="text/javascript"></script>
<script src="assets/global/plugins/bootstrap-switch/js/bootstrap-switch.min.js" type="text/javascript"></script>
<!-- END CORE JQUERY PLUGINS -->

<!-- BEGIN CORE ANGULARJS PLUGINS -->
<!-- END CORE ANGULARJS PLUGINS -->


<!-- BEGIN PAGE LEVEL PLUGINS -->
<script src="assets/global/plugins/moment.min.js" type="text/javascript"></script>
<script src="assets/global/plugins/bootstrap-daterangepicker/daterangepicker.min.js" type="text/javascript"></script>
<script src="assets/global/plugins/morris/morris.min.js" type="text/javascript"></script>
<script src="assets/global/plugins/morris/raphael-min.js" type="text/javascript"></script>
<script src="assets/global/plugins/counterup/jquery.waypoints.min.js" type="text/javascript"></script>
<script src="assets/global/plugins/counterup/jquery.counterup.min.js" type="text/javascript"></script>
<%--
<script src="assets/global/plugins/amcharts/amcharts/amcharts.js" type="text/javascript"></script>
<script src="assets/global/plugins/amcharts/amcharts/serial.js" type="text/javascript"></script>
<script src="assets/global/plugins/amcharts/amcharts/pie.js" type="text/javascript"></script>
<script src="assets/global/plugins/amcharts/amcharts/radar.js" type="text/javascript"></script>
<script src="assets/global/plugins/amcharts/amcharts/themes/light.js" type="text/javascript"></script>
<script src="assets/global/plugins/amcharts/amcharts/themes/patterns.js" type="text/javascript"></script>
<script src="assets/global/plugins/amcharts/amcharts/themes/chalk.js" type="text/javascript"></script>
<script src="assets/global/plugins/amcharts/ammap/ammap.js" type="text/javascript"></script>
<script src="assets/global/plugins/amcharts/ammap/maps/js/worldLow.js" type="text/javascript"></script>
<script src="assets/global/plugins/amcharts/amstockcharts/amstock.js" type="text/javascript"></script>
--%>
<script src="assets/global/plugins/fullcalendar/fullcalendar.min.js" type="text/javascript"></script>
<script src="assets/global/plugins/horizontal-timeline/horozontal-timeline.min.js" type="text/javascript"></script>
<script src="assets/global/plugins/flot/jquery.flot.min.js" type="text/javascript"></script>
<script src="assets/global/plugins/flot/jquery.flot.resize.min.js" type="text/javascript"></script>
<script src="assets/global/plugins/flot/jquery.flot.categories.min.js" type="text/javascript"></script>
<script src="assets/global/plugins/jquery-easypiechart/jquery.easypiechart.min.js" type="text/javascript"></script>
<script src="assets/global/plugins/jquery.sparkline.min.js" type="text/javascript"></script>
<script src="assets/global/plugins/jqvmap/jqvmap/jquery.vmap.js" type="text/javascript"></script>
<script src="assets/global/plugins/jqvmap/jqvmap/maps/jquery.vmap.russia.js" type="text/javascript"></script>
<script src="assets/global/plugins/jqvmap/jqvmap/maps/jquery.vmap.world.js" type="text/javascript"></script>
<script src="assets/global/plugins/jqvmap/jqvmap/maps/jquery.vmap.europe.js" type="text/javascript"></script>
<script src="assets/global/plugins/jqvmap/jqvmap/maps/jquery.vmap.germany.js" type="text/javascript"></script>
<script src="assets/global/plugins/jqvmap/jqvmap/maps/jquery.vmap.usa.js" type="text/javascript"></script>
<script src="assets/global/plugins/jqvmap/jqvmap/data/jquery.vmap.sampledata.js" type="text/javascript"></script>
<!-- END PAGE LEVEL PLUGINS -->

<!-- UI GRID PLUGIN BEGIN -->
<script src="assets/vendor/pdfmake/build/pdfmake.min.js" type="text/javascript"></script>
<script src="assets/vendor/pdfmake/build/vfs_fonts.js" type="text/javascript"></script>
<script src="assets/vendor/angular-ui-grid/ui-grid.min.js" type="text/javascript"></script>
<link href="assets/vendor/angular-ui-grid/ui-grid.min.css" rel="stylesheet" type="text/css"/>
<!-- UI GRID PLUGIN END -->

<!-- BEGIN THEME GLOBAL SCRIPTS -->
<script src="assets/global/scripts/app.min.js" type="text/javascript"></script>
<script src="assets/layouts/layout/scripts/layout.min.js" type="text/javascript"></script>
<script src="collateral-apps/main.js" type="text/javascript"></script>
<script src="collateral-apps/services/ConfigUrlService.js" type="text/javascript"></script>
<!-- END THEME GLOBAL SCRIPTS -->

<!-- BEGIN APP LEVEL ANGULARJS SCRIPTS -->
<script src="collateral-apps/directives/collateralSpinnerBar.js" type="text/javascript"></script>
<!-- END APP LEVEL ANGULARJS SCRIPTS -->

<!-- END JAVASCRIPTS -->
</body>
<!-- END BODY -->

</html>