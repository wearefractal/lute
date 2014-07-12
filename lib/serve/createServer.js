var path     = require('path');
var url      = require('url');
var http     = require('http');
var pf       = require('portfinder');
var rstream  = require('replacestream');
var send     = require('send');
var openIt   = require('open');

module.exports = function (port, lrPort, open, next) {
  var root = path.resolve(process.cwd());

  var server = http.createServer(function(req, res) {
    var filePath = url.parse(req.url).pathname;
    var streamer = send(req, filePath, {root: root});

    // handle errors
    streamer.once('error', function error(err) {
      res.statusCode = err.status || 500;
      res.end(err.message);
    });

    // this is a hack
    streamer.once('stream', function hookStream(realStream){
      // if html, inject lr
      if (path.extname(filePath).match(/\.htm(l)?$/)) {
        var orig = realStream.pipe.bind(realStream);
        realStream.pipe = function(newStream, opt) {
          var replacer = rstream('</body>', getLivereloadTag(lrPort)+'</body>');
          return orig(replacer).pipe(newStream);
        };
      }
    });
    streamer.pipe(res);
  });

  // find available http port
  pf.getPort({port: port}, function(err, httpPort){
    server.listen(httpPort, function() {
      console.log('Listening on', httpPort);
      if (open) {
        openIt('http://localhost:'+httpPort);
      }
      next(null, server);
    });

  });
};

function getLivereloadTag(port) {
  return "<script>if(window.self === window.top){document.write('<script src=\"http://' + (location.host || 'localhost').split(':')[0] + ':"+port+"/livereload.js?snipver=1\"></script>')}</script>";
}
