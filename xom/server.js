exports = module.exports = function(container, settings) {
  // Load modules.
  var http = require('http')
    , https = require('https');
  
  
  settings = settings.isolate(this.baseNS);
  
  var options = settings.get('server') || {}
    , server, opts;
  
  // TODO: Implement support for HTTP server cluster
  //       https://github.com/bixbyjs/bixby-express/blob/768baba27a9ad762ca648e27e12f0c366e3886d2/lib/boot/httpserver.js
  
  //options.secure = true;
  
  if (options.secure) {
    // TODO: Investigate options for obtaining a certificate from a CA
    //       or self-signing a certificate automatically at run-time.
    //       https://www.npmjs.com/package/keypair
    //       https://www.npmjs.com/package/akeypair
    
    // TODO: Implement support for HTTPS server
    //       https://github.com/bixbyjs/bixby-express/blob/768baba27a9ad762ca648e27e12f0c366e3886d2/lib/boot/httpserver.js
    
    return container.create('./secureserver');
    
    //opts = {};
    //server = https.createServer(opts);
  } else {
    server = http.createServer();
  }
  
  return server;
}

exports['@implements'] = 'http://i.bixbyjs.org/http/Server';
exports['@singleton'] = true;
exports['@require'] = [ '!container', 'http://i.bixbyjs.org/Settings' ];
