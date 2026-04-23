/**
 * Мобильное/планшетное меню: взаимоисключающие секции (аккордеон) в drawer,
 * закрытие off-canvas по клику на ссылку. Атрибут name= на <details> поддерживается
 * не везде — дублируем логику «одна открыта» через toggle.
 */
(function () {
  'use strict';

  var drawer = document.querySelector('.header__drawer');
  if (!drawer) return;

  var groupName = 'sw-drawer-nav';
  var detailsList = drawer.querySelectorAll('details[name="' + groupName + '"]');

  detailsList.forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (!d.open) return;
      detailsList.forEach(function (other) {
        if (other !== d) other.removeAttribute('open');
      });
    });
  });

  function closeNav() {
    var cb = document.getElementById('site-nav');
    if (cb) cb.checked = false;
  }

  drawer.querySelectorAll('a[href]').forEach(function (a) {
    a.addEventListener('click', function () {
      closeNav();
    });
  });
})();
