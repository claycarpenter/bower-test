const gulp = require('gulp'),
      babel = require('gulp-babel');

const Directories = {
  Source: 'src',
  Distributable: 'dist',
};

gulp.task('js', function() {
  return gulp.src('${Directories.Source}/**/*.js')
      // .pipe(print())
      .pipe(babel({ presets: ['es2015'] }))
      .pipe(gulp.dest(Directories.Distributable));
});

// Add:
// - default
// - clean
