var gulp = require('gulp');
var postcss = require('gulp-postcss');
var htmlmin = require('gulp-htmlmin');
var uglifycss = require('gulp-uglifycss');
var uglifyjs = require('gulp-uglify');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var concat = require('gulp-concat');
var webserver = require('gulp-webserver');

var htmlPath = './src/*.html';
var cssPath = './src/ui/miss/*.css';
var jsPath = [
    './src/ui/miss/jquery-3.2.1.min.js',
    './src/ui/miss/jquery.jscrollpane.min.js',
    './src/ui/miss/jquery.mask.min.js',
    './src/ui/miss/jquery.validate.min.js',
    './src/ui/miss/index.js'
];
var staticPath = './src/ui/miss/static/*';
var outputPath = './build/ui/miss/';
var htmlOutputPath = './build/';

gulp.task('default', ['html', 'js', 'css', 'static']);

gulp.task('html', function() {
    return gulp
        .src(htmlPath)
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(htmlOutputPath));
});

gulp.task('css', function() {
    var supportedBrowsers = [
        '> 1%',
        'Chrome >= 5',
        'iOS >= 7.0',
        'Safari >= 7',
        'IE >= 10',
        'Firefox >= 47'
    ];

    var plugins = [
        autoprefixer({
            browsers: supportedBrowsers
        })
    ];

    return gulp
        .src(cssPath)
        .pipe(postcss(plugins))
        .pipe(uglifycss({ maxLineLen: 80, uglyComments: true }))
        .pipe(gulp.dest(outputPath));
});

gulp.task('js', function() {
    return gulp
        .src(jsPath)
        .pipe(concat('index.js'))
        .pipe(uglifyjs())
        .pipe(gulp.dest(outputPath));
});

gulp.task('static', function() {
    return gulp.src(staticPath).pipe(gulp.dest(outputPath + 'static'));
});

gulp.task('watch', function() {
    gulp.src('src').pipe(
        webserver({
            livereload: true,
            directoryListing: false,
            open: true
        })
    );
});
