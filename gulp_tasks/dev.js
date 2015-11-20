import gulp from 'gulp'
import nodemon from 'gulp-nodemon'
import liveReload from 'gulp-livereload'
import path from 'path'

gulp.task('dev', function() {
    liveReload.listen();
    nodemon({
        script: './app.js',
        ext: 'css js jade',
        tasks: []
    })
    .on('restart', function() { 
        gulp.src('./app.js')
            .pipe(liveReload());
    })
})