window.ev = window.ev || {};
window.ev.si = window.ev.si || {};

(function (vanilla, undefined) {
  'use strict';

  var app = vanilla.app;
  var AssetsLoader = vanilla.AssetsLoader;
  var Preloader = vanilla.Preloader;
  var AElement = vanilla.AElement;

  function VanillaApp(config) {
    this.$el = $('<div>', {
      'id': 'vanilla-wrapper',
      'class': 'vanilla-wrapper'
    });

    this.config = config;
    this.templateFile = 'vanilla';
    this.assetsLoader = new AssetsLoader({
      loadSubsequent: true
    });
  }

  _.inherits(VanillaApp, AElement);

  function addEvents($element) {
    // Change this to the location of your server-side upload handler:
    var url = 'image/save';
    $('#fileupload')
      .fileupload({
      url: url,
      multipart: true,
      singleFileUploads: false,
      // singleFileUploads: false,
      dataType: 'json',
      done: function (e, data) {
        console.log(data.result.files);
        $.each(data.result.files, function (index, file) {
          $('<img/>')
            .attr('src', file)
            .appendTo('#files');
        });
      },
      progressall: function (e, data) {
        var progress = parseInt(data.loaded / data.total * 100, 10);
        $('#progress .progress-bar')
          .css(
          'width',
          progress + '%');
      }
    })
      .prop('disabled', !$.support.fileInput)
      .parent()
      .addClass($.support.fileInput ? undefined : 'disabled');
  }

  VanillaApp.prototype.init = function (delay) {
    delay = delay || 0;
    var self = this;
    var preloader = new Preloader();

    $('main')
      .append(preloader.$el);
    preloader.render();

    // For testing only: delay removing of the preloader
    _.delay(function () {
      self.assetsLoader.initialLoad(app)
        .done(function () {
        preloader.$el.remove();
        $('main')
          .append(self.$el);
        self.render();
      });
    }, delay);
  };

  VanillaApp.prototype.resolveRender = function (template) {
    this.$el.append(template());
    this.hasRendered = true;
    addEvents(this.$el);
  };

  vanilla.VanillaApp = VanillaApp;

}(window.ev.si.vanilla = window.ev.si.vanilla || {}));
