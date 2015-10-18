exports = module.exports = function express(id) {
  var map = {
    'server': './server'
  };
  
  var mid = map[id];
  if (mid) {
    return require(mid);
  }
};

exports.used = function(container) {
  // Register specs so objects can be auto-wired by interface.
  container.register('server');
}
