window.ev = window.ev || {};
window.ev.si = window.ev.si || {};

(function(vanilla, undefined) {
  'use strict';

  var app = vanilla.app;

  describe('app module', function() {
    var tmpl;
    var done;
    var tmplName = 'vanilla';

    beforeEach(function() {
      done = false;
    });

    afterEach(function() {
      window.JST = {};
    });

    it('should have root set to "base/" when testing', function() {
      expect(app.root).toEqual('base/');
    });

    it('should have GA indentifier set', function() {
      console.log(app.emcGACampaign);
      expect(app.emcGACampaign).toBeDefined();
      expect(app.emcGACampaign).not.toEqual('unique-indentifier');
    });

    it("should fetch a template for a given path", function() {
      app.fetchTemplate(tmplName).done(function(template) {
        tmpl = template;
        done = true;
      });

      waitsFor(function() {
        return done;
      });

      runs(function() {
        expect(typeof tmpl()).toEqual('string');
      });
    });

    it("should cache templates in global JST", function() {
      var path = app.formPath(tmplName);

      app.fetchTemplate(tmplName).done(function(template) {
        tmpl = template;
        done = true;
      });

      waitsFor(function() {
        return done;
      });

      runs(function() {
        expect(window.JST[path]()).toEqual(tmpl());
      });
    });

    it("should use a template from global JST if available", function() {
      var path = app.formPath(tmplName);

      window.JST[path] = _.template('mock template');

      app.fetchTemplate(tmplName).done(function(template) {
        done = true;
      });

      waitsFor(function() {
        return done;
      });

      runs(function() {
        expect(window.JST[path]()).toEqual('mock template');
      });
    });


  });

}(window.ev.si.vanilla = window.ev.si.vanilla || {}));
