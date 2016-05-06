<div class="login" ng-controller="LoginController">
    <!-- BEGIN LOGO -->
    <div class="logo">
        <a href="#">
            <img src="assets/global/img/logo-collateral-white.png" alt="" width="280px" height="auto"/> </a>
    </div>
    <!-- END LOGO -->


    <!-- BEGIN LOGIN -->
    <div class="content">
        <!-- BEGIN LOGIN FORM -->
        <form name="loginForm" class="login-form" action="#home" method="post">
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
                <h4>Or login with</h4>
                <ul class="social-icons">
                    <li>
                        <a class="social-icon-color facebook" data-original-title="facebook" href="javascript:;"></a>
                    </li>
                    <li>
                        <a class="social-icon-color twitter" data-original-title="Twitter" href="javascript:;"></a>
                    </li>
                    <li>
                        <a class="social-icon-color googleplus" data-original-title="Goole Plus"
                           href="javascript:;"></a>
                    </li>
                    <li>
                        <a class="social-icon-color linkedin" data-original-title="Linkedin" href="javascript:;"></a>
                    </li>
                </ul>
            </div>
        </form>
        <!-- END LOGIN FORM -->
        <!-- BEGIN FORGOT PASSWORD FORM -->
        <form class="forget-form" action="index.html" method="post">
            <h3 class="font-green">Forget Password ?</h3>
            <p> Enter your e-mail address below to reset your password. </p>
            <div class="form-group">
                <input class="form-control placeholder-no-fix" type="text" autocomplete="off" placeholder="Email"
                       name="email"/></div>
            <div class="form-actions">
                <button type="button" id="back-btn" class="btn green btn-outline">Back</button>
                <button type="submit" class="btn btn-success uppercase pull-right">Submit</button>
            </div>
        </form>
        <!-- END FORGOT PASSWORD FORM -->


        <script>
            $(document).ready(function () {
                $("#username").focus();
            });
        </script>
    </div>

    <!-- BEGIN FOOTER -->
        <div data-ng-include="'collateral-apps/views/footer.jsp'"> </div>
    <!-- END FOOTER -->

    <!-- BEGIN PAGE LEVEL SCRIPTS -->
    <script src="assets/pages/scripts/login.min.js" type="text/javascript"></script>
    <!-- END PAGE LEVEL SCRIPTS -->
    <!-- BEGIN THEME LAYOUT SCRIPTS -->
    <!-- END THEME LAYOUT SCRIPTS -->
