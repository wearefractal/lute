var assert = require('assert');
var parseOptions = require('../lib/util/parseOptions');
var config = require('../lib/config');

function checkIgnore(path) {
  return '!./' + path + '/**/*';
}

describe('parseOptions', function () {
  it('should use the defaults', function () {
    var options = parseOptions({});

    assert.equal(options.port, config.httpPort);
    assert.equal(options.lrPort, config.lrPort);
    assert.equal(options.open, false);
    assert.equal(typeof options.watchPath, 'undefined');
  });

  describe('custom port', function () {
    var argv = { p: 2020 };

    it('should change the port', function () {
      var options = parseOptions(argv);
      assert.equal(options.port, 2020);
    });
  });

  describe('custom lr port', function () {
    var argv = { l: 4040 };

    it('should change the live reload port', function () {
      var options = parseOptions(argv);
      assert.equal(options.lrPort, 4040);
    });
  });

  describe('open browser', function () {
    it('should set open to true', function () {
      var options = parseOptions({ o: true });
      assert.equal(options.open, true);
    });
  });

  describe('ignored paths', function () {
    it('should ignore the path', function () {
      var path = 'ignore_me';
      var options = parseOptions({ i: path });
      var index = options.watchPaths.length - 1;
      assert.equal(options.watchPaths[index], checkIgnore(path));
    });

    it('should ignore multiple paths', function () {
      var paths = 'ignore,these,paths';
      var options = parseOptions({ i: paths });
      var splitPaths = paths.split(',');

      for(var i = 0; i < splitPaths.length; i++) {
        var index = options.watchPaths.length - 1 - i;
        var pathIndex = splitPaths.length - 1 - i;
        var path = splitPaths[pathIndex];

        assert.equal(options.watchPaths[index], checkIgnore(path));
      }
    });
  });
});