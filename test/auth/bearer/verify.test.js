/* global describe, it */

var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../../../app/auth/bearer/verify');


describe('auth/bearer/verify', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.be.undefined;
    expect(factory['@singleton']).to.be.undefined;
  });
  
  describe('verify', function() {
    
    describe('valid token', function() {
      var user, info;
      
      var message = {
        user: { id: '1' },
        client: { id: 's6BhdRkqt3' },
        scope: [ 'read:foo', 'write:foo' ]
      }
      var conditions = {}
      var issuer = {
        identifier: 'https://server.example.com'
      }
      var authenticateStub = sinon.stub().yields(null, message, conditions, issuer);
      
      before(function(done) {
        var verify = factory(authenticateStub);
        
        var req = {};
        verify(req, '2YotnFZFEjr1zCsicMWpAA', function(err, u, i) {
          if (err) { return done(err); }
          user = u;
          info = i;
          done();
        })
      });
      
      it('should authenticate token', function() {
        expect(authenticateStub.callCount).to.equal(1);
        expect(authenticateStub.args[0][0]).to.equal('2YotnFZFEjr1zCsicMWpAA');
      });
      
      it('should yield user', function() {
        expect(user).to.deep.equal({ id: '1' });
      });
      
      it('should yield info', function() {
        expect(info).to.deep.equal({
          scope: [ 'read:foo', 'write:foo' ],
          client: { id: 's6BhdRkqt3' },
          issuer: { identifier: 'https://server.example.com' }
        });
      });
    }); // valid token
    
  }); // verify
  
});
