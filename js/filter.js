'use strict';
(function () {

  var TIMEOUT_TIME = 500;
  var LOW_PRICE = 10000;
  var HIGHT_PRICE = 50000;

  var Levels = {
    ANYTHING: 'any',
    LOW: 'low',
    MIDDLE: 'middle',
    HIGHT: 'hight'
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
  var checkWifi = formFilters.querySelector('#filter-wifi');
  var checkDishwasher = formFilters.querySelector('#filter-dishwasher');
  var checkParking = formFilters.querySelector('#filter-parking');
  var checkWasher = formFilters.querySelector('#filter-washer');
  var checkElevator = formFilters.querySelector('#filter-elevator');
  var checkConditioner = formFilters.querySelector('#filter-conditioner');

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
          test = item.offer.price >= LOW_PRICE && item.offer.price <= HIGHT_PRICE;
        }

        if (priceHousing.value === Levels.LOW) {
          test = item.offer.price < LOW_PRICE;
        }

        if (priceHousing.value === Levels.HIGHT) {
          test = item.offer.price > HIGHT_PRICE;
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

    if (checkWifi.checked) {
      newArr = checkAvailabilityFeatures(newArr, checkWifi);
    }

    if (checkDishwasher.checked) {
      newArr = checkAvailabilityFeatures(newArr, checkDishwasher);
    }

    if (checkParking.checked) {
      newArr = checkAvailabilityFeatures(newArr, checkParking);
    }

    if (checkWasher.checked) {
      newArr = checkAvailabilityFeatures(newArr, checkWasher);
    }

    if (checkElevator.checked) {
      newArr = checkAvailabilityFeatures(newArr, checkElevator);
    }

    if (checkConditioner.checked) {
      newArr = checkAvailabilityFeatures(newArr, checkConditioner);
    }

    return newArr;
  };

  var checkAvailabilityFeatures = function (arr, feature) {

    var itemsChecked = [];

    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < arr[i].offer.features.length; j++) {
        if (arr[i].offer.features[j] === feature.value) {
          itemsChecked.push(arr[i]);
        }
      }
    }

    return itemsChecked;
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

    timeout = setTimeout(doWhenChangedForm, TIMEOUT_TIME);
  });
})();
