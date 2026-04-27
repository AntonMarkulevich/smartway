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

  var casesSlider = document.getElementById('mice-cases-viewport');
  var casesPrev = document.getElementById('mice-cases-prev');
  var casesNext = document.getElementById('mice-cases-next');
  if (casesSlider && casesPrev && casesNext) {
    var casesGap = 12;

    function casesSliderStep() {
      var c = casesSlider.querySelector('.mice-cases__card');
      if (!c) return casesSlider.clientWidth;
      return c.getBoundingClientRect().width + casesGap;
    }

    function casesUpdateNav() {
      var el = casesSlider;
      var maxL = el.scrollWidth - el.clientWidth;
      var l = el.scrollLeft;
      casesPrev.disabled = l <= 1;
      casesNext.disabled = l >= maxL - 1;
    }

    function casesScrollBy(delta) {
      var smooth =
        window.matchMedia('(prefers-reduced-motion: reduce)').matches ===
        false;
      casesSlider.scrollBy({
        left: delta,
        behavior: smooth ? 'smooth' : 'auto',
      });
    }

    casesPrev.addEventListener('click', function () {
      if (casesPrev.disabled) return;
      casesScrollBy(-casesSliderStep());
    });
    casesNext.addEventListener('click', function () {
      if (casesNext.disabled) return;
      casesScrollBy(casesSliderStep());
    });
    casesSlider.addEventListener('scroll', casesUpdateNav, { passive: true });
    window.addEventListener('resize', casesUpdateNav, { passive: true });
    casesUpdateNav();
  }

  var partnerSlider = document.getElementById('mice-partner-viewport');
  var partnerPrev = document.getElementById('mice-partner-prev');
  var partnerNext = document.getElementById('mice-partner-next');
  if (partnerSlider && partnerPrev && partnerNext) {
    function partnerSliderStep() {
      var firstSlide = partnerSlider.querySelector('.mice-partner__card, .mice-partner__cta');
      if (!firstSlide) return partnerSlider.clientWidth;
      var track = partnerSlider.querySelector('.mice-partner__track');
      var gap = 0;
      if (track) {
        gap = parseFloat(window.getComputedStyle(track).columnGap || window.getComputedStyle(track).gap) || 0;
      }
      return firstSlide.getBoundingClientRect().width + gap;
    }

    function partnerUpdateNav() {
      var maxLeft = partnerSlider.scrollWidth - partnerSlider.clientWidth;
      var left = partnerSlider.scrollLeft;
      partnerPrev.disabled = left <= 1;
      partnerNext.disabled = left >= maxLeft - 1;
    }

    function partnerScrollBy(delta) {
      var smooth = window.matchMedia('(prefers-reduced-motion: reduce)').matches === false;
      partnerSlider.scrollBy({
        left: delta,
        behavior: smooth ? 'smooth' : 'auto',
      });
    }

    partnerPrev.addEventListener('click', function () {
      if (partnerPrev.disabled) return;
      partnerScrollBy(-partnerSliderStep());
    });
    partnerNext.addEventListener('click', function () {
      if (partnerNext.disabled) return;
      partnerScrollBy(partnerSliderStep());
    });
    partnerSlider.addEventListener('scroll', partnerUpdateNav, { passive: true });
    window.addEventListener('resize', partnerUpdateNav, { passive: true });
    partnerUpdateNav();
  }

  var reviewsSlider = document.getElementById('mice-reviews-viewport');
  var reviewsPrev = document.getElementById('mice-reviews-prev');
  var reviewsNext = document.getElementById('mice-reviews-next');
  if (reviewsSlider && reviewsPrev && reviewsNext) {
    function reviewsSliderStep() {
      var firstSlide = reviewsSlider.querySelector('.mice-reviews__card');
      if (!firstSlide) return reviewsSlider.clientWidth;
      var track = reviewsSlider.querySelector('.mice-reviews__track');
      var gap = 0;
      if (track) {
        gap =
          parseFloat(
            window.getComputedStyle(track).columnGap ||
              window.getComputedStyle(track).gap
          ) || 0;
      }
      return firstSlide.getBoundingClientRect().width + gap;
    }

    function reviewsUpdateNav() {
      var maxLeft = reviewsSlider.scrollWidth - reviewsSlider.clientWidth;
      var left = reviewsSlider.scrollLeft;
      reviewsPrev.disabled = left <= 1;
      reviewsNext.disabled = left >= maxLeft - 1;
    }

    function reviewsScrollBy(delta) {
      var smooth =
        window.matchMedia('(prefers-reduced-motion: reduce)').matches ===
        false;
      reviewsSlider.scrollBy({
        left: delta,
        behavior: smooth ? 'smooth' : 'auto',
      });
    }

    reviewsPrev.addEventListener('click', function () {
      if (reviewsPrev.disabled) return;
      reviewsScrollBy(-reviewsSliderStep());
    });
    reviewsNext.addEventListener('click', function () {
      if (reviewsNext.disabled) return;
      reviewsScrollBy(reviewsSliderStep());
    });
    reviewsSlider.addEventListener('scroll', reviewsUpdateNav, {
      passive: true,
    });
    window.addEventListener('resize', reviewsUpdateNav, { passive: true });
    reviewsUpdateNav();
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
