import gulp from 'gulp';

require('./bundle.js');
require('./copy_shared_code.js');
require('./spec.js');
require('./dev.js');
require('./deploy.js');
require('./image_min.js');

gulp.task('default', [ ]);