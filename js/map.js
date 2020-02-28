'use strict';

(function () {

  var KEY_ENTER = 'Enter';
  var KEY_ESC = 'Escape';

  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var form = document.querySelector('.ad-form');
  var fields = document.querySelectorAll('fieldset');
  var addressInput = document.querySelector('#address');
  var mainPinMap = map.querySelector('.map__pin--main');
  var mapFiltersBlock = map.querySelector('.map__filters-container');
  var mapFilters = mapFiltersBlock.querySelectorAll('.map__filter');


  var disableFields = function (elems) {
    for (var i = 0; i < elems.length; i++) {
      elems[i].setAttribute('disabled', 'true');
    }
  };

  var activeFields = function (elems) {
    for (var i = 0; i < elems.length; i++) {
      elems[i].removeAttribute('disabled');
    }
  };

  var openMap = function () {

    activeFields(fields);
    activeFields(mapFilters);
    map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
  };

  var closeMap = function () {

    disableFields(fields);
    disableFields(mapFilters);
    map.classList.add('map--faded');
    form.classList.add('ad-form--disabled');
    window.pins.removePins();
  };

  var watchClickPins = function (arr) {
    var btnPins = mapPins.querySelectorAll('.map__pin[type="button"]');

    for (var i = 0; i < btnPins.length; i++) {
      checkBtnOnClick(btnPins[i], window.card.createCard(arr[i]));
    }
  };

  var checkBtnOnClick = function (btnPin, card) {

    btnPin.addEventListener('click', function () {
      addCard(card);
    });

    btnPin.addEventListener('keydown', function (evt) {
      if (evt.key === KEY_ENTER) {
        addCard(card);
      }
    });
  };

  var removePopupIfOpen = function () {

    if (map.querySelector('.popup')) {
      map.querySelector('.popup').remove();
    }
  };


  var addCard = function (card) {

    removePopupIfOpen();
    mapFiltersBlock.before(card);

    var closePopup = function () {
      popup.remove();
      popupClose.removeEventListener('click', onClosePopupClick);
      document.removeEventListener('keydown', onClosePopupKeydown);
    };

    var onClosePopupClick = function () {
      closePopup();
    };

    var onClosePopupKeydown = function (evt) {
      if (evt.key === KEY_ESC) {
        closePopup();
      }
    };

    var popup = map.querySelector('.popup');
    var popupClose = popup.querySelector('.popup__close');

    popupClose.addEventListener('click', onClosePopupClick);

    document.addEventListener('keydown', onClosePopupKeydown);
  };

  window.addEventListener('load', function () {
    addressInput.value = (parseInt(getComputedStyle(mainPinMap).left, 10) + window.drag.centerMainPinMap) + ', ' + (parseInt(getComputedStyle(mainPinMap).top, 10) + window.drag.centerMainPinMap);
    disableFields(fields);
    disableFields(mapFilters);
  });

  window.map = {
    openMap: openMap,
    closeMap: closeMap,
    watchClickPins: watchClickPins,
    removePopupIfOpen: removePopupIfOpen
  };
})();
