const gulp = require('gulp'),
      babel = require('gulp-babel'),
      babelify = require('babelify'),
      del = require('del'),
      runSequence = require('run-sequence'),
      concat = require('gulp-concat'),
      browserify = require('browserify'),
      source = require('vinyl-source-stream'),
      buffer = require('vinyl-buffer');

const Directories = {
  Source: 'src',
  Distributable: 'dist',
};

gulp.task('js', function() {
  return gulp
    .src(`${Directories.Source}/**/*.js`)
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(concat('all.js'))
    .pipe(gulp.dest(Directories.Distributable));
});

// const bundler = browserify('src/pendingButton.module.js', {debug: true});

const bundler = browserify('src/pendingButton.module.js', {debug: true})
  .transform(babelify, {presets: ["es2015"]});

gulp.task('browserify-js', function() {
  return bundler.bundle()
    .on('error', function(err) { console.error(err); this.emit('end'); })
    .pipe(source('all.js'))
    .pipe(buffer())
    .pipe(gulp.dest(Directories.Distributable));
});

gulp.task('clean', function() {
  return del([Directories.Distributable]);
});

gulp.task('build', function(callback) {
  runSequence('clean', 'browserify-js', callback);
});

gulp.task('default', ['build']);
