exports = module.exports = function(PKI, Crypto) {
  var https = require('https');
  
  
  // TODO: Investigate options for obtaining a certificate from a CA
  //       or self-signing a certificate automatically at run-time.
  //       https://www.npmjs.com/package/keypair
  //       https://www.npmjs.com/package/akeypair
  
  
  return new Promise(function(resolve, reject) {
    function createServer(options) {
      var server = https.createServer(options);
      return resolve(server);
    }
    
    Crypto.generateKey({ algorithm: 'RSA' }, function(err, pair) {
      if (err) { return reject(err); }
    
      PKI.requestCert({}, pair.publicKey, { key: pair.privateKey }, function(err, cert) {
        if (err) { return reject(err); }
        
        createServer({ cert: cert, key: pair.privateKey });
      });
    });
  });
}

exports['@implements'] = 'http://i.bixbyjs.org/http/SecureServer';
exports['@singleton'] = true;
exports['@require'] = [
  'http://i.bixbyjs.org/pki',
  'http://i.bixbyjs.org/crypto'
];
