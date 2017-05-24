exports = module.exports = function(container) {
  var Factory = require('fluidfactory');
  
  
  var factory = new Factory();
  
  var createImplDecls = container.specs('http://i.bixbyjs.org/http/workflow/createStateStoreImpl');
  return Promise.all(createImplDecls.map(function(spec) { return container.create(spec.id); } ))
    .then(function(impls) {
      impls.forEach(function(impl) {
        factory.use(impl);
      });
    })
    .then(function() {
      return factory.create();
    });
};

// TODO: Rename this to http/flow/StateStore
exports['@implements'] = 'http://i.bixbyjs.org/http/state/Store';
exports['@singleton'] = true;
exports['@require'] = [ '!container' ];
