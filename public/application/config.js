window.ev = window.ev || {};
window.ev.si = window.ev.si || {};

(function(vanilla, undefined) {
  'use strict';

  var config = {
    // unique campaign identifier [13-5420] TH-AUS Christmas - Freedom Furniture (1) FlipBook Overlay
    emcGACampaign: 'unique-indentifier',

    "initial-load": {
      "images-manifest": [
        "images/override_book/base.png",
        "images/override_book/cover.png",
        "images/override_book/index.png",
        "images/override_book/spiral.png"
      ]
    },

    "subsequent-load": {
      "images-manifest": [
        "images/override_book/float_bg.png",
        "images/override_book/float_bg_b.png",
        "images/override_book/float_fx.png",
        "images/override_book/float_hs.png"
      ]
    }
  };
  vanilla.config = config;

}(window.ev.si.vanilla = window.ev.si.vanilla || {}));
