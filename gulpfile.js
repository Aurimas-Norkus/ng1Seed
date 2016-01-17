/**
 * Created by Aurimas on 1/15/2016.
 */

var gulp = require('gulp');
var shell = require('gulp-shell');
var eslint = require('gulp-eslint');
var scsslint = require('gulp-scss-lint');
var templateCache = require('gulp-angular-templatecache');
scsslint({
  'config': 'scssLint.yml'
});

var paths = {
  destination:{
    html: 'app/scripts/templateCache/'
  },
  sass: ['app/scss/**/*.scss'],
  html: ['app/views/**/*.html'],
  js: ['app/scripts/**/*.js']
};

gulp.task('default', [
  'npmI',
  'serve',
  'scss-lint',
  'watchSCSS',
  'lintJS',
  'watchJS',
  'templateCache',
  'watchHtml'
]);

gulp.task('compassWatch', shell.task([
  'compass watch'
]));
gulp.task('npmI', shell.task([
  'npm i'
]));
gulp.task('serve', shell.task([
  'http-server'
]));
gulp.task('watchSCSS', function () {
  gulp.watch(paths.sass, ['scss-lint']);
});
gulp.task('scss-lint', function () {
  return gulp.src(paths.sass)
    .pipe(scsslint());
});
gulp.task('watchJS', function () {
  gulp.watch(paths.js, ['lintJS']);
});
gulp.task('lintJS', function () {
  return gulp.src(paths.js)
    // eslint() attaches the lint output to the eslint property
    // of the file object so it can be used by other modules.
    .pipe(eslint())
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format())
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failAfterError last.
    .pipe(eslint.failAfterError());
});
gulp.task('watchHtml', function () {
  gulp.watch(paths.html, ['templateCache']);
});
gulp.task('templateCache', function () {
  return gulp.src(paths.html)
    .pipe(templateCache({
      transformUrl: function(url) {
        return 'views/'+url
    }
    }))
    .pipe(gulp.dest(paths.destination.html));
});
