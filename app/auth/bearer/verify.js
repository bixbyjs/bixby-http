exports = module.exports = function(authenticate) {
  
  return function verify(req, token, cb) {
    authenticate(token, function(err, tkn, ctx) {
      if (err) { return cb(err); }
      
      // TODO: Check confirmation methods, etc
      
      var info = {};
      if (tkn.client) {
        info.client = tkn.client;
      }
      if (tkn.scope) {
        info.scope = tkn.scope;
      }
      
      if (!tkn.subject) {
        return cb(null, false);
      }
      return cb(null, tkn.subject, info);
    });
  };
};

exports['@require'] = [
  'http://i.bixbyjs.org/security/authentication/token/authenticate'
];
