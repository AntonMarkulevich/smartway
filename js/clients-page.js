/**
 * clients.html: плавный скролл по якорям, мобильное меню, фильтр кейсов, появление .reveal
 */
(function () {
  'use strict';

  function getScrollPadding() {
    var v = getComputedStyle(document.documentElement).getPropertyValue('--site-header-offset').trim();
    var n = parseFloat(v);
    return isNaN(n) ? 0 : n;
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    var href = anchor.getAttribute('href');
    if (!href || href === '#') return;

    anchor.addEventListener('click', function (e) {
      var id = href.slice(1);
      if (!id) return;
      var target = document.getElementById(id);
      if (!target) return;

      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.scrollY - getScrollPadding();
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });

      var nav = document.getElementById('site-nav');
      if (nav && nav.checked) nav.checked = false;
    });
  });

  document.querySelectorAll('.header__drawer a, .header__drawer-login, .header__drawer-btn').forEach(function (a) {
    a.addEventListener('click', function () {
      var cb = document.getElementById('site-nav');
      if (cb) cb.checked = false;
    });
  });

  var buttons = document.querySelectorAll('.clients-filter__btn');
  var grid = document.getElementById('clients-masonry');
  if (buttons.length && grid) {
    var cards = grid.querySelectorAll('.client-card:not(.client-card--cta)');
    var cta = grid.querySelector('.client-card--cta');

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var filter = btn.getAttribute('data-filter') || 'all';
        buttons.forEach(function (b) {
          var on = b === btn;
          b.classList.toggle('is-active', on);
          b.setAttribute('aria-selected', on ? 'true' : 'false');
        });
        cards.forEach(function (card) {
          var cat = card.getAttribute('data-category');
          if (!cat) {
            card.hidden = false;
            return;
          }
          card.hidden = filter !== 'all' && cat !== filter;
        });
        if (cta) cta.hidden = false;
      });
    });
  }

  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('body.clients-page .reveal').forEach(function (el) {
      el.classList.add('reveal--visible');
    });
    return;
  }

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('reveal--visible');
        io.unobserve(entry.target);
      });
    },
    { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
  );

  document.querySelectorAll('body.clients-page .reveal').forEach(function (el) {
    io.observe(el);
  });
})();
