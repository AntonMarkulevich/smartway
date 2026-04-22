/**
 * travel-manager.html: плавный скролл по якорям, мобильное меню, .reveal
 */
(function () {
  'use strict';

  if (!document.body.classList.contains('travel-manager-page')) return;

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

  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('body.travel-manager-page .reveal').forEach(function (el) {
      el.classList.add('reveal--visible');
    });
  } else {
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

    document.querySelectorAll('body.travel-manager-page .reveal').forEach(function (el) {
      io.observe(el);
    });
  }
})();
