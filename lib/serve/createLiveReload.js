var tinylr = require('tiny-lr');
var pf     = require('portfinder');

module.exports = function (next) {

  var port = 35729;

  var lr = tinylr();

  pf.getPort({port: port}, function(err, lrPort){

    lr.listen(lrPort, function() {
      console.log('LR Listening on', lrPort);
      next(null, lr, lrPort);
    });

  });

};
