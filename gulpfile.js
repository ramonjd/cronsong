var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var less = require('gulp-less');
var path = require('path');
var babel = require("gulp-babel");
var watch  = require('gulp-watch');
var preprocess = require('gulp-preprocess');
var clean = require('gulp-clean');


var config = {
    jstarget: './.tmp/public/js/',
    csstarget: '.tmp/public/css',
    filetarget: '.tmp/public',
    target: '.tmp/'
};

if (process.env.NODE_ENV === 'production') {
    config = {
        jstarget: './build/public/js/',
        csstarget: './build/public/css',
        filetarget: './build/public',
        target: './build/'
    };
}

gulp.task('babel', function () {
  return gulp.src(['!src/templates/*.es6', 'src/**/*.es6'])
    .pipe(babel())
    .pipe(gulp.dest(config.target));
});


gulp.task('build-jsx', function () {  
  var stream = browserify({
    entries: './src/public/app/app.jsx',
    extensions: ['.jsx'],
    debug: true,
    transform: [babelify],
    fullPaths: false
  });
  return stream.bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(config.jstarget));
});


gulp.task('clean', function () {
    return gulp.src(config.target, {read: false})
        .pipe(clean());
});


gulp.task('env-dev', function() {
  gulp.src('./src/templates/env.es6')
    .pipe(preprocess({extension : 'js', context: { NODE_ENV: 'development', DEBUG: true}})) 
    .pipe(gulp.dest('./src/config/'));
});


gulp.task('env-prod', function() {
  gulp.src('./src/templates/env.es6')
    .pipe(preprocess({extension : 'js', context: { NODE_ENV: 'production', DEBUG: false}})) 
    .pipe(gulp.dest('./src/config/'));
});


gulp.task('styles', function() {
    gulp.src(['./src/public/less/**/*.less'])
        .pipe(less())
        .pipe(gulp.dest(config.csstarget));
});

gulp.task('copy', function() {
    gulp.src('./src/public/index.html')
    // Perform minification tasks, etc here
    .pipe(gulp.dest(config.filetarget));
  
});

gulp.task('watch', function() {
    watch('src/public/app/**/*.jsx', function() {
        gulp.start('build-jsx');
    });
    watch('src/public/less/**/*.less', function() {
        gulp.start('styles');
    });  
      watch('src/**/*.es6', function() {
        gulp.start('babel');
    }); 
  
     watch('src/public/index.html', function() {
        gulp.start('copy');
    });
});

gulp.task('build', ['styles', 'babel', 'build-jsx', 'copy']);
gulp.task('dist', ['clean', 'env-prod', 'build']);
gulp.task('default', ['env-dev',  'build', 'watch']);