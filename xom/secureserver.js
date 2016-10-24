exports = module.exports = function(Crypto) {
  var https = require('https');
  
  
  return new Promise(function(resolve, reject) {
    function createServer(options) {
      var server = https.createServer(options);
      return resolve(server);
    }
    
    
    Crypto.generateKey({ name: 'RSASSA-PKCS1-v1_5' }, function(err, pair) {
      console.log('GENERATED:');
      console.log(err);
      //console.log(err.stack)
      console.log(pair);
      
      if (err) { return reject(err); }
    
    
      createServer({ cert: pair.publicKey, key: pair.privateKey });
    });
  });
}

exports['@implements'] = 'http://i.bixbyjs.org/http/SecureServer';
exports['@singleton'] = true;
exports['@require'] = [
  'http://i.bixbyjs.org/crypto'
];
