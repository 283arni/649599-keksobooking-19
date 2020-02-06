'use strict';

(function () {
  var LIFT_KEY_MOUSE = 1;
  var NON_SHIFT = 0;

  var mapPins = document.querySelector('.map__pins');
  var mainPin = mapPins.querySelector('.map__pin--main');
  var addressInput = document.querySelector('#address');
  var shift;

  mainPin.addEventListener('mousedown', function (evt) {
    if (evt.which === LIFT_KEY_MOUSE) {
      window.map.openMap();
    }

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    addressInput.value = findCoordsMainPin(NON_SHIFT, NON_SHIFT);


    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      addressInput.value = findCoordsMainPin(shift.x, shift.y);

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      mapPins.removeEventListener('mousemove', onMouseMove);
      mapPins.removeEventListener('mouseup', onMouseUp);
    };

    mapPins.addEventListener('mousemove', onMouseMove);
    mapPins.addEventListener('mouseup', onMouseUp);
  });

  var findCoordsMainPin = function (shiftX, shiftY) {
    var x = Math.floor((mainPin.offsetLeft - shiftX) + parseInt(getComputedStyle(mainPin).width, 10) / 2);
    var y = Math.floor((mainPin.offsetTop - shiftY) + parseInt(getComputedStyle(mainPin).height, 10));
    var elemAfterHeight = parseInt(getComputedStyle(mainPin, ':after').height, 10);
    return x + ', ' + (y + elemAfterHeight);
  };

  window.drag = {
    findCoordsMainPin: findCoordsMainPin
  };
})();
