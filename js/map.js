'use strict';

(function () {

  var KEY_ENTER = 'Enter';
  var KEY_ESC = 'Escape';

  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var form = document.querySelector('.ad-form');
  var fields = document.querySelectorAll('fieldset');
  var addressInput = document.querySelector('#address');
  var mainPin = document.querySelector('.map__pin--main');
  var mapFiltersBlock = map.querySelector('.map__filters-container');
  var mapFilters = mapFiltersBlock.querySelectorAll('.map__filter');


  var disableFields = function (elems) {
    elems.forEach(function (elem) {
      elem.setAttribute('disabled', 'true');
    });
  };

  var activeFields = function (elems) {
    elems.forEach(function (elem) {
      elem.removeAttribute('disabled');
    });
  };

  var openSite = function () {

    activeFields(fields);
    activeFields(mapFilters);
    map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
  };

  var closeSite = function () {

    disableFields(fields);
    disableFields(mapFilters);
    map.classList.add('map--faded');
    form.classList.add('ad-form--disabled');
    window.pins.removeAds();
  };

  var watchClickPins = function (arr) {
    var btnPins = mapPins.querySelectorAll('.map__pin[type="button"]');

    btnPins.forEach(function (pin, i) {
      checkBtnOnClick(pin, window.popup.createCard(arr[i]));
    });
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
    addressInput.value = window.drag.addCoordsInAddress(mainPin.style.left, mainPin.style.top);
    disableFields(fields);
    disableFields(mapFilters);
  });

  window.map = {
    openSite: openSite,
    closeSite: closeSite,
    watchClickPins: watchClickPins,
    removePopupIfOpen: removePopupIfOpen
  };
})();
