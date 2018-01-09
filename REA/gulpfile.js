var gulp = require('gulp');
var postcss = require('gulp-postcss');
var htmlmin = require('gulp-htmlmin');
var uglifycss = require('gulp-uglifycss');
var uglifyjs = require('gulp-uglify');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var concat = require('gulp-concat');

var htmlPath = './src/*.html';
var cssPath = './src/*.css';
var jsPath = [
    './src/jquery-3.2.1.min.js',
    './src/jquery.jscrollpane.min.js',
    './src/jquery.mask.min.js',
    './src/jquery.validate.min.js',
    './src/index.js'
];
var staticPath = './src/static/*';
var outputPath = './build/';

gulp.task('default', ['html', 'js', 'css', 'static']);

gulp.task('html', function() {
    return gulp
        .src(htmlPath)
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(outputPath));
});

gulp.task('css', function() {
    var supportedBrowsers = [
        '> 1%',
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

gulp.task('watch', ['html', 'js', 'css', 'static'], function() {
    gulp.watch(htmlPath, ['html']);
    gulp.watch(cssPath, ['css']);
    gulp.watch(jsPath, ['js']);
    gulp.watch(staticPath, ['static']);
});
