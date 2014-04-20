var through2 = require('through2');
var cheerio  = require('cheerio');

module.exports = function (lrPort) {
  return through2.obj(function(file, enc, next) {
    var script = "<script>document.write('<script src=\"http://' + (location.host || 'localhost').split(':')[0] + ':"+lrPort+"/livereload.js?snipver=1\"></' + 'script>')</script>";
    var html = file.toString('utf8');
    var $   = cheerio.load(html);
    $('body').append(script);

    this.push($.html());
    next();
  });
};