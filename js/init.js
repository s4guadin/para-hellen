(function () {
  'use strict';

  var FX = window.PinkyFX;

  FX.makeStars(document.getElementById('stars'), 90);
  FX.startFloatingHearts(document.getElementById('heartsLayer'));
  window.App.boot('letter');
})();