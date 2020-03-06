'use strict';

(function () {

  var TIMER = 500;
  var LOW_PRICE = 10000;
  var HIGH_PRICE = 50000;

  var Levels = {
    ANYTHING: 'any',
    LOW: 'low',
    MIDDLE: 'middle',
    HIGH: 'high'
  };

  var valueOptions = {
    '0': 0,
    '1': 1,
    '2': 2,
    '3': 3
  };

  var formFilters = document.querySelector('.map__filters');
  var typeHousing = formFilters.querySelector('#housing-type');
  var priceHousing = formFilters.querySelector('#housing-price');
  var guestHousing = formFilters.querySelector('#housing-guests');
  var roomHousing = formFilters.querySelector('#housing-rooms');

  var filterAllFilds = function (arr) {

    var formFeatures = formFilters.querySelectorAll('.map__checkbox:checked');

    return arr.filter(function (item) {

      var testForFeatures = true;
      var testForTypeHousing = true;
      var testForPrice = true;
      var testForRooms = true;
      var testForGuests = true;


      if (typeHousing.value !== Levels.ANYTHING) {
        testForTypeHousing = typeHousing.value === item.offer.type;
      }

      if (priceHousing.value !== Levels.ANYTHING) {

        if (priceHousing.value === Levels.MIDDLE) {
          testForPrice = item.offer.price >= LOW_PRICE && item.offer.price <= HIGH_PRICE;
        }

        if (priceHousing.value === Levels.LOW) {
          testForPrice = item.offer.price < LOW_PRICE;
        }

        if (priceHousing.value === Levels.HIGH) {
          testForPrice = item.offer.price > HIGH_PRICE;
        }
      }

      if (roomHousing.value !== Levels.ANYTHING) {
        testForRooms = item.offer.rooms === valueOptions[roomHousing.value];
      }

      if (guestHousing.value !== Levels.ANYTHING) {
        testForGuests = item.offer.guests === valueOptions[guestHousing.value];
      }

      if (formFeatures.length) {
        testForFeatures = checkAvailabilityFeatures(item, formFeatures);
      }

      return testForTypeHousing && testForPrice && testForGuests && testForRooms && testForFeatures;
    });
  };

  var checkAvailabilityFeatures = function (it, features) {
    var num = 0;

    features.forEach(function (feature) {
      it.offer.features.forEach(function (item) {
        if (feature.value === item) {
          num += 1;
        }
      });
    });

    return num === features.length;
  };


  var doWhenChangedForm = function () {
    window.map.removePopupIfOpen();
    window.pins.renderAds(filterAllFilds(window.pins.copyAds));
  };

  var timeout;

  formFilters.addEventListener('change', function () {

    if (timeout) {
      window.clearTimeout(timeout);
    }

    timeout = setTimeout(doWhenChangedForm, TIMER);
  });
})();
