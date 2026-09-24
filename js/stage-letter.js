(function (global) {
  'use strict';

  var C = window.CONTENT.letter;
  var FX = window.PinkyFX;
  var App = window.App;

  App.register('letter', function (stage) {
    stage.innerHTML =
      '<div class="stage-inner letter-stage">' +
        '<p class="sub-inline">' + C.greeting + '</p>' +
        '<button class="envelope-open-btn" id="envelopeBtn" aria-label="Abrir a cartinha">' +
          '<span class="envelope" id="mainEnvelope">' +
            '<span class="env-back"></span>' +
            '<span class="env-letter"><span class="env-letter-text">' + C.envelope.letterText + '</span></span>' +
            '<span class="env-flap"></span>' +
            '<span class="env-seal">\u2764</span>' +
          '</span>' +
        '</button>' +
        '<p class="env-hint" id="envHint">toque na carta para abrir</p>' +
        '<div class="letter-reveal" id="letterReveal">' +
          '<p class="letter-ask">' + C.question + '</p>' +
          '<div class="btn-row" id="letterBtns">' +
            '<button class="btn btn-primary" id="btnYes">' + C.yes + '</button>' +
            '<button class="btn btn-ghost no-btn" id="btnNo">' + C.no + '</button>' +
          '</div>' +
        '</div>' +
      '</div>';

    var envBtn = document.getElementById('envelopeBtn');
    var envelope = document.getElementById('mainEnvelope');
    var hint = document.getElementById('envHint');
    var reveal = document.getElementById('letterReveal');
    var inner = stage.querySelector('.letter-stage');
    var opened = false;

    function attachButtons() {
      var yesBtn = document.getElementById('btnYes');
      var noBtn = document.getElementById('btnNo');
      var btnRow = document.getElementById('letterBtns');
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

      yesBtn.addEventListener('click', function () {
        yesBtn.disabled = true;
        noBtn.disabled = true;
        btnRow.classList.add('fade-out');
        setTimeout(function () {
          App.go('declaration');
        }, 420);
      });
    }

    function openEnvelope() {
      if (opened) return;
      opened = true;
      envBtn.disabled = true;

      hint.classList.add('fade-out');
      setTimeout(function () {
        hint.style.display = 'none';
      }, 320);

      envelope.classList.add('is-opening');
      setTimeout(function () {
        envelope.classList.add('is-open');
      }, 60);

      setTimeout(function () {
        FX.burstHearts(inner, { count: 12 });
        reveal.classList.add('show');
        attachButtons();
      }, 2050);
    }

    envBtn.addEventListener('click', openEnvelope);
  });
})(window);