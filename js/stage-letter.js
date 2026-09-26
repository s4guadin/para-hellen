(function (global) {
  'use strict';

  var C = window.CONTENT.letter;
  var FX = window.PinkyFX;
  var App = window.App;

  App.register('letter', function (stage) {
    var container = stage.querySelector('.letter-stage');
    if (!container) {
      stage.innerHTML =
        '<div class="stage-inner letter-stage">' +
          '<p class="sub-inline"></p>' +
          '<div class="envelope" id="mainEnvelope" aria-hidden="true">' +
            '<div class="env-back"></div>' +
            '<div class="env-letter"><span class="env-letter-text"></span></div>' +
            '<div class="env-flap"></div>' +
            '<div class="env-seal">\u2764</div>' +
          '</div>' +
          '<p class="letter-ask"></p>' +
          '<div class="btn-row" id="letterBtns">' +
            '<button class="btn btn-primary" id="btnYes"></button>' +
            '<button class="btn btn-ghost no-btn" id="btnNo"></button>' +
          '</div>' +
        '</div>';
      container = stage.querySelector('.letter-stage');
    }

    container.querySelector('.sub-inline').textContent = C.greeting;
    container.querySelector('.env-letter-text').textContent = C.envelope.letterText;
    container.querySelector('.letter-ask').textContent = C.question;

    var envelope = document.getElementById('mainEnvelope');
    var ask = stage.querySelector('.letter-ask');
    var btnRow = document.getElementById('letterBtns');
    var yesBtn = document.getElementById('btnYes');
    var noBtn = document.getElementById('btnNo');
    yesBtn.textContent = C.yes;
    noBtn.textContent = C.no;

    var inner = stage.querySelector('.letter-stage');
    var opened = false;
    var dodges = 0;

    function rectsOverlap(a, b, margin) {
      return !(a.right + margin < b.left || b.right + margin < a.left ||
               a.bottom + margin < b.top || b.bottom + margin < a.top);
    }

    function moveNoBtn() {
      var simRect = yesBtn.getBoundingClientRect();
      var rect = noBtn.getBoundingClientRect();
      var pad = 12;
      var w = rect.width;
      var h = rect.height;
      var maxX = Math.max(pad, window.innerWidth - w - pad);
      var maxY = Math.max(pad, window.innerHeight - h - pad);
      var nx = null;
      var ny = null;

      for (var attempt = 0; attempt < 24; attempt++) {
        var cx = pad + Math.random() * (maxX - pad);
        var cy = pad + Math.random() * (maxY - pad);
        if (!rectsOverlap({ left: cx, top: cy, right: cx + w, bottom: cy + h }, simRect, 14)) {
          nx = cx;
          ny = cy;
          break;
        }
      }
      if (nx === null) {
        nx = pad + Math.random() * (maxX - pad);
        ny = maxY * 0.5 + Math.random() * (maxY * 0.5);
      }

      if (dodges === 0) {
        noBtn.style.position = 'fixed';
        noBtn.style.left = rect.left + 'px';
        noBtn.style.top = rect.top + 'px';
        noBtn.classList.add('no-dodge');
      }
      dodges++;
      noBtn.style.left = nx + 'px';
      noBtn.style.top = ny + 'px';
      noBtn.style.transform = 'rotate(' + ((Math.random() - 0.5) * 16) + 'deg)';
    }

    function jumpOnTouch(e) {
      e.preventDefault();
      moveNoBtn();
    }

    if (!FX.reduced) {
      noBtn.addEventListener('mouseenter', moveNoBtn);
      noBtn.addEventListener('touchstart', jumpOnTouch, { passive: false });
    } else {
      noBtn.addEventListener('touchstart', jumpOnTouch, { passive: false });
    }

    function openLetter() {
      if (opened) return;
      opened = true;
      if (window.PinkyMusic) {
        window.PinkyMusic.start();
      }
      yesBtn.disabled = true;
      noBtn.disabled = true;
      btnRow.classList.add('fade-out');
      ask.classList.add('fade-out');

      setTimeout(function () {
        btnRow.style.display = 'none';
        ask.style.display = 'none';
        envelope.classList.add('is-opening');
      }, 280);

      setTimeout(function () {
        envelope.classList.add('is-open');
      }, 700);

      setTimeout(function () {
        FX.burstHearts(inner, { count: 14 });
      }, 1550);

      setTimeout(function () {
        App.go('birthday');
      }, 2650);
    }

    yesBtn.addEventListener('click', openLetter);
  });
})(window);