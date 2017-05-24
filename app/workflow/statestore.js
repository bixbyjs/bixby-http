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

exports['@implements'] = 'http://i.bixbyjs.org/http/workflow/StateStore';
exports['@singleton'] = true;
exports['@require'] = [ '!container' ];
