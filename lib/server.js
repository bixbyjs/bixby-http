exports = module.exports = function() {
  var http = require('http');
  
  var server = http.createServer();
  return server;
}


exports['@singleton'] = true;
exports['@implements'] = 'http://i.bixbyjs.org/http/Server';
