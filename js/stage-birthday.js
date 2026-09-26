(function (global) {
  'use strict';

  var C = window.CONTENT.birthday;
  var FX = window.PinkyFX;
  var App = window.App;

  App.register('birthday', function (stage) {
    stage.innerHTML =
      '<div class="stage-inner bday-stage">' +
        '<div class="paper bday-card" id="bdayCard">' +
          '<h2 class="bday-emoji">' + C.emoji + '</h2>' +
          '<h2 class="paper-title bday-title">' + C.title + '</h2>' +
          '<div class="bday-lines">' +
            C.lines.map(function (text) { return '<p class="bday-line">' + text + '</p>'; }).join('') +
          '</div>' +
          '<button class="btn btn-primary btn-block-center pop-in" id="bdayNext">' + C.continueLabel + '</button>' +
        '</div>' +
      '</div>';

    var inner = stage.querySelector('.bday-stage');
    var lines = inner.querySelectorAll('.bday-line');

    if (FX.reduced) {
      lines.forEach(function (l) {
        l.classList.add('show');
      });
    } else {
      lines.forEach(function (l, i) {
        setTimeout(function () {
          l.classList.add('show');
        }, 350 + i * 420);
      });
      setTimeout(function () {
        FX.burstHearts(inner, { count: 10 });
      }, 1000);
    }

    document.getElementById('bdayNext').addEventListener('click', function () {
      App.go('declaration');
    });
  });
})(window);