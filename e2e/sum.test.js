'use strict';

const chai = require('chai');
const assert = chai.assert;
const webdriver = require('selenium-webdriver');
const By = webdriver.By;
const testing = require('selenium-webdriver/testing');
const describe = testing.describe;
const it = testing.it;
const createServer = require('./server');

const port = Number(process.env.PORT) || 8080;
const hostname = process.env.HOST || 'localhost';


describe('index', () => {
  let driver;
  let server;


  before(() => {
    driver = createWebDriver();
    server = createServer();
    return server.start(port, hostname);
  });


  it('shuld display result of sum([0, 1, 2, ..., 100])', () => {
    driver.get(`http://${hostname}:${port}/public/`);

    return driver.findElement(By.id('result'))
      .getText()
      .then((result) => {
        assert.strictEqual(result, '4950');
      });
  });


  after(() => {
    return webdriver.promise.all([
      driver.quit(),
      server.close(),
    ]);
  });
});


function createWebDriver() {
  return new webdriver.Builder()
    .forBrowser('chrome')
    .build()
}
