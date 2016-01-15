/**
 * Created by Aurimas on 1/15/2016.
 */

var gulp = require('gulp');
var shell = require('gulp-shell');

gulp.task('compassWatch', shell.task([
    'compass watch'
]));

var scsslint = require('gulp-scss-lint');
scsslint({
    'config': 'scssLint.yml'
});
gulp.task('scss-lint', function() {
    return gulp.src('app/scss/*.scss')
        .pipe(scsslint());
});
