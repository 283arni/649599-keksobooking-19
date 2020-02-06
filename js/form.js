'use strict';

(function () {

  var form = document.querySelector('.ad-form');
  var typeOfHousing = form.querySelector('#type');
  var priceNight = form.querySelector('#price');
  var timeinInput = form.querySelector('#timein');
  var timeoutInput = form.querySelector('#timeout');
  var quantityRooms = form.querySelector('#room_number');
  var capacity = form.querySelector('#capacity');

  var validationRoomsWithGuests = function () {

    if (quantityRooms.value === '1' && capacity.value === '1') {
      capacity.style.border = '2px solid green';
    } else if (quantityRooms.value === '2' && (capacity.value === '1' || capacity.value === '2')) {
      capacity.style.border = '2px solid green';
    } else if (quantityRooms.value === '3' && (capacity.value === '1' || capacity.value === '2' || capacity.value === '3')) {
      capacity.style.border = '2px solid green';
    } else if (quantityRooms.value === '100' && (capacity.value === '0')) {
      capacity.style.border = '2px solid green';
    } else {
      capacity.style.border = '3px solid red';
      return false;
    }

    return true;
  };

  var validationTypeHousing = function () {

    if (typeOfHousing.value === 'bungalo') {
      priceNight.placeholder = 'от 0';
    } else if (typeOfHousing.value === 'flat') {
      priceNight.placeholder = 'от 1000';
      priceNight.setAttribute('min', '1000');
    } else if (typeOfHousing.value === 'house') {
      priceNight.placeholder = 'от 5000';
      priceNight.setAttribute('min', '5000');
    } else if (typeOfHousing.value === 'palace') {
      priceNight.placeholder = 'от 10000';
      priceNight.setAttribute('min', '10000');
    }
  };

  var timingTime = function (e) {

    if (e.target === timeoutInput) {
      timeinInput.value = e.target.value;
    } else if (e.target === timeinInput) {
      timeoutInput.value = e.target.value;
    }
  };

  form.addEventListener('change', function (e) {
    validationRoomsWithGuests();
    validationTypeHousing();
    timingTime(e);
  });

  form.addEventListener('submit', function (e) {
    if (!validationRoomsWithGuests()) {
      e.preventDefault();
    }
  });
})();
