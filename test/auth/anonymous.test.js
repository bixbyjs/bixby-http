/* global describe, it, expect */

var $require = require('proxyquire');
var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../../app/auth/anonymous');
var Strategy = require('passport-anonymous');


describe('auth/bearer/scheme', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.equal('http://i.bixbyjs.org/http/auth/Scheme');
    expect(factory['@scheme']).to.equal('anonymous');
    expect(factory['@singleton']).to.be.undefined;
  });
  
  describe('verifying anonymous entities', function() {
    var StrategySpy = sinon.spy(Strategy);
    
    var factory = $require('../../app/auth/anonymous',
      { 'passport-anonymous': StrategySpy });
    var strategy = factory();
    
    it('should construct strategy', function() {
      expect(StrategySpy).to.have.been.calledOnce;
    });
    
    it('should return strategy', function() {
      expect(strategy).to.be.an.instanceOf(Strategy);
    });
  }); // verifying anonymous entities
  
});
