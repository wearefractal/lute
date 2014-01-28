var gulp  = require('gulp');
var gutil = require('gulp-util');

module.exports = function(liveReload) {

  gulp.watch(["./**/*", "!./node_modules/**/*", "!./bower_components/**/*"], function(evt){

    gutil.log(gutil.colors.cyan(evt.path), 'changed');

    // reload on change

    liveReload.changed({
      body: {
        files: [evt.path]
      }
    });

  });

};
