window.ev = window.ev || {};
window.ev.si = window.ev.si || {};

(function(vanilla, undefined) {
  'use strict';

  var AssetsLoader = function(options) {
    this.options = options || (options = {});
    _.bindAll(this, 'initialLoad', 'subsequentLoad');
  };

  AssetsLoader.prototype.initialLoad = function(data) {
    var self = this;
    var dfd = $.Deferred();
    var imagesManifest = data['initial-load']['images-manifest'];
    var queue = new createjs.LoadQueue();

    queue.addEventListener('complete', function() {
      if (self.options.loadSubsequent) {
        self.subsequentLoad(data);
      }

      dfd.resolve({
        message: 'complete'
      });
    });

    queue.addEventListener('progress', function(percent) {
      dfd.notify({
        message: percent.loaded
      });
    });

    queue.addEventListener('error', function(evt) {
      dfd.reject({
        errors: evt.text
      });
    });

    queue.loadManifest(imagesManifest, false);
    queue.setMaxConnections(5);
    queue.load();

    return dfd.promise();
  };

  AssetsLoader.prototype.subsequentLoad = function(data) {
    var self = this;
    var imagesManifest = data['subsequent-load']['images-manifest'];
    var subsequenLoadQueue = new createjs.LoadQueue();

    // subsequenLoadQueue.addEventListener('fileload', function(evt) {
    //   self.trigger('subsequentItemLoaded', evt.item);
    // });

    // this.subsequenLoadQueue.addEventListener('progress', function(percent) {});

    subsequenLoadQueue.addEventListener('error', function(evt) {
      console.log(self.name + ['subsequentLoad.error'], evt.text);
    });

    subsequenLoadQueue.loadManifest(imagesManifest, false);

    // i want to be sure items are loaded in set order
    subsequenLoadQueue.setMaxConnections(1);

    subsequenLoadQueue.load();
  };

  vanilla.AssetsLoader = AssetsLoader;

}(window.ev.si.vanilla = window.ev.si.vanilla || {}));
