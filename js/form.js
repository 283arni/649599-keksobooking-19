'use strict';

(function () {

  var KEY_ESC = 'Escape';
  var FILE_FORMATS = ['jpg', 'jpeg', 'png'];
  var MAX_HEIGHT_IMG = '70px';

  var Fields = {
    SUCCESS_FIELD: '2px solid green',
    FAILURE_FIELD: '3px solid red',
    SIMPLE_FIELD: '1px solid #d9d9d3'
  };

  var Guests = {
    NO_GUESTS: '0',
    ONE_GUEST: '1',
    TWO_GUESTS: '2',
    TREE_GUESTS: '3',
    HUNDRED_GUESTES: '100'
  };

  var pricesHousing = {
    'bungalo': '0',
    'flat': '1000',
    'house': '5000',
    'palace': '10000'
  };

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
  var loaderAvatar = form.querySelector('.ad-form-header__input');
  var avatar = form.querySelector('.ad-form-header__preview img');
  var loaderPhotos = form.querySelector('.ad-form__input');
  var photo = form.querySelector('.ad-form__photo');
  var btnCloseError = messageError.querySelector('.error__button');

  var choiсePhotos = function () {
    var files = loaderPhotos.files;
    for (var i = 0; i < files.length; i++) {
      var fileName = files[i].name.toLowerCase();

      var matches = FILE_FORMATS.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function (evt) {
          var img = document.createElement('img');
          img.src = evt.target.result;
          img.style.maxHeight = MAX_HEIGHT_IMG;
          photo.append(img);
        });

        reader.readAsDataURL(files[i]);
      }
    }
  };

  var choiсeAvatar = function () {
    var file = loaderAvatar.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_FORMATS.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatar.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

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

  var onErrorClickOnOverlay = function (evt) {

    if (evt.target === messageError) {
      closeMessageError();
    }
  };

  var onErrorClick = function (evt) {

    if (evt.target === btnCloseError) {
      closeMessageError();
    }
  };

  var onErrorPress = function (evt) {

    if (evt.key === KEY_ESC) {
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

    if (quantityRooms.value === Guests.ONE_GUEST && capacity.value === Guests.ONE_GUEST) {
      capacity.style.border = Fields.SUCCESS_FIELD;
    } else if (quantityRooms.value === Guests.TWO_GUESTS && (capacity.value === Guests.ONE_GUEST || capacity.value === Guests.TWO_GUESTS)) {
      capacity.style.border = Fields.SUCCESS_FIELD;
    } else if (quantityRooms.value === Guests.TREE_GUESTS && (capacity.value === Guests.ONE_GUEST || capacity.value === Guests.TWO_GUESTS || capacity.value === Guests.TREE_GUESTS)) {
      capacity.style.border = Fields.SUCCESS_FIELD;
    } else if (quantityRooms.value === Guests.HUNDRED_GUESTES && (capacity.value === Guests.NO_GUESTS)) {
      capacity.style.border = Fields.SUCCESS_FIELD;
    } else {
      capacity.style.border = Fields.FAILURE_FIELD;
      return false;
    }

    return true;
  };

  var validationTypeHousing = function () {
    priceNight.placeholder = 'от ' + pricesHousing[typeOfHousing.value];
    priceNight.setAttribute('min', pricesHousing[typeOfHousing.value]);
  };

  var timingTime = function (e) {

    if (e.target === timeoutInput) {
      timeinInput.value = e.target.value;
    } else if (e.target === timeinInput) {
      timeoutInput.value = e.target.value;
    }
  };

  var onError = function () {

    main.append(messageError);

    btnCloseError.addEventListener('click', onErrorClick);
    messageError.addEventListener('click', onErrorClickOnOverlay);
    document.addEventListener('keydown', onErrorPress);
  };

  var onLoad = function () {

    capacity.style.border = Fields.SIMPLE_FIELD;
    form.reset();
    window.map.closeMap();

    document.body.append(messageSuccess);
    messageSuccess.addEventListener('click', onSuccessClick);
    document.addEventListener('keydown', onSuccessPress);
  };

  form.addEventListener('change', function (e) {
    validationRoomsWithGuests();
    validationTypeHousing();
    timingTime(e);
  });

  loaderAvatar.addEventListener('change', function () {
    choiсeAvatar();
  });

  loaderPhotos.addEventListener('change', function () {
    choiсePhotos();
  });

  form.addEventListener('submit', function (e) {

    e.preventDefault();

    window.request.send(new FormData(form), onLoad, onError);

  });

  btnReset.addEventListener('click', function () {

    capacity.style.border = Fields.SIMPLE_FIELD;
    form.reset();
  });
})();
