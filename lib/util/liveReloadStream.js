var map = require('through2-map');
var match = /<\/body>/i;
var script = function(port) {
  return "<script>document.write('<script src=\"http://' + (location.host || 'localhost').split(':')[0] + ':"+port+"/livereload.js?snipver=1\"></' + 'script>')</script>";
};

module.exports = function (lrPort) {
  return map({wantStrings: true}, function(chunk) {
    if (chunk.indexOf(match)) {
      chunk = chunk.replace(match, script(lrPort)+'</body>');
    }
    return chunk;
  });
};