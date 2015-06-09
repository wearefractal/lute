var isInt = require('./isInt');

module.exports = function(argv) {
  var port = (argv.p && isInt(argv.p)) ? argv.p : 8080;
  var lrPort = (argv.l && isInt(argv.l)) ? argv.l : 35729;

  var open = (argv.o) ? true : false;

  return {
    port: port,
    lrPort: lrPort,
    open: open
  };
};