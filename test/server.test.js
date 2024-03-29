/* global describe, it, expect */

var factory = require('../app/server');


describe('server', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.equal('module:http.Server');
    expect(factory['@singleton']).to.equal(undefined);
  });
  
});
