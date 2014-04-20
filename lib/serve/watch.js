var gulp  = require('gulp');
var gutil = require('gulp-util');

module.exports = function(liveReload, argv) {

  var paths = ["./**/*", "!./node_modules/**/*"];
  var ignorePaths = (argv.i) ? argv.i.split(',') : [];
  for(var i=0; i<ignorePaths.length; i++) {
    paths.push("!./" + ignorePaths[i] + '/**/*');
  }

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
