(function (global) {
  'use strict';

  var stage = document.getElementById('stage');
  var bgTransition = document.getElementById('bgTransition');
  var reduced = !!(global.PinkyFX && PinkyFX.reduced);

  var manager = {
    stages: {},
    cleanup: null
  };

  manager.register = function (name, builder) {
    manager.stages[name] = builder;
  };

  function runTransition(goNext) {
    return new Promise(function (resolve) {
      if (reduced) {
        goNext();
        resolve();
        return;
      }
      bgTransition.classList.add('active');
      setTimeout(function () {
        goNext();
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            bgTransition.classList.remove('active');
          });
        });
        resolve();
      }, 520);
    });
  }

  manager.go = function (name) {
    var builder = manager.stages[name];
    if (!builder) {
      throw new Error('Estagio desconhecido: ' + name);
    }
    return runTransition(function () {
      if (manager.cleanup) {
        try {
          manager.cleanup();
        } catch (e) {}
        manager.cleanup = null;
      }
      stage.innerHTML = '';
      manager.cleanup = builder(stage);
    });
  };

  global.App = manager;
})(window);