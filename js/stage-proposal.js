(function (global) {
  'use strict';

  var C = window.CONTENT.proposal;
  var YES = window.CONTENT.yesMessage;
  var NO = window.CONTENT.noMessage;
  var FX = window.PinkyFX;
  var App = window.App;

  App.register('proposal', function (stage) {
    stage.innerHTML =
      '<div class="stage-inner proposal-stage">' +
        '<p class="p-greet">' + C.greet + '</p>' +
        '<p class="p-lead">' + C.lead + '</p>' +
        '<p class="p-question">' + C.question + '</p>' +
        '<div class="btn-row proposal-btns">' +
          '<button class="btn btn-primary btn-big" id="propYes">' + C.yes + '</button>' +
          '<button class="btn btn-ghost btn-big" id="propNo">' + C.no + '</button>' +
        '</div>' +
      '</div>';

    var inner = stage.querySelector('.proposal-stage');
    var boxes = inner.querySelectorAll('.p-greet, .p-lead, .p-question, .proposal-btns');

    if (FX.reduced) {
      boxes.forEach(function (b) {
        b.classList.add('show');
      });
    } else {
      setTimeout(function () {
        boxes.forEach(function (b, i) {
          setTimeout(function () {
            b.classList.add('show');
          }, 420 + i * 920);
        });
        setTimeout(function () {
          FX.burstHearts(inner, { count: 10 });
        }, 4300);
      }, 380);
    }

    for (var i = 0; i < 18; i++) {
      var s = FX.makeSpan('\u2726', 'proposal-star', FX.random(0, 100), FX.random(8, 17), FX.random(3, 6), FX.random(0, 3));
      s.style.top = FX.random(0, 100) + '%';
      inner.appendChild(s);
    }

    document.getElementById('propYes').addEventListener('click', function () {
      showResult(true);
    });
    document.getElementById('propNo').addEventListener('click', function () {
      showResult(false);
    });

    function showResult(accepted) {
      stage.innerHTML = '';
      var lines = accepted ? YES.lines : NO.lines;
      var wrap = document.createElement('div');
      wrap.className = 'stage-inner result' + (accepted ? ' celebrate' : '');
      wrap.setAttribute('role', 'status');

      lines.forEach(function (line, i) {
        var p = document.createElement('p');
        p.className = 'result-line';
        if (i === 0) p.classList.add('result-first');
        p.textContent = line;
        wrap.appendChild(p);
      });

      var again = document.createElement('button');
      again.className = 'skip-link restart';
      again.textContent = 'ver o começo de novo';
      again.addEventListener('click', function () {
        window.location.reload();
      });
      wrap.appendChild(again);

      stage.appendChild(wrap);

      requestAnimationFrame(function () {
        wrap.classList.add('show');
      });

      if (accepted) {
        if (FX.reduced) {
          FX.burstHearts(wrap, { count: 10 });
        } else {
          var count = 0;
          var burstTimer = setInterval(function () {
            FX.burstHearts(wrap, { count: 16 });
            count++;
            if (count >= 4) clearInterval(burstTimer);
          }, 520);
        }
      }
    }
  });
})(window);