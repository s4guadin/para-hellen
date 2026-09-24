(function (global) {
  'use strict';

  var C = window.CONTENT.cards;
  var FX = window.PinkyFX;
  var App = window.App;

  App.register('cards', function (stage) {
    var MSG = C.messages;
    var revealed = 0;

    stage.innerHTML =
      '<div class="stage-inner cards-stage">' +
        '<h1 class="stage-title">' + C.title + '</h1>' +
        '<div class="cards-progress" id="cardsProgress"></div>' +
        '<div class="cards" id="cardsGrid"></div>' +
        '<div class="cards-done" id="cardsDone">' +
          '<p>' + C.doneMessage + '</p>' +
          '<button class="btn btn-primary" id="cardsNext">' + C.continueLabel + '</button>' +
        '</div>' +
      '</div>';

    var grid = document.getElementById('cardsGrid');
    var progressEl = document.getElementById('cardsProgress');
    var doneEl = document.getElementById('cardsDone');
    doneEl.style.display = 'none';

    function updateProgress() {
      progressEl.textContent = revealed + ' de ' + MSG.length + ' ' + C.progressPrefix;
    }
    updateProgress();

    MSG.forEach(function (text, i) {
      var card = document.createElement('button');
      card.className = 'card';
      card.setAttribute('aria-label', 'Revelar mensagem');
      card.innerHTML =
        '<span class="card-inner">' +
          '<span class="card-face card-front">' +
            '<span class="card-q">?</span>' +
            '<span class="card-hint">toque para descobrir</span>' +
          '</span>' +
          '<span class="card-face card-back">' +
            '<span class="card-msg">' + text + '</span>' +
          '</span>' +
        '</span>';

      card.addEventListener('click', function () {
        if (card.classList.contains('is-open')) return;
        card.classList.add('is-open');
        card.setAttribute('aria-label', 'Mensagem revelada');
        revealed++;
        updateProgress();
        if (revealed === MSG.length) {
          setTimeout(function () {
            doneEl.style.display = 'block';
            requestAnimationFrame(function () {
              doneEl.classList.add('show');
            });
            FX.burstHearts(stage.querySelector('.cards-stage'), { count: 8 });
          }, 650);
        }
      });

      grid.appendChild(card);
      setTimeout(function () {
        card.classList.add('visible');
      }, 120 + i * 190);
    });

    document.getElementById('cardsNext').addEventListener('click', function () {
      App.go('album');
    });
  });
})(window);