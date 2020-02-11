'use strict';

(function () {

  var KEY_ENTER = 'Enter';
  var KEY_ESC = 'Escape';
  var LIFT_KEY_MOUSE = 1;

  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var mapFiltersBlock = map.querySelector('.map__filters-container');
  var mapFilters = mapFiltersBlock.querySelectorAll('.map__filter');
  var form = document.querySelector('.ad-form');
  var fields = document.querySelectorAll('fieldset');
  var mainPin = mapPins.querySelector('.map__pin--main');

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

    if (map.classList.contains('map--faded')) {
      activeFields(fields);
      activeFields(mapFilters);
      map.classList.remove('map--faded');
      form.classList.remove('ad-form--disabled');
      mapPins.append(window.pins.fragment);
      var btnPins = mapPins.querySelectorAll('.map__pin[type="button"]');

      for (var i = 0; i < btnPins.length; i++) {
        checkBtnOnClick(btnPins[i], window.card.createCards[i]);
      }
    }
  };

  var closeMap = function () {

    disableFields(fields);
    disableFields(mapFilters);
    map.classList.add('map--faded');
    form.classList.add('ad-form--disabled');

    var btnPins = mapPins.querySelectorAll('.map__pin[type="button"]');

    for (var i = 0; i < btnPins.length; i++) {
      btnPins[i].remove();
    }
  };

  var checkBtnOnClick = function (btnPin, card) {

    btnPin.addEventListener('click', function () {
      addCard(card);
    });

    btnPin.addEventListener('keydown', function (e) {
      if (e.key === KEY_ENTER) {
        addCard(card);
      }
    });
  };

  var removeOpenIfPopup = function () {

    if (map.querySelector('.popup')) {
      map.querySelector('.popup').remove();
    }
  };


  var addCard = function (card) {

    removeOpenIfPopup();
    mapFiltersBlock.before(card);

    var popup = map.querySelector('.popup');
    var popupClose = popup.querySelector('.popup__close');

    popupClose.addEventListener('click', function () {
      popup.remove();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === KEY_ESC) {
        popup.remove();
      }
    });
  };

  window.addEventListener('load', function () {
    disableFields(fields);
    disableFields(mapFilters);
  });

  mainPin.addEventListener('keydown', function (e) {
    if (e.key === KEY_ENTER) {
      openMap();
    }
  });

  mainPin.addEventListener('mousedown', function (evt) {

    if (evt.which === LIFT_KEY_MOUSE) {
      window.request.load(window.pins.onLoad, window.pins.onError);
    }
    window.drag.onDrag(evt);
  });

  window.map = {
    openMap: openMap,
    closeMap: closeMap
  };
})();
