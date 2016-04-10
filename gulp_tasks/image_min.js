import gulp from 'gulp';
import imgResize from 'gulp-image-resize';
import download from 'gulp-download';

import * as staffMembers from './../db/seeds/staff_members/index.json'

var mem = Object.keys(staffMembers)
	.filter((key) => {
		var img = staffMembers[key].image;
		return (img && img.length && (img.length > 0));
	})
	.map((key) => {
		return staffMembers[key].image
	})

gulp.task('staff-img-download', () => {
	return download(mem)
		.pipe(gulp.dest('img'))
})

gulp.task('staff-img-resize', ['staff-img-download'], () => {
	return gulp.src('./img/**/*')
		.pipe(imgResize({ width: 200, height: 200 }))
		.pipe(gulp.dest('./public/assets/images/staff_members/users'))
})

gulp.task('staff-img', [ 'staff-img-download' ])
