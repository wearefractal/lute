var isInt = require('./isInt');
var config = require('../config');

module.exports = function(argv) {
  var port = (argv.p && isInt(argv.p)) ? argv.p : config.httpPort;
  var lrPort = (argv.l && isInt(argv.l)) ? argv.l : config.lrPort;
  var ignorePaths = (argv.i) ? argv.i.split(',') : [];

  var watchPaths = ['./**/*', '!./node_modules/**/*'];
  for(var i=0; i<ignorePaths.length; i++) {
    watchPaths.push('!./' + ignorePaths[i] + '/**/*');
  }

  var open = (argv.o) ? true : false;

  return {
    port: port,
    lrPort: lrPort,
    open: open,
    watchPaths: watchPaths
  };
};