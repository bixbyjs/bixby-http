exports = module.exports = function(tokens) {
  var Strategy = require('passport-http-bearer');
  
  var strategy = new Strategy({ passReqToCallback: true }, function(req, token, cb) {
    
    tokens.verify(token, function(err, claims) {
      if (err) { return cb(err); }
      
      // TODO: Check confirmation methods, etc
      
      var info = {};
      if (claims.scope) {
        info.scope = claims.scope;
      }
      if (claims.client) {
        info.client = claims.client;
      }
      //if (issuer) {
      //  info.issuer = issuer;
      //}
      
      // TODO: Support for authenticating the issuer, in self-issued scenarios without `sub`
      return cb(null, claims.user, info);
    });
  });
  
  return strategy;
};

exports['@implements'] = 'http://i.bixbyjs.org/http/auth/Scheme';
exports['@scheme'] = 'bearer';
exports['@require'] = [
  'http://i.bixbyjs.org/security/TokenService'
];
