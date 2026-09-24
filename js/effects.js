(function (global) {
  'use strict';

  var reduced = global.matchMedia
    ? global.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  function random(min, max) {
    return min + Math.random() * (max - min);
  }

  function makeSpan(text, cls, leftPct, sizePx, durationSec, delaySec) {
    var s = document.createElement('span');
    s.className = cls;
    s.textContent = text;
    s.style.left = leftPct + '%';
    s.style.fontSize = sizePx + 'px';
    s.style.setProperty('--tw', (durationSec || 4) + 's');
    s.style.setProperty('--td', (delaySec || 0) + 's');
    return s;
  }

  function makeStars(layer, count) {
    var glyphs = ['\u2726', '\u2727', '\u22C6', '\u00B7', '\u2726'];
    var i;
    for (i = 0; i < count; i++) {
      var s = document.createElement('span');
      s.className = 'star';
      s.textContent = glyphs[Math.floor(random(0, glyphs.length))];
      s.style.left = random(0, 100) + '%';
      s.style.top = random(0, 100) + '%';
      s.style.fontSize = random(7, 16) + 'px';
      s.style.opacity = String(random(0.35, 0.95));
      s.style.setProperty('--tw', random(2, 5) + 's');
      s.style.setProperty('--td', random(0, 4) + 's');
      if (reduced) {
        s.style.animation = 'none';
      }
      layer.appendChild(s);
    }
  }

  function startFloatingHearts(layer) {
    if (reduced) {
      return;
    }
    var makeOne = function () {
      var s = document.createElement('span');
      s.className = 'float-heart';
      s.textContent = '\u2764';
      s.style.left = random(0, 100) + '%';
      s.style.fontSize = random(13, 28) + 'px';
      s.style.opacity = String(random(0.25, 0.6));
      s.style.animationDuration = random(9, 16) + 's';
      s.style.animationDelay = '0s';
      layer.appendChild(s);
      s.addEventListener('animationend', function () {
        s.remove();
      });
    };
    makeOne();
    setInterval(makeOne, 1700);
  }

  function burstHearts(container, opts) {
    opts = opts || {};
    var n = opts.count || 24;
    var glyphs = ['\u2764', '\uD83D\uDC96', '\uD83D\uDC95', '\uD83D\uDC97', '\u2726', '\u2727'];
    var i;
    for (i = 0; i < n; i++) {
      var el = document.createElement('span');
      var isStar = Math.random() < 0.3;
      el.className = isStar ? 'burst-star' : 'burst-heart';
      el.textContent = glyphs[Math.floor(random(0, glyphs.length))];
      el.style.left = random(15, 85) + '%';
      el.style.top = random(20, 75) + '%';
      el.style.fontSize = random(14, 30) + 'px';
      el.style.setProperty('--dx', random(-150, 150) + 'px');
      el.style.setProperty('--dy', random(-180, -30) + 'px');
      el.style.setProperty('--rot', random(-45, 45) + 'deg');
      el.style.animationDuration = random(1.4, 2.4) + 's';
      el.style.animationDelay = random(0, 0.35) + 's';
      container.appendChild(el);
      el.addEventListener('animationend', function () {
        el.remove();
      });
      setTimeout(function () {
        el.remove();
      }, 3000);
    }
  }

  global.PinkyFX = {
    reduced: reduced,
    random: random,
    makeSpan: makeSpan,
    makeStars: makeStars,
    startFloatingHearts: startFloatingHearts,
    burstHearts: burstHearts
  };
})(window);