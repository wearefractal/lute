var tinylr = require('tiny-lr');
var pf     = require('portfinder');

module.exports = function (port, next) {
  var lr = tinylr();

  pf.getPort({port: port}, function(err, lrPort){

    lr.listen(lrPort, function() {
      console.log('LR Listening on port', lrPort);
      next(null, lr, lrPort);
    });

  });

};
