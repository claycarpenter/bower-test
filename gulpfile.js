const gulp = require('gulp'),
      babel = require('gulp-babel');

gulp.task('js', function() {
  return gulp.src('src/**/*.js')
      // .pipe(print())
      .pipe(babel({ presets: ['es2015'] }))
      .pipe(gulp.dest('build'));               
});

