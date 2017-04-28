/*
exports = module.exports = {
  'authenticator': require('./authenticator'),
  'server': require('./server'),
  'secureserver': require('./secureserver'),
  'flow/dispatcher': require('./flow/dispatcher'),
  'flow/store': require('./flow/store'),
  'flow/store/session': require('./flow/store/session')
};
*/

exports = module.exports = function(id) {
  try {
    return require('./' + id);
  } catch (ex) {
    if (ex.code == 'MODULE_NOT_FOUND') { return; }
    throw ex;
  }
};
