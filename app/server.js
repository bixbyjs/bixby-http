exports = module.exports = function() {
  var http = require('http');
  
  // TODO: Implement support for HTTP server cluster
  //       https://github.com/bixbyjs/bixby-express/blob/768baba27a9ad762ca648e27e12f0c366e3886d2/lib/boot/httpserver.js
  
  var server = http.createServer();
  return server;
};

exports['@implements'] = 'http://i.bixbyjs.org/http/Server';
exports['@require'] = [];
