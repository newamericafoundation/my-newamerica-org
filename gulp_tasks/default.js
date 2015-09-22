import gulp from 'gulp';
import uglify from 'gulp-uglify';
import gzip from 'gulp-gzip';
import rev from 'gulp-rev';
import rename from 'gulp-rename';
import minifyCss from 'gulp-minify-css';

gulp.task('js', [ 'bundle' ], () => {
	return gulp.src('./public/assets/scripts/bundle.js')
		.pipe(uglify())
		.pipe(rename('bundle.min.js'))
		.pipe(gulp.dest('./public/assets/scripts'))
		.pipe(gzip())
		.pipe(gulp.dest('./public/assets/scripts'));
});

gulp.task('css', () => {
	return gulp.src('./public/assets/styles/app.css')
		.pipe(minifyCss())
		.pipe(rename('app.min.css'))
		.pipe(gulp.dest('./public/assets/styles'))
});

gulp.task('prod', [ 'js', 'css' ]);

gulp.task('default', []);