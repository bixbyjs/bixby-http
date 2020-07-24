/* global describe, it, expect */

var $require = require('proxyquire');
var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../../app/auth/bearer');
var Strategy = require('passport-http-bearer');


describe('auth/bearer/scheme', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.equal('http://i.bixbyjs.org/http/auth/Scheme');
    expect(factory['@scheme']).to.equal('bearer');
    expect(factory['@singleton']).to.be.undefined;
  });
  
  describe('verifying token', function() {
    var tokens = new Object();
    tokens.verify = sinon.stub().yieldsAsync(null, {
      user: {
        id: '248289761001'
      },
      client: {
        id: 's6BhdRkqt3'
      }
    });
    
    var StrategySpy = sinon.spy(Strategy);
    
    var factory = $require('../../app/auth/bearer',
      { 'passport-http-bearer': StrategySpy });
    var strategy = factory(tokens);
    
    it('should construct strategy', function() {
      expect(StrategySpy).to.have.been.calledOnce;
      expect(StrategySpy).to.have.been.calledWith({ passReqToCallback: true });
    });
    
    it('should return strategy', function() {
      expect(strategy).to.be.an.instanceOf(Strategy);
    });
    
    describe('verify', function() {
      var user, info;
      
      before(function(done) {
        var verify = StrategySpy.args[0][1];
        verify({}, '2YotnFZFEjr1zCsicMWpAA', function(e, u, i) {
          if (e) { return done(e); }
          user = u;
          info = i;
          done();
        });
      });
      
      it('should verify token', function() {
        expect(tokens.verify).to.calledOnceWith('2YotnFZFEjr1zCsicMWpAA');
      });
      
      it('should yield user', function() {
        expect(user).to.deep.equal({
          id: '248289761001'
        });
      });
      
      it('should yield info', function() {
        expect(info).to.deep.equal({
          client: {
            id: 's6BhdRkqt3'
          }
        });
      });
    }); // verify
    
  }); // verifying token
  
  describe('verifying token with scope', function() {
    var tokens = new Object();
    tokens.verify = sinon.stub().yieldsAsync(null, {
      user: {
        id: '248289761001'
      },
      client: {
        id: 's6BhdRkqt3'
      },
      scope: [ 'profile', 'email' ]
    });
    
    var StrategySpy = sinon.spy(Strategy);
    
    var factory = $require('../../app/auth/bearer',
      { 'passport-http-bearer': StrategySpy });
    var strategy = factory(tokens);
    
    it('should construct strategy', function() {
      expect(StrategySpy).to.have.been.calledOnce;
      expect(StrategySpy).to.have.been.calledWith({ passReqToCallback: true });
    });
    
    it('should return strategy', function() {
      expect(strategy).to.be.an.instanceOf(Strategy);
    });
    
    describe('verify', function() {
      var user, info;
      
      before(function(done) {
        var verify = StrategySpy.args[0][1];
        verify({}, '2YotnFZFEjr1zCsicMWpAA', function(e, u, i) {
          if (e) { return done(e); }
          user = u;
          info = i;
          done();
        });
      });
      
      it('should verify token', function() {
        expect(tokens.verify).to.calledOnceWith('2YotnFZFEjr1zCsicMWpAA');
      });
      
      it('should yield user', function() {
        expect(user).to.deep.equal({
          id: '248289761001'
        });
      });
      
      it('should yield info', function() {
        expect(info).to.deep.equal({
          client: {
            id: 's6BhdRkqt3'
          },
          scope: [ 'profile', 'email' ]
        });
      });
    }); // verify
    
  }); // verifying token with scope
  
  describe('verifying token without client', function() {
    var tokens = new Object();
    tokens.verify = sinon.stub().yieldsAsync(null, {
      user: {
        id: '248289761001'
      }
    });
    
    var StrategySpy = sinon.spy(Strategy);
    
    var factory = $require('../../app/auth/bearer',
      { 'passport-http-bearer': StrategySpy });
    var strategy = factory(tokens);
    
    it('should construct strategy', function() {
      expect(StrategySpy).to.have.been.calledOnce;
      expect(StrategySpy).to.have.been.calledWith({ passReqToCallback: true });
    });
    
    it('should return strategy', function() {
      expect(strategy).to.be.an.instanceOf(Strategy);
    });
    
    describe('verify', function() {
      var user, info;
      
      before(function(done) {
        var verify = StrategySpy.args[0][1];
        verify({}, '2YotnFZFEjr1zCsicMWpAA', function(e, u, i) {
          if (e) { return done(e); }
          user = u;
          info = i;
          done();
        });
      });
      
      it('should verify token', function() {
        expect(tokens.verify).to.calledOnceWith('2YotnFZFEjr1zCsicMWpAA');
      });
      
      it('should yield user', function() {
        expect(user).to.deep.equal({
          id: '248289761001'
        });
      });
      
      it('should yield info', function() {
        expect(info).to.deep.equal({});
      });
    }); // verify
    
  }); // verifying token without client
  
  describe('encountering error while verifying token', function() {
    var tokens = new Object();
    tokens.verify = sinon.stub().yieldsAsync(new Error('something went wrong'));
    
    var StrategySpy = sinon.spy(Strategy);
    
    var factory = $require('../../app/auth/bearer',
      { 'passport-http-bearer': StrategySpy });
    var strategy = factory(tokens);
    
    it('should construct strategy', function() {
      expect(StrategySpy).to.have.been.calledOnce;
      expect(StrategySpy).to.have.been.calledWith({ passReqToCallback: true });
    });
    
    it('should return strategy', function() {
      expect(strategy).to.be.an.instanceOf(Strategy);
    });
    
    describe('verify', function() {
      var error, user, info;
      
      before(function(done) {
        var verify = StrategySpy.args[0][1];
        verify({}, '2YotnFZFEjr1zCsicMWpAA', function(e, u, i) {
          error = e;
          user = u;
          info = i;
          done();
        });
      });
      
      it('should verify token', function() {
        expect(tokens.verify).to.calledOnceWith('2YotnFZFEjr1zCsicMWpAA');
      });
      
      it('should yield error', function() {
        expect(error).to.be.an.instanceOf(Error);
        expect(error.message).to.equal('something went wrong');
      });
    
      it('should not yield user', function() {
        expect(user).to.be.undefined;
      });
    
      it('should not yield info', function() {
        expect(info).to.be.undefined;
      });
    }); // verify
    
  }); // encountering error while verifying token
  
});
