#!/usr/bin/env node

var argv         = require('minimist')(process.argv.slice(2));
var parseOptions = require('../lib/util/parseOptions');
var serve        = require('../lib/serve');

serve(parseOptions(argv));
