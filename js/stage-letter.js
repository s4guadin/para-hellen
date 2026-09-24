(function (global) {
  'use strict';

  var C = window.CONTENT.letter;
  var FX = window.PinkyFX;
  var App = window.App;

  App.register('letter', function (stage) {
    stage.innerHTML =
      '<div class="stage-inner letter-stage">' +
        '<p class="sub-inline">' + C.greeting + '</p>' +
        '<div class="envelope" id="mainEnvelope">' +
          '<div class="env-back"></div>' +
          '<div class="env-letter"><span class="env-letter-text">' + C.envelope.letterText + '</span></div>' +
          '<div class="env-flap"></div>' +
          '<div class="env-seal">\u2764</div>' +
        '</div>' +
        '<p class="letter-ask">' + C.question + '</p>' +
        '<div class="btn-row" id="letterBtns">' +
          '<button class="btn btn-primary" id="btnYes">' + C.yes + '</button>' +
          '<button class="btn btn-ghost no-btn" id="btnNo">' + C.no + '</button>' +
        '</div>' +
      '</div>';

    var envelope = document.getElementById('mainEnvelope');
    var ask = stage.querySelector('.letter-ask');
    var btnRow = stage.querySelector('#letterBtns');
    var yesBtn = document.getElementById('btnYes');
    var noBtn = document.getElementById('btnNo');
    var inner = stage.querySelector('.letter-stage');
    var opened = false;
    var dodges = 0;

    function moveNoBtn() {
      var rect = noBtn.getBoundingClientRect();
      var pad = 12;
      var w = rect.width;
      var h = rect.height;
      var maxX = Math.max(pad, window.innerWidth - w - pad);
      var maxY = Math.max(pad, window.innerHeight - h - pad);
      var nx = pad + Math.random() * (maxX - pad);
      var ny = pad + Math.random() * (maxY - pad);

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
        App.go('declaration');
      }, 2650);
    }

    yesBtn.addEventListener('click', openLetter);
  });
})(window);