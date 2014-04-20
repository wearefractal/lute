#!/usr/bin/env node

var argv        = require('minimist')(process.argv.slice(2));
var isInt       = require('../lib/util/isInt');
var serve       = require('../lib/serve');
var port        = (argv.p && isInt(argv.p)) ? argv.p : 8080;
var browserOpen = (argv._.indexOf('open') !== -1);

serve(port, browserOpen, argv);
