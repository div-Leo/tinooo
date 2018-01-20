'use strict';

var nconf = require('nconf');

nconf.argv()
  .env()
  .file('./env.json');

module.exports = nconf;
