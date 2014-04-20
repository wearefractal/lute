var createLiveReload = require('./createLiveReload');
var createServer     = require('./createServer');
var watch            = require('./watch');

module.exports = function(port, argv) {
  var open        = (argv._.indexOf('open') !== -1);
  var watchPaths  = ["./**/*", "!./node_modules/**/*"];
  var ignorePaths = (argv.i) ? argv.i.split(',') : [];

  for(var i=0; i<ignorePaths.length; i++) {
    watchPaths.push("!./" + ignorePaths[i] + '/**/*');
  }

  createLiveReload(function(err, liveReload, lrPort){
    createServer(port, lrPort, open, function(err, server){
      watch(liveReload, watchPaths);
    });
  });

};