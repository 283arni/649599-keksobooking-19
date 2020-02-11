'use strict';

(function () {

  var KEY_ESC = 'Escape';

  var main = document.querySelector('main');
  var form = document.querySelector('.ad-form');
  var messageSuccess = document.querySelector('#success').content.querySelector('.success');
  var messageError = document.querySelector('#error').content.querySelector('.error');
  var typeOfHousing = form.querySelector('#type');
  var priceNight = form.querySelector('#price');
  var timeinInput = form.querySelector('#timein');
  var timeoutInput = form.querySelector('#timeout');
  var quantityRooms = form.querySelector('#room_number');
  var capacity = form.querySelector('#capacity');
  var btnReset = form.querySelector('.ad-form__reset');
  var btnCloseError = messageError.querySelector('.error__button');


  var onSuccessPress = function (e) {

    if (e.key === KEY_ESC) {
      closeMessageSuccess();
    }
  };

  var onSuccessClick = function () {
    closeMessageSuccess();
  };

  var closeMessageSuccess = function () {

    messageSuccess.remove();

    document.removeEventListener('keydown', onSuccessPress);
    messageSuccess.removeEventListener('click', onSuccessClick);
  };

  var onErrorClickOnOverlay = function (e) {

    if (e.target === messageError) {
      closeMessageError();
    }
  };

  var onErrorClick = function (e) {

    if (e.target === btnCloseError) {
      closeMessageError();
    }
  };

  var onErrorPress = function (e) {

    if (e.key === KEY_ESC) {
      closeMessageError();
    }
  };

  var closeMessageError = function () {

    messageError.remove();

    btnCloseError.removeEventListener('click', onErrorClick);
    messageError.removeEventListener('click', onErrorClickOnOverlay);
    document.removeEventListener('keydown', onErrorPress);
  };

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

  var onError = function () {

    main.append(messageError);

    btnCloseError.addEventListener('click', onErrorClick);
    messageError.addEventListener('click', onErrorClickOnOverlay);
    document.addEventListener('keydown', onErrorPress);
  };

  var onLoad = function () {

    capacity.style.border = '1px solid #d9d9d3';
    form.reset();
    window.map.closeMap();

    document.body.append(messageSuccess);
    messageSuccess.addEventListener('click', onSuccessClick);
    document.addEventListener('keydown', onSuccessPress);
  };

  form.addEventListener('submit', function (e) {

    e.preventDefault();

    window.request.send(new FormData(form), onLoad, onError);

  });

  btnReset.addEventListener('click', function () {

    capacity.style.border = '1px solid #d9d9d3';
    form.reset();
  });
})();
