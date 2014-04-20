var createLiveReload = require('./createLiveReload');
var createServer     = require('./createServer');
var watch            = require('./watch');

module.exports = function(port, open, options) {
  var watchPaths  = ["./**/*", "!./node_modules/**/*"];
  var ignorePaths = (options.i) ? options.i.split(',') : [];

  for(var i=0; i<ignorePaths.length; i++) {
    watchPaths.push("!./" + ignorePaths[i] + '/**/*');
  }

  createLiveReload(function(err, liveReload, lrPort){
    createServer(port, lrPort, open, function(err, server){
      watch(liveReload, watchPaths);
    });
  });

};