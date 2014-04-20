var createLiveReload = require('./createLiveReload');
var createServer     = require('./createServer');
var watch            = require('./watch');

module.exports = function(port, open, argv) {

  createLiveReload(function(err, liveReload, lrPort){
    createServer(port, lrPort, open, function(err, server){
      watch(liveReload, argv);
    });
  });

};