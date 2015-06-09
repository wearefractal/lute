var createLiveReload = require('./createLiveReload');
var createServer = require('./createServer');
var watch = require('./watch');
var openIt = require('open');

module.exports = function(options) {
  createLiveReload(options.lrPort, function(err, liveReload, lrPort){
    createServer(options.port, function(err, server, httpPort){
      if (options.open) {
        openIt('http://localhost:'+httpPort);
      }

      watch(liveReload, options.watchPaths);
    });
  });
};