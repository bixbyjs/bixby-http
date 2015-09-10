exports = module.exports = function(logger) {
  var http = require('http');
  
  var server = http.createServer();
  server.once('listening', function() {
    var addr = this.address();
    logger.info('HTTP server listening on %s:%d', addr.address, addr.port);
  });
  
  return server;
}


exports['@singleton'] = true;
exports['@require'] = ['http://i.bixbyjs.org/common/logger']
exports['@implements'] = 'http://i.bixbyjs.org/http/Server';
