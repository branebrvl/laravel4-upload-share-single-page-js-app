window.ev = window.ev || {};
window.ev.si = window.ev.si || {};

(function(vanilla, undefined) {
  'use strict';

  var app = vanilla.app;
  var AssetsLoader = vanilla.AssetsLoader;
  var VanillaApp = vanilla.VanillaApp;

  describe('VanillaApp Module', function() {

    var vanillaApp;

    beforeEach(function() {
      loadFixtures('main.html');

      vanillaApp = new VanillaApp();
    });

    afterEach(function() {
      $('main').remove();
    });

    describe('When the vanillaApp module is initialized', function() {
      it("should be an instance of the AElement object", function() {
        expect(VanillaApp.prototype instanceof vanilla.AElement).toBeTruthy();
      });

      it("should inherit the render method", function() {
        expect(vanillaApp.render).toBeDefined();
      });

      it("should have the object $el wich should be a div element", function() {
        expect(vanillaApp.$el).toBe('div');
      });
    });

    describe('When the vanillaApp init method is called', function() {
      var done;

      beforeEach(function() {
        done = false;
        vanillaApp.hasRendered = false;
        vanillaApp.assetsLoader = new AssetsLoader({
          loadSubsequent: false
        });

        // Adding the fake call to avoid loading assets via assets manager when running unit tests.
        spyOn(vanillaApp.assetsLoader, 'initialLoad').andCallFake(function() {
          var d = $.Deferred();

          done = true;

          d.resolve({
            message: 'complete'
          });

          return d.promise();
        });

        vanillaApp.init();
      });

      afterEach(function() {});

      it('should render', function() {
        spyOn(vanillaApp, 'render');

        waitsFor(function() {
          return done;
        });
        runs(function() {
          expect(vanillaApp.render).toHaveBeenCalled();
        });
      });
    });
  });
}(window.ev.si.vanilla= window.ev.si.vanilla || {}));
