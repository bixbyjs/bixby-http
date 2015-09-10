exports = module.exports = function express(id) {
  var map = {
    'server': './server'
  };
  
  var mid = map[id];
  if (mid) {
    return require(mid);
  }
};
