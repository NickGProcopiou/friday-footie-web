/**
 * Created by procopiou_nick on 21/09/2015.
 */
var gulp = require('gulp');
var sass = require('gulp-sass');
var webpack = require('gulp-webpack');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');

var paths = require('./config/paths.js');

var config = {
    webpack: {
        prod: require('./config/webpack.config.js'),
        dev: require('./config/webpack-dev.config.js')
    }
};

gulp.task('webpack-dev', function() {
    return gulp.src(config.webpack.dev.src)
        .pipe(webpack(config.webpack.dev))
        .pipe(gulp.dest(config.webpack.dev.output.path));
});

gulp.task('webpack-prod', function() {
    return gulp.src(config.webpack.prod.src)
        .pipe(webpack(config.webpack.prod))
        .pipe(gulp.dest(config.webpack.prod.output.path));
});

gulp.task('sass', function() {
     return gulp.src(paths.SRC.SASS_PAGES)
        .pipe(sass()).on('error', onPluginError)
        .pipe(minifyCss({compatability: 'ie8'})).on('error', onPluginError)
        .pipe(autoprefixer({ browsers: ['last 3 versions'] }))
        .pipe(gulp.dest(paths.DEST.CSS));
});

gulp.task('watch', function() {
    gulp.watch(paths.SRC.JS + '/**/*.js*', ['webpack-dev']);
    gulp.watch(paths.SRC.SASS + '/**/*.scss', ['sass']);
});

gulp.task('dev', ['webpack-dev', 'watch', 'sass']);
gulp.task('prod', ['webpack-prod', 'sass']);

gulp.task('default', ['prod']);

function onPluginError(error) {
    console.error(error);
    this.emit('end');
}