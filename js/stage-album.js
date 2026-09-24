(function (global) {
  'use strict';

  var C = window.CONTENT.album;
  var App = window.App;

  App.register('album', function (stage) {
    var photos = C.photos || [];

    stage.innerHTML =
      '<div class="stage-inner album-stage">' +
        '<h1 class="stage-title">' + C.title + '</h1>' +
        '<p class="album-lead">' + C.lead + '</p>' +
        (photos.length
          ? '<div class="album-grid" id="albumGrid"></div>'
          : '<p class="album-empty">' + C.empty + '</p>') +
        '<div class="album-next">' +
          '<button class="btn btn-primary" id="albumNext">' + C.continueLabel + '</button>' +
        '</div>' +
      '</div>';

    function wireNext() {
      document.getElementById('albumNext').addEventListener('click', function () {
        App.go('proposal');
      });
    }

    if (!photos.length) {
      wireNext();
      return;
    }

    var grid = document.getElementById('albumGrid');

    var lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.innerHTML =
      '<button class="lightbox-close" aria-label="Fechar">\u2715</button>' +
      '<button class="lightbox-prev" aria-label="Anterior">\u2039</button>' +
      '<figure class="lightbox-figure">' +
        '<img class="lightbox-img" alt="">' +
        '<figcaption class="lightbox-cap"></figcaption>' +
      '</figure>' +
      '<button class="lightbox-next" aria-label="Proxima">\u203A</button>';
    document.body.appendChild(lightbox);

    var imgEl = lightbox.querySelector('.lightbox-img');
    var capEl = lightbox.querySelector('.lightbox-cap');
    var current = -1;

    function open(i) {
      current = (i + photos.length) % photos.length;
      imgEl.src = photos[current].src;
      imgEl.alt = photos[current].caption || '';
      capEl.textContent = photos[current].caption || '';
      lightbox.classList.add('open');
    }

    function close() {
      lightbox.classList.remove('open');
      current = -1;
    }

    function next() {
      if (current >= 0) open(current + 1);
    }

    function prev() {
      if (current >= 0) open(current - 1);
    }

    lightbox.querySelector('.lightbox-close').addEventListener('click', close);
    lightbox.querySelector('.lightbox-prev').addEventListener('click', prev);
    lightbox.querySelector('.lightbox-next').addEventListener('click', next);
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) close();
    });
    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    });

    photos.forEach(function (photo, i) {
      var card = document.createElement('button');
      card.className = 'polaroid';
      card.setAttribute('aria-label', 'Abrir foto ' + (i + 1));
      card.innerHTML =
        '<span class="polaroid-imgwrap">' +
          '<img class="polaroid-img" src="' + photo.src + '" alt="' + (photo.caption || 'foto') + '" loading="lazy">' +
        '</span>' +
        '<span class="polaroid-cap">' + (photo.caption || '') + '</span>';
      card.addEventListener('click', function () {
        open(i);
      });
      grid.appendChild(card);
      setTimeout(function () {
        card.classList.add('visible');
      }, 120 + i * 160);
    });

    wireNext();
  });
})(window);