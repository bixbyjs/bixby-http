exports = module.exports = function(container, logger) {
  // Load modules.
  var passport = require('passport');
  
  var authenticator = new passport.Authenticator();
  var schemeComps = container.components('http://i.bixbyjs.org/http/auth/Scheme');
  
  return Promise.all(schemeComps.map(function(comp) { return comp.create(); } ))
    .then(function(schemes) {
      // Register HTTP authentication schemes.
      schemes.forEach(function(scheme, i) {
        authenticator.use(schemeComps[i].a['@scheme'] || scheme.name, scheme);
        logger.info('Loaded HTTP authentication scheme: ' + (schemeComps[i].a['@scheme'] || scheme.name));
      });
    })
    .then(function() {
      return authenticator;
    });
}

exports['@implements'] = 'http://i.bixbyjs.org/http/Authenticator';
exports['@singleton'] = true;
exports['@require'] = [ '!container', 'http://i.bixbyjs.org/Logger' ];
