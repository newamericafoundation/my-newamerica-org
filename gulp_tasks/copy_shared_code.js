// For these tasks to work, the Atlas codebase needs to sit next to this one.

import gulp from 'gulp';
import copy from 'gulp-copy';

var taskSourcePaths = {
	'copy-atlas-css': './../atlas/public/assets/styles/app.css',
	'copy-atlas-fonts': './../atlas/public/assets/fonts/**/*',
	'copy-atlas-db-connector': './../atlas/db/connector.js',
	'copy-atlas-eb-extensions': './../atlas/.ebextensions/**/*'
};

// Loop over these tasks, copy from the path specified in the value,
//   and build up a list of task names to reference in the global task.

var taskName, sourcePath, taskNameList = [];

for (taskName in taskSourcePaths) {
	sourcePath = taskSourcePaths[taskName];
	taskNameList.push(taskName);
	gulp.task(taskName, () => {
		return gulp.src(sourcePath)
			.pipe(copy('./', { prefix: 2 }));
	});
}

gulp.task('copy-shared-code', taskNameList);