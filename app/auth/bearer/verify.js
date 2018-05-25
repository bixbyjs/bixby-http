exports = module.exports = function(authenticate) {
  
  return function verify(req, token, cb) {
    
    authenticate(token, function(err, msg, conditions, issuer) {
      if (err) { return cb(err); }
      
      // TODO: Check confirmation methods, etc
      
      var info = {};
      if (msg.scope) {
        info.scope = msg.scope;
      }
      if (msg.client) {
        info.client = msg.client;
      }
      if (issuer) {
        info.issuer = issuer;
      }
      
      // TODO: Support for authenticating the issuer, in self-issued scenarios without `sub`
      return cb(null, msg.user, info);
    });
  };
};

exports['@require'] = [
  'http://i.bixbyjs.org/security/authentication/token/authenticate'
];
