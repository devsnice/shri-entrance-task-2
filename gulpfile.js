const gulp = require('gulp');
const pug = require('gulp-pug');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const concatCss = require('gulp-concat-css');
const browserSync = require('browser-sync').create();

const paths = {
  public: './public',
  views: './src/pages/**/*.pug',
  styles: './src/**/*.css'
};

/*
    Pug to HTML
*/

gulp.task('pug', () => {
  return gulp
    .src(paths.views)
    .pipe(
      pug({
        verbose: true,
        pretty: true
      })
    )
    .pipe(gulp.dest(paths.public));
});

/*
    PostCSS
*/

gulp.task('css', () => {
  const plugins = [autoprefixer({ browsers: ['last 2 version'] })];

  return gulp
    .src(paths.styles)
    .pipe(postcss(plugins))
    .pipe(concatCss('styles.css'))
    .pipe(gulp.dest(`${paths.public}/css`));
});

/*
    Static server
*/

gulp.task('browser-sync', () => {
  browserSync.init({
    server: {
      baseDir: paths.public
    }
  });
});

const reloadServer = done => {
  browserSync.reload();
  done();
};

/*
    Watchers
*/

gulp.task('pug-watch', ['pug'], reloadServer);
gulp.task('css-watch', ['css'], reloadServer);

gulp.task('watch', () => {
  gulp.watch(paths.views, ['pug-watch']);
  gulp.watch(paths.styles, ['css-watch']);
});

gulp.task('default', ['pug', 'css', 'watch'], () => {
  browserSync.init({
    server: {
      baseDir: paths.public
    }
  });
});
