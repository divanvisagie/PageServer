var pageServer = require('../lib/pageserver');
var webdriver = require('selenium-webdriver');
var path = require('path');

var driver = new webdriver.Builder().
withCapabilities(webdriver.Capabilities.phantomjs()).
build();

var PATH = path.join(__dirname, '../example/www_root')
pageServer({
    port: 8080,
    path: PATH
});
describe('basic test', function() {


    it('should be on Hello World page', function(done) {
        driver.get('http://localhost:8080');
        driver.getTitle().then(function(title) {
            expect(title).toBe('Hello World');

            done();
        });
    });

    it('should be on 404 page', function(done) {
        driver.get('http://localhost:8080/notexist');
        driver.getTitle().then(function(title) {
            expect(title).toBe('404');

            done();
        });
    });

    afterAll(function() {
        console.log("afterAll");
    });

});
