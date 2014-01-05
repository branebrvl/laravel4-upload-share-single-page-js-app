window.ev = window.ev || {};
window.ev.si = window.ev.si || {};

(function(vanilla, undefined) {
  'use strict';

  var app = vanilla.app;
  var VanillaApp = vanilla.VanillaApp;

  $(function() {
    var vanillaApp = new VanillaApp(app.options);
    // set delay to show preloader when testing
    vanillaApp.init(0);
  });

}(window.ev.si.vanilla = window.ev.si.vanilla || {}));
