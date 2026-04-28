/**
 * hr-manager.html: плавный скролл по якорям, закрытие мобильного меню, scroll-reveal (.reveal)
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

  document.querySelectorAll('[data-hr-tickets-slider]').forEach(function (slider) {
    var track = slider.querySelector('.hr-manager-tickets__track');
    var slides = Array.prototype.slice.call(slider.querySelectorAll('.hr-manager-tickets__slide'));
    var viewport = slider.querySelector('.hr-manager-tickets__viewport');
    var offset = 0;

    if (!track || !viewport || slides.length < 2) return;

    var wheelSpeed = 2.4;

    function getMaxOffset() {
      return Math.max(0, track.scrollWidth - viewport.clientWidth);
    }

    function render() {
      track.style.transform = 'translateX(' + offset * -1 + 'px)';
    }

    viewport.addEventListener(
      'wheel',
      function (e) {
        var maxOffset = getMaxOffset();
        var delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
        var nextOffset = Math.max(0, Math.min(maxOffset, offset + delta * wheelSpeed));
        var canMoveForward = delta > 0 && offset < maxOffset;
        var canMoveBackward = delta < 0 && offset > 0;

        if (!canMoveForward && !canMoveBackward) return;

        e.preventDefault();
        offset = nextOffset;
        window.requestAnimationFrame(render);
      },
      { passive: false }
    );

    window.addEventListener('resize', function () {
      offset = Math.min(offset, getMaxOffset());
      render();
    });

    render();
  });

  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('body.page-hr-manager .reveal').forEach(function (el) {
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

  document.querySelectorAll('body.page-hr-manager .reveal').forEach(function (el) {
    io.observe(el);
  });
})();
