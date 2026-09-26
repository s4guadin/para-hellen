(function (global) {
  'use strict';

  var cfg = (global.CONTENT && CONTENT.music) || {};
  var btn = document.getElementById('musicToggle');
  var icon = btn ? btn.querySelector('.music-icon') : null;

  if (!cfg.src || !btn) {
    if (btn) {
      btn.style.display = 'none';
    }
    return;
  }

  var audio = new Audio(cfg.src);
  audio.loop = true;
  audio.volume = 0.35;
  audio.preload = 'auto';

  var playing = false;

  function startPlayback() {
    if (playing) return;
    var p = audio.play();
    if (p && p.then) {
      p.then(function () {
        playing = true;
        updateBtn();
      }).catch(function (err) {
        console.warn('Autoplay bloqueado pelo navegador:', err && err.message);
      });
    } else {
      playing = true;
      updateBtn();
    }
  }

  startPlayback();

  var resumeEvents = ['pointerdown', 'touchstart', 'keydown'];
  function onFirstInteraction() {
    if (!playing) {
      startPlayback();
    }
    resumeEvents.forEach(function (name) {
      document.removeEventListener(name, onFirstInteraction);
    });
  }
  resumeEvents.forEach(function (name) {
    document.addEventListener(name, onFirstInteraction);
  });

  btn.addEventListener('click', function () {
    if (playing) {
      audio.pause();
      playing = false;
    } else {
      startPlayback();
      return;
    }
    updateBtn();
  });

  function updateBtn() {
    btn.classList.toggle('playing', playing);
    btn.setAttribute('aria-pressed', String(playing));
    btn.setAttribute('aria-label', playing ? 'Pausar música' : 'Tocar música');
    btn.title = playing ? 'Pausar música' : 'Tocar música';
    if (icon) {
      icon.innerHTML = playing ? '&#9836;' : '&#9835;';
    }
  }

  audio.addEventListener('error', function () {
    btn.classList.add('music-missing');
    btn.title = 'Música não encontrada (adicione o arquivo em ' + cfg.src + ')';
    if (icon) {
      icon.innerHTML = '&#128263;';
    }
  });
})(window);