var fs      = require('fs');
var path    = require('path');
var express = require('express');
var pf      = require('portfinder');
var cheerio = require('cheerio');
var exec    = require('child_process').exec;

module.exports = function (port, lrPort, open, next) {

  var app = express();

  // livereload.js

  app.get('/livereload.js', function(req, res) {

    res.sendfile(__dirname + '/public/livereload.js');

  });

  // inject livereload script tag

  app.get('/', function(req, res) {
    
    var html   = fs.readFileSync('./index.html', 'utf8');
    var $      = cheerio.load(html);
    var script = "<script>document.write('<script src=\"http://' + (location.host || 'localhost').split(':')[0] + ':"+lrPort+"/livereload.js?snipver=1\"></' + 'script>')</script>";
    
    $('body').append(script);

    res.send($.html());
  
  });

  // find available http port

  pf.getPort({port: port}, function(err, httpPort){

    app
      .use(express.query())
      .use(express.json())
      .use(express.urlencoded())
      .use(express.static(path.resolve('./')))
      .use(express.directory(path.resolve('./')))
      .listen(httpPort, function() {
        console.log('Listening on', httpPort);
        if (open) {
          exec('open http://localhost:'+httpPort);
        }
        next(null, app);
      });

  });

};