window.ev = window.ev || {};
window.ev.si = window.ev.si || {};

(function(vanilla, undefined) {
  'use strict';

  var app = vanilla.app;
  var AElement = vanilla.AElement;

  describe('AbstractElement Module', function() {

    var aelement;

    beforeEach(function() {
      aelement = new AElement();
    });

    afterEach(function() {});

    describe('When the AE module is initialized', function() {
      it("should have the render method", function() {
        expect(aelement.render).toBeDefined();
      });

      it("should have the resolveRender method", function() {
        expect(aelement.resolveRender).toBeDefined();
      });
    });

    describe('When the render method is called', function() {
      var done;

      beforeEach(function() {
        done = false;
        aelement.hasRendered = false;
      });

      afterEach(function() {
      });

      it('should load a template and trigger the resolveRender method', function() {
        spyOn(aelement, 'resolveRender');
        
        aelement.templateFile = 'vanilla';
        aelement.render().done(function(){
          done = true;
        });

        waitsFor(function() {
          return done;
        });
        runs(function() {
          expect(aelement.resolveRender).toHaveBeenCalled();
        });
      });
    });
  });
}(window.ev.si.vanilla = window.ev.si.vanilla || {}));
