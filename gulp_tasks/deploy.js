import gulp from 'gulp';
import shell from 'gulp-shell';

gulp.task('deploy', shell.task([
  'gulp prod',
  'git add -A',
  'git commit -m "fresh deploy"',
  'git push origin master',
  'eb deploy'
]));