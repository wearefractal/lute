var path     = require('path');
var url      = require('url');
var http     = require('http');
var pf       = require('portfinder');
var rstream  = require('replacestream');
var send     = require('send');
var openIt     = require('open');

module.exports = function (port, lrPort, open, next) {
  var root = path.resolve(process.cwd());

  var server = http.createServer(function(req, res) {
    if ('GET' != req.method && 'HEAD' != req.method) {
      res.writeHead(400, {'Content-type': 'text/plain'});
      res.end('Method not supported');
      return;
    }

    var path = url.parse(req.url).pathname;
    var stream = send(req, path, {root: root});

    // handle errors
    stream.on('error', function error(err) {
      res.statusCode = err.status || 500;
      res.end(err.message);
    });

    stream.on('directory', function(){
      res.statusCode = 301;
      res.setHeader('Location', req.url + '/index.html');
      res.end();
    });

    // if html, inject lr
    if (path.match(/htm(l)?$/)) {
      stream
        .pipe(rstream('</body>', getLivereloadTag(lrPort)+'</body>'))
        .pipe(res);
    } else {
      // stream file to response
      stream.pipe(res);
    }
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
