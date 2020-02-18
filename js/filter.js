'use strict';
(function () {
  var formFilters = document.querySelector('.map__filters');
  var typeHousing = formFilters.querySelector('#housing-type');

  var filterType = function (arr) {
    return arr.filter(function (item) {
      return typeHousing.value === item.offer.type;
    });
  };

  formFilters.addEventListener('change', function () {
    window.map.removeOpenIfPopup();
  });

  typeHousing.addEventListener('change', function () {
    window.pins.renderPins(filterType(window.pins.copyPins));
  });
})();
