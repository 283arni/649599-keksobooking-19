'use strict';

(function () {

  var KEY_ESC = 'Escape';
  var FILE_FORMATS = ['jpg', 'jpeg', 'png'];
  var MAX_HEIGHT_IMG = '70px';

  var Fields = {
    FAILURE: '3px dotted red',
    NONE: 'none'
  };

  var Rooms = {
    ONE: '1',
    TWO: '2',
    TREE: '3',
    HUNDRED: '100'
  };

  var Guests = {
    NO: '0',
    ONE: '1',
    TWO: '2',
    TREE: '3'
  };

  var priceHousing = {
    'bungalo': '0',
    'flat': '1000',
    'house': '5000',
    'palace': '10000'
  };

  var main = document.querySelector('main');
  var form = document.querySelector('.ad-form');
  var messageSuccess = document.querySelector('#success').content.querySelector('.success');
  var messageError = document.querySelector('#error').content.querySelector('.error');
  var mapFilters = document.querySelector('.map__filters');
  var typeOfHousing = form.querySelector('#type');
  var title = form.querySelector('#title');
  var priceNight = form.querySelector('#price');
  var timeinInput = form.querySelector('#timein');
  var addressInput = form.querySelector('#address');
  var timeoutInput = form.querySelector('#timeout');
  var quantityRooms = form.querySelector('#room_number');
  var capacity = form.querySelector('#capacity');
  var btnReset = form.querySelector('.ad-form__reset');
  var loaderAvatar = form.querySelector('.ad-form-header__input');
  var avatar = form.querySelector('.ad-form-header__preview img');
  var loaderPhotos = form.querySelector('.ad-form__input');
  var photo = form.querySelector('.ad-form__photo');
  var btnCloseError = messageError.querySelector('.error__button');
  var mainPin = document.querySelector('.map__pin--main');
  var originCoordsY = getComputedStyle(mainPin).top;
  var originCoordsX = getComputedStyle(mainPin).left;

  var setOriginCoords = function () {
    mainPin.style.top = originCoordsY;
    mainPin.style.left = originCoordsX;
  };

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

  var onSuccessKeydown = function (evt) {
    if (evt.key === KEY_ESC) {

      closeMessageSuccess();
    }
  };

  var onSuccessClick = function () {
    closeMessageSuccess();
  };

  var closeMessageSuccess = function () {
    messageSuccess.remove();

    document.removeEventListener('keydown', onSuccessKeydown);
    messageSuccess.removeEventListener('click', onSuccessClick);
  };

  var onErrorOverlayClick = function (evt) {

    if (evt.target === messageError) {
      closeMessageError();
    }
  };

  var onErrorClick = function (evt) {

    if (evt.target === btnCloseError) {
      closeMessageError();
    }
  };

  var onErrorKeydown = function (evt) {

    if (evt.key === KEY_ESC) {
      closeMessageError();
    }
  };

  var closeMessageError = function () {

    messageError.remove();

    btnCloseError.removeEventListener('click', onErrorClick);
    messageError.removeEventListener('click', onErrorOverlayClick);
    document.removeEventListener('keypress', onErrorKeydown);
  };

  var validationTitle = function () {

    title.style.outline = Fields.NONE;

    if (title.validity.valueMissing || title.validity.tooShort) {
      title.style.outline = Fields.FAILURE;
    }
  };

  var validationRoomsWithGuests = function () {

    capacity.setCustomValidity('');

    if (quantityRooms.value === Rooms.ONE && capacity.value === Guests.ONE) {
      capacity.style.outline = Fields.NONE;
    } else if (quantityRooms.value === Rooms.TWO && (capacity.value === Guests.ONE || capacity.value === Guests.TWO)) {
      capacity.style.outline = Fields.NONE;
    } else if (quantityRooms.value === Rooms.TREE && (capacity.value === Guests.ONE || capacity.value === Guests.TWO || capacity.value === Guests.TREE_GUESTS)) {
      capacity.style.outline = Fields.NONE;
    } else if (quantityRooms.value === Rooms.HUNDRED && (capacity.value === Guests.NO)) {
      capacity.style.outline = Fields.NONE;
    } else {
      capacity.style.outline = Fields.FAILURE;
      capacity.setCustomValidity('Не допустимое количество');
    }
  };

  var validationTypeHousing = function () {
    priceNight.placeholder = 'от ' + priceHousing[typeOfHousing.value];
    priceNight.setAttribute('min', priceHousing[typeOfHousing.value]);
    priceNight.style.outline = Fields.NONE;

    if (priceNight.validity.rangeUnderflow || priceNight.validity.valueMissing) {
      priceNight.style.outline = Fields.FAILURE;
    }

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
    messageError.addEventListener('click', onErrorOverlayClick);
    document.addEventListener('keydown', onErrorKeydown);
  };

  var onLoad = function () {

    capacity.style.outline = Fields.NONE;
    form.reset();
    window.map.closeMap();

    main.append(messageSuccess);

    messageSuccess.focus();
    mapFilters.reset();
    setOriginCoords();

    messageSuccess.addEventListener('click', onSuccessClick);
    document.addEventListener('keydown', onSuccessKeydown);
  };

  form.addEventListener('change', function (e) {
    validationTitle();
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

  btnReset.addEventListener('click', function (evt) {
    evt.preventDefault();

    title.style.outline = Fields.NONE;
    priceNight.style.outline = Fields.NONE;
    capacity.style.outline = Fields.NONE;
    mapFilters.reset();
    setOriginCoords();
    form.reset();
    window.map.removePopupIfOpen();
    window.pins.removePins();
    addressInput.value = window.drag.findCoordsMainPin();
  });
})();
