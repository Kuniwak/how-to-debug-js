'use strict';

const Path = require('path');
const Http = require('http');
const express = require('express');
const webdriver = require('selenium-webdriver');

const PUBLIC_DIR = Path.join(__dirname, '..');


module.exports = function createServer() {
  var app = express();
  app.use(express.static(PUBLIC_DIR));

  const server = Http.createServer(app);

  return {
    start: (port, hostname) => new webdriver.promise.Promise((resolve, reject) => {
      server.on('listening', resolve);
      server.on('error', reject);
      server.listen(port, hostname);
    }),

    close: () => new webdriver.promise.Promise((resolve, reject) => {
      server.on('close', resolve);
      server.on('error', reject);
      server.close();
    }),
  };
};
