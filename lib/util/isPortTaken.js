module.exports = function(port, fn) {
  var net = require('net');
  var tester = net.createServer()
  .once('error', function (err) {
    if (err.code != 'EADDRINUSE') return fn(err);
    fn(null, true);
  })
  .once('listening', function() {
    tester.once('close', function() { fn(null, false); })
    .close();
  })
  .listen(port);
};
