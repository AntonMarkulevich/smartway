/**
 * travel-coordination.html: плавный скролл, мобильное меню, .reveal, табы travel-policy
 */
(function () {
  'use strict';

  if (!document.body.classList.contains('travel-coordination-page')) return;

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
    document.querySelectorAll('body.travel-coordination-page .reveal').forEach(function (el) {
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

    document.querySelectorAll('body.travel-coordination-page .reveal').forEach(function (el) {
      io.observe(el);
    });
  }

  (function initTravelPolicyTabs() {
    var root = document.querySelector('.travel-coordination-page .travel-policy-tabs');
    if (!root) return;
    var tabs = root.querySelectorAll('.travel-policy-tabs__tab');
    var panels = root.querySelectorAll('.travel-policy-tabs__panel');
    if (!tabs.length || !panels.length) return;

    function activate(tab) {
      var pid = tab.getAttribute('aria-controls');
      tabs.forEach(function (t) {
        var on = t === tab;
        t.classList.toggle('is-active', on);
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        if (on) t.removeAttribute('tabindex');
        else t.setAttribute('tabindex', '-1');
      });
      panels.forEach(function (p) {
        var on = p.getAttribute('id') === pid;
        p.classList.toggle('is-active', on);
        p.setAttribute('aria-hidden', on ? 'false' : 'true');
      });
    }

    panels.forEach(function (p) {
      p.removeAttribute('hidden');
    });
    var initial = root.querySelector('.travel-policy-tabs__tab.is-active');
    if (initial) activate(initial);
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        activate(tab);
      });
    });
  })();
})();
