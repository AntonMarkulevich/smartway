(function () {
  var ITI_VER = '26.9.1';
  var UTILS_URL =
    'https://cdn.jsdelivr.net/npm/intl-tel-input@' + ITI_VER + '/build/js/utils.js';

  var onlyCountries = [
    'ru',
    'kz',
    'by',
    'ua',
    'am',
    'uz',
    'az',
    'ge',
    'tj',
    'kg',
    'md',
    'de',
    'us',
    'gb',
    'ae',
    'tr',
    'cn',
  ];

  function init() {
    var input = document.querySelector('#cta-phone');
    if (!input || typeof window.intlTelInput !== 'function') return;

    window.intlTelInput(input, {
      initialCountry: 'ru',
      onlyCountries: onlyCountries,
      separateDialCode: true,
      countrySearch: true,
      strictMode: false,
      formatAsYouType: true,
      formatOnDisplay: true,
      dropdownContainer: document.body,
      loadUtils: function () {
        return import(UTILS_URL);
      },
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
