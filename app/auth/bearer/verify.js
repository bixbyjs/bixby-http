exports = module.exports = function(authenticate) {
  
  return function verify(req, token, cb) {
    authenticate(token, function(err, tkn, ctx) {
      if (err) { return cb(err); }
      
      // TODO: Check confirmation methods, etc
      
      var info = {};
      if (ctx.client) {
        info.client = ctx.client;
      }
      if (ctx.scope) {
        info.scope = ctx.scope;
      }
      
      if (!ctx.subject) {
        return cb(null, false);
      }
      return cb(null, ctx.subject, info);
    });
  };
};

exports['@require'] = [
  'http://i.bixbyjs.org/security/authentication/token/authenticate'
];
