const gulp = require('gulp'),
      babel = require('gulp-babel'),
      del = require('del'),
      runSequence = require('run-sequence'),
      concat = require('gulp-concat');

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

gulp.task('clean', function() {
  return del([Directories.Distributable]);
});

gulp.task('build', function(callback) {
  runSequence('clean', 'js', callback);
});

gulp.task('default', ['build']);
