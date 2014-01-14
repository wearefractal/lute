#!/usr/bin/env node

var isInt = require('../lib/util/isInt');
var serve = require('../lib/serve');

var cliArgs = process.argv.slice(2);
var port    = isInt(cliArgs[0]) ? cliArgs[0] : 8080;

// if a port or no args, start server 

if ( isInt(cliArgs[0]) || typeof cliArgs[0] === 'undefined') {

  // just start server & live reload 

  serve(port);

}

if (cliArgs[0] === 'open') {

  serve(port, true);

}