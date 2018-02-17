exports = module.exports = function(container, settings, logger) {
  // Load modules.
  var http = require('http')
    , normalizePort = require('../lib/utils').normalizePort;
  
  
  // TODO: Implement support for HTTP server cluster
  //       https://github.com/bixbyjs/bixby-express/blob/768baba27a9ad762ca648e27e12f0c366e3886d2/lib/boot/httpserver.js
  
  var server = http.createServer();
  server.once('listening', function() {
    var addr = this.address();
    logger.info('HTTP server listening on %s:%d', addr.address, addr.port);
  });
  
  var options = settings.get('http/server') || {};
  var address = options.address;
  var port = options.port !== undefined ? options.port : normalizePort(process.env.PORT || 8080);

  server.listen(port, address);
  
  return server;
};

exports['@implements'] = 'http://i.bixbyjs.org/http/Server';
exports['@require'] = [
  '!container',
  'http://i.bixbyjs.org/Settings',
  'http://i.bixbyjs.org/Logger'
];
