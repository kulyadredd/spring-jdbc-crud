const gulp = require('gulp');
const newer = require('gulp-newer');
const htmlmin = require('gulp-htmlmin');
const flatten = require('gulp-flatten');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cssmin = require('gulp-cssmin');
const ngAnnotate = require('gulp-ng-annotate');
const ngTemplate = require('gulp-angular-templatecache');
const gulpProtractorAngular = require('gulp-angular-protractor');

const webDir = "src/main/webapp/";
const staticDir = "src/main/resources/static/";


gulp.task('default', [
    'html',
    'html-index',
    'app-js',
    'source-js',
    'app-css',
    'source-css',
    'template'
]);

gulp.task('source-js', function () {
    return gulp.src([
        'node_modules/angular/angular.min.js',
        'node_modules/angular-animate/angular-animate.js',
        'node_modules/angular-route/angular-route.js',
        'node_modules/angular-resource/angular-resource.js',
        'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js'
    ])
        .pipe(newer(staticDir + 'source.min.js'))
        .pipe(concat('source.min.js'))
        .pipe(gulp.dest(staticDir))
});



gulp.task('source-css', function () {
    return gulp.src([
        'node_modules/bootstrap/dist/css/bootstrap.css'
    ])
        .pipe(newer(staticDir + 'source.min.css'))
        .pipe(concat('source.min.css'))
        .pipe(cssmin())
        .pipe(gulp.dest(staticDir))
});

gulp.task('html', function () {
    return gulp.src([
        webDir + "views/**/*.html"
    ])
        .pipe(newer(staticDir))
        .pipe(flatten())
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(staticDir + '/template'))
});

gulp.task('html-index', function () {
    return gulp.src([
        webDir + "index.html"
    ])
        .pipe(newer(staticDir))
        .pipe(flatten())
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(staticDir))
});

gulp.task('app-js', function () {
    return gulp.src([
        webDir + 'js/app.js',
        webDir + 'js/controller/**.js',
        webDir + 'js/service/**.js'
    ])
        .pipe(newer(staticDir + 'app.min.js'))
        .pipe(concat('app.min.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest(staticDir))
});

gulp.task('app-css', function () {
    return gulp.src([
        webDir + 'css/**/*.css'
    ])
        .pipe(newer(staticDir + 'app.min.css'))
        .pipe(cssmin())
        .pipe(concat('app.min.css'))
        .pipe(gulp.dest(staticDir))
});

gulp.task('template', function(){
   gulp.src([
       "src/main/webapp/views/*.html"
   ])
       .pipe(newer(staticDir + 'templates.min.js'))
       .pipe(ngTemplate({root: "template",module: 'app', standalone: false}))
       .pipe(concat('templates.min.js'))
       .pipe(ngAnnotate())
       .pipe(gulp.dest(staticDir));
});

gulp.task("protractor", function(){
    gulp
        .src(['./test/client/e2e/**/*.js'])
        .pipe(gulpProtractorAngular({
            'configFile': 'protractor.conf.js',
            'debug': false,
            'autoStartStopServer': true
        }))
        .on('error', function(e) {
            console.log(e);
        });
});
