window.ev = window.ev || {};
window.ev.si = window.ev.si || {};

(function(vanilla, undefined) {
  'use strict';

  var app = vanilla.app;

  function AElement() {}

  AElement.prototype.resolveRender = function(template) {
    this.$el.append(template());
  };

  AElement.prototype.render = function() {
    var self = this;
    var dfd = $.Deferred();

    app.fetchTemplate(this.templateFile)
      .done(function(template) {
        self.resolveRender(template);
        dfd.resolve(self.$el);
      })
      .fail(function(err) {
        dfd.reject({
          errors: err
        });
      });

    return dfd.promise();
  };

  AElement.prototype.$el = function() {
    return $('<div>');
  };

  AElement.prototype.templateFile = function() {
    return null;
  };

  AElement.prototype.hasRendered = function() {
    return false;
  };

  vanilla.AElement = AElement;

}(window.ev.si.vanilla = window.ev.si.vanilla || {}));
