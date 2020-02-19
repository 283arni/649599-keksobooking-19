'use strict';
(function () {

  var TIMEOUT_TIME = 500;

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

    if (typeHousing.value !== 'any') {
      newArr = newArr.filter(function (item) {
        return typeHousing.value === item.offer.type;
      });
    }

    if (priceHousing.value !== 'any') {
      newArr = newArr.filter(function (item) {
        var test;

        if (priceHousing.value === 'middle') {
          test = item.offer.price >= 10000 && item.offer.price <= 50000;
        }

        if (priceHousing.value === 'low') {
          test = item.offer.price < 10000;
        }

        if (priceHousing.value === 'high') {
          test = item.offer.price > 50000;
        }

        return test;
      });
    }

    if (roomHousing.value !== 'any') {
      newArr = newArr.filter(function (item) {
        var test;

        if (roomHousing.value === '1') {
          test = item.offer.rooms === 1;
        }

        if (roomHousing.value === '2') {
          test = item.offer.rooms === 2;
        }

        if (roomHousing.value === '3') {
          test = item.offer.rooms === 3;
        }

        return test;
      });
    }

    if (guestHousing.value !== 'any') {
      newArr = newArr.filter(function (item) {
        var test;

        if (guestHousing.value === '2') {
          test = item.offer.guests === 2;
        }

        if (guestHousing.value === '1') {
          test = item.offer.guests === 1;
        }

        if (guestHousing.value === '0') {
          test = item.offer.guests === 0;
        }

        return test;
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
    window.map.removeOpenIfPopup();
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
