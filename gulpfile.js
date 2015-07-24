
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


// -------------------------------------------------------------- JS ES6
gulp.task('babel', function () {
  return gulp.src(['!src/templates/*.es6', 'src/**/*.es6'])
    .pipe(babel())
    .pipe(gulp.dest('.tmp'));
});


// -------------------------------------------------------------- JS JSX
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
    .pipe(gulp.dest('./.tmp/public/js/'));
});


// -------------------------------------------------------------- CLEAN
gulp.task('clean-dev', function () {
    return gulp.src('.tmp/', {read: false})
        .pipe(clean());
});


gulp.task('clean-dist', function () {
    return gulp.src('dist/', {read: false})
        .pipe(clean());
});


// -------------------------------------------------------------- ENV CONFIG
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

// -------------------------------------------------------------- CSS
gulp.task('styles', function() {
    gulp.src(['./src/public/less/**/*.less'])
        .pipe(less())
        .pipe(gulp.dest('.tmp/public/css'));
});


// -------------------------------------------------------------- COPY
gulp.task('copy', function() {
    gulp.src('./src/public/index.html')
    // Perform minification tasks, etc here
    .pipe(gulp.dest('.tmp/public'));
});

gulp.task('copy-prod', function() {
    gulp.src('.tmp/*')
    // Perform minification tasks, etc here
    .pipe(gulp.dest('dist'));
});

// -------------------------------------------------------------- WATCH
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

gulp.task('build', ['clean-dev', 'babel', 'styles', 'copy', 'build-jsx']);
gulp.task('dist', ['clean-prod', 'env-prod', 'build', ]);
gulp.task('default', ['env-dev',  'build', 'watch']);