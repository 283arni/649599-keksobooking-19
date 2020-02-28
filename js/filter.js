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
  var formFutures = document.querySelectorAll('.map__checkbox');
  var typeHousing = formFilters.querySelector('#housing-type');
  var priceHousing = formFilters.querySelector('#housing-price');
  var guestHousing = formFilters.querySelector('#housing-guests');
  var roomHousing = formFilters.querySelector('#housing-rooms');

  var filterAllFilds = function (arr) {

    var newArr = arr;

    if (typeHousing.value !== Levels.ANYTHING) {
      newArr = newArr.filter(function (item) {
        return typeHousing.value === item.offer.type;
      });
    }

    if (priceHousing.value !== Levels.ANYTHING) {
      newArr = newArr.filter(function (item) {
        var test;

        if (priceHousing.value === Levels.MIDDLE) {
          test = item.offer.price >= LOW_PRICE && item.offer.price <= HIGH_PRICE;
        }

        if (priceHousing.value === Levels.LOW) {
          test = item.offer.price < LOW_PRICE;
        }

        if (priceHousing.value === Levels.HIGH) {
          test = item.offer.price > HIGH_PRICE;
        }

        return test;
      });
    }

    if (roomHousing.value !== Levels.ANYTHING) {

      newArr = newArr.filter(function (item) {
        return item.offer.rooms === valueOptions[roomHousing.value];
      });
    }

    if (guestHousing.value !== Levels.ANYTHING) {

      newArr = newArr.filter(function (item) {
        return item.offer.guests === valueOptions[guestHousing.value];
      });
    }

    for (var i = 0; i < formFutures.length; i++) {
      var item = formFutures[i];
      if (item.checked) {
        newArr = checkAvailabilityFeatures(newArr, item);
      }
    }

    return newArr;
  };

  var checkAvailabilityFeatures = function (arr, feature) {
    return arr.filter(function (it) {
      return it.offer.features.some(function (item) {
        return item === feature.value;
      });
    });
  };

  var doWhenChangedForm = function () {
    window.map.removePopupIfOpen();
    window.pins.renderPins(filterAllFilds(window.pins.copyPins));
  };

  var timeout;

  formFilters.addEventListener('change', function () {

    if (timeout) {
      window.clearTimeout(timeout);
    }

    timeout = setTimeout(doWhenChangedForm, TIMER);
  });
})();
