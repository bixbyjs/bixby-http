exports = module.exports = function(PKI, Crypto) {
  var https = require('https');
  
  
  return new Promise(function(resolve, reject) {
    function createServer(options) {
      var server = https.createServer(options);
      return resolve(server);
    }
    
    Crypto.generateKey({ name: 'RSASSA-PKCS1-v1_5' }, function(err, pair) {
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
