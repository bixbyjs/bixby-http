/* global describe, it, expect */

var pkg = require('..');

describe('bixby-http', function() {
  
  it('should export manifest', function() {
    expect(pkg).to.be.an('object');
    expect(pkg['server']).to.be.a('function');
  });
  
  describe('http/server', function() {
    var logger = pkg['server'];
    
    it('should be annotated', function() {
      expect(logger['@implements']).to.equal('http://i.bixbyjs.org/http/Server');
      expect(logger['@singleton']).to.equal(true);
    });
  });
  
});
