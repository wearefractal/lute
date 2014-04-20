var gulp  = require('gulp');
var gutil = require('gulp-util');

module.exports = function(liveReload, paths) {

  gulp.watch(paths, function(evt){

    gutil.log(gutil.colors.cyan(evt.path), 'changed');

    // reload on change

    liveReload.changed({
      body: {
        files: [evt.path]
      }
    });

  });

};
