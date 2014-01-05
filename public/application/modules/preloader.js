window.ev = window.ev || {};
window.ev.si = window.ev.si || {};

(function(vanilla, undefined) {
  'use strict';

  var app = vanilla.app;
  var AElement = vanilla.AElement;
  var opts = {
    lines: 11, // The number of lines to draw
    length: 1, // The length of each line
    width: 4, // The line thickness 
    radius: 9, // The radius of the inner circle
    corners: 1, // Corner roundness (0..1)
    rotate: 0, // The rotation offset
    direction: 1, // 1: clockwise, -1: counterclockwise
    color: '#fff', // #rgb or #rrggbb
    speed: 1.5, // Rounds per second
    trail: 100, // Afterglow percentage
    shadow: true, // Whether to render a shadow
    hwaccel: false, // Whether to use hardware acceleration
    className: 'spinner', // The CSS class to assign to the spinner
    zIndex: 2e9, // The z-index (defaults to 2000000000)
    top: 'auto', // Top position relative to parent in px
    left: 'auto' // Left position relative to parent in px
  };

  function Preloader() {
    this.$el = $('<div>', {
      'class': 'preloader'
    });

    this.templateFile = 'preloader';
  }

  _.inherits(Preloader, AElement);

  Preloader.prototype.resolveRender = function(template) {
    this.$el.append(template());
    var target = this.$el.find(".preloader-spinner");
    var spinner = new Spinner(opts).spin(target[0]);
  };

  vanilla.Preloader = Preloader;

}(window.ev.si.vanilla = window.ev.si.vanilla || {}));
