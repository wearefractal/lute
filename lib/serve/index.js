var createLiveReload = require('./createLiveReload');
var createServer = require('./createServer');
var watch = require('./watch');
var openIt = require('open');

module.exports = function(options) {
  var watchPaths  = ["./**/*", "!./node_modules/**/*"];
  var ignorePaths = (options.i) ? options.i.split(',') : [];

  for(var i=0; i<ignorePaths.length; i++) {
    watchPaths.push("!./" + ignorePaths[i] + '/**/*');
  }

  createLiveReload(options.lrPort, function(err, liveReload, lrPort){
    createServer(options.port, function(err, server, httpPort){
      if (options.open) {
        openIt('http://localhost:'+httpPort);
      }

      watch(liveReload, watchPaths);
    });
  });
};