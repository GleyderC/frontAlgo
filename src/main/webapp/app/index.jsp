<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js" data-ng-app="CollateralApp"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js" data-ng-app="CollateralApp"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en" data-ng-app="CollateralApp">
<!--<![endif]-->
<!-- BEGIN HEAD -->

<head>

    <!-- bower:css -->
    <link rel="stylesheet" href="assets/vendor/jquery-ui/themes/smoothness/theme.css" />
    <link rel="stylesheet" href="assets/vendor/jquery-ui/themes/smoothness/jquery-ui.min.css" />
    <link rel="stylesheet" href="assets/vendor/bootstrap/dist/css/bootstrap.min.css" />
    <link rel="stylesheet" href="assets/vendor/bootstrap/dist/css/bootstrap-theme.min.css" />
    <link rel="stylesheet" href="assets/vendor/angular-toastr/dist/angular-toastr.css" />
    <link rel="stylesheet" href="assets/vendor/split-pane/split-pane.css" />
    <link rel="stylesheet" href="assets/vendor/world-flags-sprite/stylesheets/flags32.css" />
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

    <!-- BEGIN SPLIT PANE -->
    <link href="assets/global/css/pretty-split-pane.css" rel="stylesheet" type="text/css"/>
    <!-- END SPLIT PANE -->


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
    <link href="assets/layouts/layout/css/custom-responsive.css" rel="stylesheet" type="text/css"/>

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
<script src="assets/vendor/sifter/sifter.js"></script>
<script src="assets/vendor/microplugin/src/microplugin.js"></script>
<script src="assets/vendor/angular-toastr/dist/angular-toastr.tpls.js"></script>
<script src="assets/vendor/angular-input-masks/angular-input-masks-standalone.js"></script>
<script src="assets/vendor/angular-websocket/dist/angular-websocket.js"></script>
<script src="assets/vendor/split-pane/split-pane.js"></script>
<script src="assets/vendor/angular-split-pane/angular-split-pane.js"></script>
<script src="assets/vendor/angular-md5/angular-md5.js"></script>
<script src="assets/vendor/ng-file-upload/ng-file-upload.js"></script>
<script src="assets/vendor/ng-file-upload-shim/ng-file-upload-shim.js"></script>
<script src="assets/vendor/ace-builds/src-min-noconflict/ace.js"></script>
<script src="assets/vendor/angular-ui-ace/ui-ace.js"></script>
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
<script src="assets/global/plugins/bootstrap-hover-dropdown/bootstrap-hover-dropdown.min.js"
        type="text/javascript"></script>
<script src="assets/global/plugins/bootstrap-switch/js/bootstrap-switch.min.js" type="text/javascript"></script>
<!-- END CORE JQUERY PLUGINS -->

<!-- BEGIN PAGE LEVEL PLUGINS -->
<script src="assets/global/plugins/moment.min.js" type="text/javascript"></script>

<!-- END PAGE LEVEL PLUGINS -->

<!-- UI GRID PLUGIN BEGIN -->
<script src="assets/vendor/pdfmake/build/pdfmake.min.js" type="text/javascript"></script>
<script src="assets/vendor/pdfmake/build/vfs_fonts.js" type="text/javascript"></script>
<script src="assets/vendor/angular-ui-grid/ui-grid.min.js" type="text/javascript"></script>
<link href="assets/vendor/angular-ui-grid/ui-grid.min.css" rel="stylesheet" type="text/css"/>
<!-- UI GRID PLUGIN END -->

<!-- HiGHT CHART -->
<script src="assets/global/plugins/highcharts/js/highcharts.js" type="text/javascript"></script>
<script src="assets/global/plugins/highcharts/js/highcharts-3d.js" type="text/javascript"></script>
<script src="assets/global/plugins/highmaps/js/modules/map.js"></script>
<script src="assets/global/plugins/highmaps/js/custom/world.js"></script>
<script src="assets/global/plugins/highcharts/js/modules/exporting.js" type="text/javascript"></script>
<script src="assets/global/plugins/highcharts/js/modules/offline-exporting.js" type="text/javascript"></script>

<!--Angular Web Socket  -->
<script src="assets/vendor/angular-websocket/dist/angular-websocket.min.js" type="text/javascript"></script>

<!-- HiGHT END -->

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