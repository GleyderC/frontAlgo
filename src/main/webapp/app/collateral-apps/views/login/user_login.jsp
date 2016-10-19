<div class="login" ng-controller="LoginController">
    <!-- BEGIN LOGO -->
    <div class="logo">
        <div class="logo-container">
            <img src="assets/global/img/logo-common.png" alt="Logo"/>
            <img src="assets/global/img/logo-collateral.png" alt="Logo"/>
        </div>
    </div>
    <!-- END LOGO -->


    <!-- BEGIN LOGIN -->
    <div class="content">
        <!-- BEGIN LOGIN FORM -->
        <form name="loginForm" ng-submit="submit()" class="login-form" action="#home" method="post">
            <h3 class="form-title font-green">Sign In</h3>
            <div class="alert alert-danger display-hide">
                <button class="close" data-close="alert"></button>
                <span> Enter any username and password. </span>
            </div>
            <div class="form-group">
                <!--ie8, ie9 does not support html5 placeholder, so we just show field title for that-->
                <label class="control-label visible-ie8 visible-ie9">Username</label>
                <input id="username" class="form-control form-control-solid placeholder-no-fix" type="text"
                       autocomplete="off" placeholder="Username" name="username" ng-model="username" required/></div>
            <div class="form-group">
                <label class="control-label visible-ie8 visible-ie9">Password</label>
                <input id="password" class="form-control form-control-solid placeholder-no-fix" type="password"
                       autocomplete="off" placeholder="Password" name="password" ng-model="password" required/></div>
            <div class="form-actions">
                <button type="submit" class="btn green uppercase">Login</button>
                <label class="rememberme check mt-checkbox mt-checkbox-outline">
                    <input type="checkbox" name="remember" value="1"/>Remember
                    <span></span>
                </label>
                <a href="javascript:;" id="forget-password" class="forget-password">Forgot Password?</a>
            </div>
            <div class="login-options">
                <h4>Choose your language:</h4>
                <select CLASS="form-control input-medium" ng-model="langsList.selected" ng-change="changeLanguage()" ng-options="language.name for language in langsList track by language.key"></select>
            </div>
        </form>
        <!-- END LOGIN FORM -->
        <!-- BEGIN FORGOT PASSWORD FORM -->
        <form class="forget-form"  action="#" method="post">
            <h3 class="font-green">Forget Password ?</h3>
            <p> Enter your e-mail address below to reset your password. </p>
            <div class="form-group">
                <input class="form-control placeholder-no-fix" type="text" autocomplete="off" placeholder="Email"
                       name="email"/></div>
            <div class="form-actions">
                <button type="button" id="back-btn" class="btn green btn-outline">Back</button>
                <button type="submit" class="btn btn-success uppercase pull-right">Save</button>
            </div>
        </form>
        <!-- END FORGOT PASSWORD FORM -->


        <script>
            $(document).ready(function () {
                $("#username").focus();
            });
        </script>
    </div>

    <!-- BEGIN PAGE LEVEL SCRIPTS -->
    <script src="assets/pages/scripts/login.min.js" type="text/javascript"></script>
    <!-- END PAGE LEVEL SCRIPTS -->
    <!-- BEGIN THEME LAYOUT SCRIPTS -->
    <!-- END THEME LAYOUT SCRIPTS -->
</div>