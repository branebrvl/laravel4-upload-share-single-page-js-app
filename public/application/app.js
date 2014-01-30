window.ev = window.ev || {};
window.ev.si = window.ev.si || {};

(function(vanilla, undefined) {
  'use strict';

  var config = vanilla.config;

  var app = {
    root: '',
    prefix: 'application/templates/',
    fetchTemplate: function(path, done) {
      var JST = window.JST = window.JST || {};
      var def = new $.Deferred();

      path = this.formPath(path);
      // Should be an instant synchronous way of getting the template, if it
      // exists in the JST object.
      if (JST[path]) {
        if (_.isFunction(done)) {
          done(JST[path]);
        }
        return def.resolve(JST[path]);
      }
      // Fetch it asynchronously if not available from JST, ensure that
      // template requests are never cached and prevent global ajax event
      // handlers from firing.
      $.ajax({
        url: path,
        type: "get",
        dataType: "text",
        cache: false,
        global: false,
        success: function(contents) {
          JST[path] = _.template(contents);
          // Set the global JST cache and return the template
          if (_.isFunction(done)) {
            done(JST[path]);
          }
          // Resolve the template deferred
          def.resolve(JST[path]);
        },
        error: function(error) {
          console.log('template not found');
        }
      });
      // Ensure a normalized return value (Promise)
      return def.promise();
    },

    formPath: function(path) {
      return [this.root, this.prefix, path, '.html'].join('');
    },

    trackEvent: function(event) {
      if (!_.isUndefined(window._gaq)) {
        _gaq.push(['_trackEvent', this.emcGACampaign, event]);
      }
    }
  };

  _.extend(app, config);

  vanilla.app = app;

}(window.ev.si.vanilla = window.ev.si.vanilla || {}));
