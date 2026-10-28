(function (global) {
  'use strict';

  var C = window.CONTENT.final;
  var FX = window.PinkyFX;
  var App = window.App;

  App.register('final', function (stage) {
    var wrap = document.createElement('div');
    wrap.className = 'stage-inner result celebrate';
    wrap.setAttribute('role', 'status');

    C.lines.forEach(function (line, i) {
      var p = document.createElement('p');
      p.className = 'result-line';
      if (i === 0) p.classList.add('result-first');
      p.textContent = line;
      wrap.appendChild(p);
    });

    var again = document.createElement('button');
    again.className = 'skip-link restart';
    again.textContent = C.restartLabel;
    again.addEventListener('click', function () {
      window.location.reload();
    });
    wrap.appendChild(again);

    stage.appendChild(wrap);

    requestAnimationFrame(function () {
      wrap.classList.add('show');
    });

    var burstTimer = null;

    if (FX.reduced) {
      FX.burstHearts(wrap, { count: 10 });
    } else {
      var count = 0;
      burstTimer = setInterval(function () {
        FX.burstHearts(wrap, { count: 16 });
        count++;
        if (count >= 4) {
          clearInterval(burstTimer);
          burstTimer = null;
        }
      }, 520);
    }

    return function () {
      if (burstTimer) {
        clearInterval(burstTimer);
        burstTimer = null;
      }
    };
  });
})(window);
