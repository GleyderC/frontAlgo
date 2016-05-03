// Generated on 2016-04-28 using generator-angular 0.15.1
'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var openURL = require('open');
var lazypipe = require('lazypipe');
var rimraf = require('rimraf');
var wiredep = require('wiredep').stream;
var runSequence = require('run-sequence');

var collateral = {
    //app: require('./bower.json').appPath || 'app',
    app: 'src/main/webapp/app',
    dist: 'dist'
};

var paths = {
    scripts: [collateral.app + '/scripts/**/*.js'],
    styles: [collateral.app + '/styles/**/*.scss'],
    test: ['test/spec/**/*.js'],
    testRequire: [
        collateral.app + '/vendor/angular/angular.js',
        collateral.app + '/vendor/angular-mocks/angular-mocks.js',
        collateral.app + '/vendor/angular-resource/angular-resource.js',
        collateral.app + '/vendor/angular-cookies/angular-cookies.js',
        collateral.app + '/vendor/angular-sanitize/angular-sanitize.js',
        collateral.app + '/vendor/angular-route/angular-route.js',
        'test/mock/**/*.js',
        'test/spec/**/*.js'
    ],
    karma: 'karma.conf.js',
    views: {
        main: collateral.app + '/views/index.jsp',
        files: [collateral.app + '/views/**/*.html']
    }
};

////////////////////////
// Reusable pipelines //
////////////////////////

var lintScripts = lazypipe()
    .pipe($.jshint, '.jshintrc')
    .pipe($.jshint.reporter, 'jshint-stylish');

var styles = lazypipe()
    .pipe($.sass, {
        outputStyle: 'expanded',
        precision: 10
    })
    .pipe($.autoprefixer, 'last 1 version')
    .pipe(gulp.dest, '.tmp/styles');

///////////
// Tasks //
///////////

gulp.task('styles', function () {
    return gulp.src(paths.styles)
        .pipe(styles());
});

gulp.task('lint:scripts', function () {
    return gulp.src(paths.scripts)
        .pipe(lintScripts());
});

gulp.task('clean:tmp', function (cb) {
    rimraf('./.tmp', cb);
});

gulp.task('start:client', ['start:server', 'styles'], function () {
    openURL('http://localhost:9000');
});

gulp.task('start:server', function () {
    $.connect.server({
        root: [collateral.app, '.tmp'],
        livereload: true,
        // Change this to '0.0.0.0' to access the server from outside.
        port: 9000
    });
});

gulp.task('start:server:test', function () {
    $.connect.server({
        root: ['test', collateral.app, '.tmp'],
        livereload: true,
        port: 9001
    });
});

gulp.task('watch', function () {
    $.watch(paths.styles)
        .pipe($.plumber())
        .pipe(styles())
        .pipe($.connect.reload());

    $.watch(paths.views.files)
        .pipe($.plumber())
        .pipe($.connect.reload());

    $.watch(paths.scripts)
        .pipe($.plumber())
        .pipe(lintScripts())
        .pipe($.connect.reload());

    $.watch(paths.test)
        .pipe($.plumber())
        .pipe(lintScripts());

    gulp.watch('bower.json', ['bower']);
});

gulp.task('serve', function (cb) {
    runSequence('clean:tmp',
        ['lint:scripts'],
        ['start:client'],
        'watch', cb);
});

gulp.task('serve:prod', function () {
    $.connect.server({
        root: [collateral.dist],
        livereload: true,
        port: 9000
    });
});

gulp.task('test', ['start:server:test'], function () {
    var testToFiles = paths.testRequire.concat(paths.scripts, paths.test);
    return gulp.src(testToFiles)
        .pipe($.karma({
            configFile: paths.karma,
            action: 'watch'
        }));
});

// inject bower components
gulp.task('bower', function () {
    return gulp.src(paths.views.main)
        .pipe(wiredep({
            directory: collateral.app + '/../assets/vendor',
            //ignorePath: '..'
        }))
        .pipe(gulp.dest(collateral.app + '/views'));
});

///////////
// Build //
///////////

gulp.task('clean:dist', function (cb) {
    rimraf('./dist', cb);
});

gulp.task('client:build', ['html', 'styles'], function () {
    var jsFilter = $.filter('**/*.js');
    var cssFilter = $.filter('**/*.css');

    return gulp.src(paths.views.main)
        .pipe($.useref({searchPath: [collateral.app, '.tmp']}))
        .pipe(jsFilter)
        .pipe($.ngAnnotate())
        .pipe($.uglify())
        .pipe(jsFilter.restore())
        .pipe(cssFilter)
        .pipe($.minifyCss({cache: true}))
        .pipe(cssFilter.restore())
        .pipe($.rev())
        .pipe($.revReplace())
        .pipe(gulp.dest(collateral.dist));
});

gulp.task('html', function () {
    return gulp.src(collateral.app + '/views/**/*')
        .pipe(gulp.dest(collateral.dist + '/views'));
});

gulp.task('images', function () {
    return gulp.src(collateral.app + '/images/**/*')
        .pipe($.cache($.imagemin({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest(collateral.dist + '/images'));
});

gulp.task('copy:extras', function () {
    return gulp.src(collateral.app + '/*/.*', {dot: true})
        .pipe(gulp.dest(collateral.dist));
});

gulp.task('copy:fonts', function () {
    return gulp.src(collateral.app + '/fonts/**/*')
        .pipe(gulp.dest(collateral.dist + '/fonts'));
});

gulp.task('build', ['clean:dist'], function () {
    runSequence(['images', 'copy:extras', 'copy:fonts', 'client:build']);
});

gulp.task('default', ['build']);
