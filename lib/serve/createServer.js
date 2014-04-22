var fs       = require('fs');
var path     = require('path');
var http     = require('http');
var pf       = require('portfinder');
var mime     = require('mime');
var exec     = require('child_process').exec;
var rstream  = require('replacestream');

module.exports = function (port, lrPort, open, next) {
  var server = http.createServer(function(req, res) {
    if (req.url === '/') {
      res.writeHead(301, {'Location': '/index.html'});
      return res.end();
    }
    var filePath   = path.join(process.cwd(), req.url);
    var mimetype   = mime.lookup(filePath);
    var fileStream = fs.createReadStream(filePath);

    // send correct mimetype
    res.writeHead(200, {'Content-type': mimetype});

    // handle errors
    fileStream.on('error', function(err) {
      if (err.code === 'ENOENT') {
        return send404(res);
      }
      throw err;
    });

    // if html, inject lr
    if (filePath.match(/htm(l)?$/)) {
      fileStream
      .pipe(rstream('</body>', getLivereloadTag(lrPort)+'</body>'))
      .pipe(res);
    } else {
      // stream file to response
      fileStream.pipe(res);
    }
  });

  // find available http port
  pf.getPort({port: port}, function(err, httpPort){
    server.listen(httpPort, function() {
        console.log('Listening on', httpPort);
        if (open) {
          exec('open http://localhost:'+httpPort);
        }
        next(null, server);
    });

  });
};

function getLivereloadTag(port) {
  return "<script>document.write('<script src=\"http://' + (location.host || 'localhost').split(':')[0] + ':"+port+"/livereload.js?snipver=1\"></' + 'script>')</script>";
}

function send404(res) {
  res.writeHead(404, {'Content-type': 'text/plain'});
  res.end('Not Found');
};
