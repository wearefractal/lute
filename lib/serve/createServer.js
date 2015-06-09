var path     = require('path');
var url      = require('url');
var http     = require('http');
var pf       = require('portfinder');
var rstream  = require('replacestream');
var send     = require('send');

module.exports = function (port, next) {
  var root = path.resolve(process.cwd());

  var server = http.createServer(function(req, res) {
    var filePath = url.parse(req.url).pathname;
    var streamer = send(req, filePath, {root: root});

    // handle errors
    streamer.once('error', function error(err) {
      res.statusCode = err.status || 500;
      res.end(err.message);
    });

    streamer.pipe(res);
  });

  // find available http port
  pf.getPort({port: port}, function(err, httpPort){
    server.listen(httpPort, function() {
      console.log('Listening on port', httpPort);
      next(null, server, httpPort);
    });

  });
};
