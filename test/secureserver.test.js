/* global describe, it, expect */

var factory = require('../app/secureserver');


describe('secureserver', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.equal('http://i.bixbyjs.org/http/SecureServer');
    expect(factory['@singleton']).to.equal(undefined);
  });
  
});
