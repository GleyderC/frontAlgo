// Generated on 2016-04-28 using generator-angular 0.15.1
'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var openURL = require('open');
var lazypipe = require('lazypipe');
var rimraf = require('rimraf');
var wiredep = require('wiredep').stream;
var runSequence = require('run-sequence');
var sass = require('gulp-sass');

var collateral = {
    //app: require('./bower.json').appPath || 'app',
    app: 'src/main/resources/static',
    dist: 'src/main/resources/static'
};

var paths = {
    scripts: [collateral.app + '/assets/global/**/*.js'],
    styles: [collateral.app + '/assets/global/css/**/*.scss'],
    test: ['test/spec/**/*.js'],
    testRequire: [
        collateral.app + '/assets/vendor/angular/angular.js',
        collateral.app + '/assets/vendor/angular-mocks/angular-mocks.js',
        collateral.app + '/assets/vendor/angular-resource/angular-resource.js',
        collateral.app + '/assets/vendor/angular-cookies/angular-cookies.js',
        collateral.app + '/assets/vendor/angular-sanitize/angular-sanitize.js',
        'test/mock/**/*.js',
        'test/spec/**/*.js'
    ],
    karma: 'karma.conf.js',
    views: {
        //main: collateral.app + '/index.html',
        main: 'src/main/resources/templates/index.html',

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
        outputStyle: 'compressed',
        precision: 10
    })
    .pipe($.autoprefixer, 'last 1 version')
    .pipe(gulp.dest, collateral.app + '/assets/global/css');

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
        //['lint:scripts'],
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
        .pipe(wiredep({      exclude: ['angular-ui-select','select2',
            'multiselect','angular-ui-grid','pdfmake','selectize']}))
        .pipe(gulp.dest('src/main/resources/templates'));
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
