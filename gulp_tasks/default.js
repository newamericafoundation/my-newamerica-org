import gulp from 'gulp';
import rename from 'gulp-rename';
import minifyCss from 'gulp-minify-css';

gulp.task('css', () => {
	return gulp.src('./public/assets/styles/app.css')
		.pipe(minifyCss())
		.pipe(rename('app.min.css'))
		.pipe(gulp.dest('./public/assets/styles'))
});

gulp.task('prod', [ 'css' ])

gulp.task('default', [])