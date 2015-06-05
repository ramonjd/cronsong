
var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var less = require('gulp-less');
var path = require('path');

//https://gist.github.com/mikaelbr/8425025
gulp.task('build', function () {
  
  var stream = browserify({
    entries: './src/public/app/app.jsx',
    extensions: ['.jsx'],
    debug: true,
    transform: [babelify],
    fullPaths: false
  });

  return stream.bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./app/public/js/'));
});


gulp.task('styles', function() {
    gulp.src(['./src/public/less/**/*.less'])
        .pipe(less())
        .pipe(gulp.dest('./app/public/css'));
})


gulp.task('copy-html', function() {
    gulp.src('./src/public/index.html')
    // Perform minification tasks, etc here
    .pipe(gulp.dest('./app/public'));
});

gulp.task('default', ['styles', 'build', 'copy-html']);