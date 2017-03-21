exports = module.exports = function(store) {
  var flowstate = require('flowstate');
  
  var dispatcher = new flowstate.Manager(store);
  return dispatcher;
};

exports['@implements'] = 'http://i.bixbyjs.org/http/state/Dispatcher';
exports['@singleton'] = true;
exports['@require'] = [
  'http://i.bixbyjs.org/http/state/Store'
];
