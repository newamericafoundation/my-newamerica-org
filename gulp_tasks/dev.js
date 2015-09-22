import gulp from 'gulp';
import nodemon from 'gulp-nodemon';
import liveReload from 'gulp-livereload';
import * as env from './../../secrets/intranet.json';
import path from 'path';
import './bundle.js';

env.NODE_ENV = 'development';

gulp.task('dev', function() {
    liveReload.listen();
    gulp.start('bundle-watch');
    nodemon({
        script: './app.js',
        env: env,
        ext: 'css js jade',
        tasks: []
    })
    .on('restart', function() { 
        gulp.src('./app.js')
            .pipe(liveReload());
    });
});