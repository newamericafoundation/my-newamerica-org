import _ from 'underscore';
import gulp from 'gulp';
import watchify from 'watchify';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import shell from 'gulp-shell';
import util from 'gulp-util';
import uglify from 'gulp-uglify';

var browserifyArgs = {
    entries: [ './app/bundle.js' ],
    insertGlobals: true,
    ignore: [ 'fs', 'jquery' ]
};

var getBrowserifyBundler = () => {
    var args = _.extend(browserifyArgs, watchify.args, { debug: true });
    var b = browserify(args);
    return b.transform(babelify);
};

var getWatchifyBundler = () => {
    return watchify(getBrowserifyBundler());
};

var writeBundle = (instance) => {
    return instance.bundle()
        .pipe(source('bundle.js'))
        .pipe(!!util.env.production ? uglify() : util.noop())
        .pipe(gulp.dest('./public/assets/scripts'));
};

gulp.task('bundle', () => {
    var w = getBrowserifyBundler();
    return writeBundle(w);
});

gulp.task('bundle-watch', () => {
    var w = getWatchifyBundler();
    w.on('update', () => {
        console.log('rebundling');
        return writeBundle(w);
    });
    return writeBundle(w);
});