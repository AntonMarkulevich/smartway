/**
 * mice.html: плавный скролл по якорям, закрытие мобильного меню, появление .reveal,
 * маска телефона в форме заявки.
 */
(function () {
  'use strict';

  if (!document.body.classList.contains('page-mice')) return;

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

  var phone = document.getElementById('mice-guide-phone');
  if (phone) {
    function fmt(v) {
      var d = v.replace(/\D/g, '');
      if (d.startsWith('8')) d = '7' + d.slice(1);
      if (!d.length) return '';
      if (d[0] !== '7') d = '7' + d;
      d = d.slice(0, 11);
      var o = '+7';
      if (d.length > 1) o += ' (' + d.slice(1, 4);
      if (d.length >= 5) o += ') ' + d.slice(4, 7);
      if (d.length >= 8) o += '-' + d.slice(7, 9);
      if (d.length >= 10) o += '-' + d.slice(9, 11);
      return o;
    }
    phone.addEventListener('input', function () {
      phone.value = fmt(phone.value);
    });
  }

  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('body.page-mice .reveal').forEach(function (el) {
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

  document.querySelectorAll('body.page-mice .reveal').forEach(function (el) {
    io.observe(el);
  });
})();
