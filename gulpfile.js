const gulp = require('gulp');
const pug = require('gulp-pug');

const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const concatCss = require('gulp-concat-css');
const cssAutoreset = require('postcss-autoreset');
const cssUtilities = require('postcss-utilities');
const precss = require('precss');

const concat = require('gulp-concat');

const browserSync = require('browser-sync').create();

const paths = {
  public: './public',
  views: './src/**/*.pug',
  pages: './src/pages/**/*.pug',
  styles: './src/**/*.css',
  scripts: './src/**/*.js'
};

/*
    Pug to HTML
*/

gulp.task('pug', () => {
  return gulp
    .src(paths.pages)
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
  const plugins = [
    precss(),
    cssUtilities(),
    cssAutoreset({
      reset: {
        margin: 0,
        padding: 0,
        boxSizing: 'border-box'
      }
    }),
    autoprefixer({ browsers: ['last 2 version'] })
  ];

  return gulp
    .src(paths.styles)
    .pipe(postcss(plugins))
    .pipe(concatCss('styles.css'))
    .pipe(gulp.dest(`${paths.public}/css`));
});

/*
    Scripts
*/

gulp.task('scripts', () => {
  return gulp
    .src(paths.scripts)
    .pipe(concat('main.js'))
    .pipe(gulp.dest(`${paths.public}/scripts`));
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
gulp.task('scripts-watch', ['scripts'], reloadServer);

gulp.task('watch', () => {
  gulp.watch(paths.views, ['pug-watch']);
  gulp.watch(paths.styles, ['css-watch']);
  gulp.watch(paths.scripts, ['scripts-watch']);
});

gulp.task('default', ['pug', 'css', 'watch', 'scripts'], () => {
  browserSync.init({
    server: {
      baseDir: paths.public
    }
  });
});
