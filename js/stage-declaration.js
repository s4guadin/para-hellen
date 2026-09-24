(function (global) {
  'use strict';

  var C = window.CONTENT.declaration;
  var FX = window.PinkyFX;
  var App = window.App;

  App.register('declaration', function (stage) {
    stage.innerHTML =
      '<div class="stage-inner decl-stage">' +
        '<div class="paper pop-in" id="declPaper">' +
          '<h2 class="paper-title">' + C.paperHeader + '</h2>' +
          '<div class="typing" id="typing" aria-live="polite"></div>' +
          '<button class="btn btn-primary btn-block-center" id="declContinue" style="display:none;">' + C.continueLabel + '</button>' +
        '</div>' +
        '<button class="skip-link" id="declSkip">' + C.skipLabel + '</button>' +
      '</div>';

    var typingEl = document.getElementById('typing');
    var inner = stage.querySelector('.decl-stage');
    var skipBtn = document.getElementById('declSkip');
    var contBtn = document.getElementById('declContinue');

    var stopped = false;
    var destroyed = false;
    var done = false;

    function typeAll() {
      var entries = C.paragraphs.map(function (text) {
        var p = document.createElement('p');
        p.className = 'typing-line';
        typingEl.appendChild(p);
        return { p: p, text: text };
      });
      var SPEED = C.speed || 14;
      var PAUSE = C.pauseBetween || 380;

      function typeParagraph(i) {
        if (destroyed || stopped) return;
        if (i >= entries.length) {
          finish();
          return;
        }
        var entry = entries[i];
        entry.p.classList.add('caret-active');
        var idx = 0;
        var timer = setInterval(function () {
          if (destroyed || stopped) {
            clearInterval(timer);
            return;
          }
          idx++;
          entry.p.textContent = entry.text.slice(0, idx);
          if (idx >= entry.text.length) {
            clearInterval(timer);
            entry.p.classList.remove('caret-active');
            setTimeout(function () {
              typeParagraph(i + 1);
            }, PAUSE);
          }
        }, SPEED);
      }

      typeParagraph(0);
    }

    function finish() {
      if (done) return;
      done = true;
      contBtn.style.display = 'flex';
      requestAnimationFrame(function () {
        contBtn.classList.add('pop-in');
      });
      FX.burstHearts(inner, { count: 6 });
    }

    skipBtn.addEventListener('click', function () {
      if (done) return;
      stopped = true;
      typingEl.innerHTML = '';
      C.paragraphs.forEach(function (text) {
        var p = document.createElement('p');
        p.className = 'typing-line';
        p.textContent = text;
        typingEl.appendChild(p);
      });
      finish();
    });

    contBtn.addEventListener('click', function () {
      App.go('cards');
    });

    var timer = setTimeout(function () {
      if (FX.reduced) {
        skipBtn.click();
      } else {
        typeAll();
      }
    }, 700);

    return function () {
      destroyed = true;
      clearTimeout(timer);
    };
  });
})(window);