/* global describe, it, expect */

describe('bixby-http', function() {
  
  describe('package.json', function() {
    var json = require('../package.json');
    
    it('should have assembly metadata', function() {
      expect(json.assembly.namespace).to.equal('http');
      
      expect(json.assembly.components).to.have.length(3);
      expect(json.assembly.components).to.include('server');
      expect(json.assembly.components).to.include('auth/anonymous/scheme');
      expect(json.assembly.components).to.include('auth/bearer/scheme');
    });
  });
  
  it('should throw if required', function() {
    expect(function() {
      var pkg = require('..');
    }).to.throw(Error).with.property('code', 'MODULE_NOT_FOUND');
  });
  
});
