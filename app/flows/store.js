exports = module.exports = function(container) {
  var Factory = require('fluidfactory');
  
  
  var factory = new Factory();
  
  var createFnDecls = container.specs('http://i.bixbyjs.org/http/flows/.createStateStoreFunc');
  return Promise.all(createFnDecls.map(function(spec) { return container.create(spec.id); } ))
    .then(function(fns) {
      fns.forEach(function(fn, i) {
        factory.use(fn);
      });
    })
    .then(function() {
      return factory.create();
    });
};

// TODO: Rename this to http/flows/StateStore
exports['@implements'] = 'http://i.bixbyjs.org/http/state/Store';
exports['@singleton'] = true;
exports['@require'] = [ '!container' ];
