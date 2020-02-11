'use strict';

(function () {

  var NON_SHIFT = 0;
  var STOP_TOP_MOVE = 130;
  var STOP_BOTTOM_MOVE = 630;

  var mapPins = document.querySelector('.map__pins');
  var mainPin = mapPins.querySelector('.map__pin--main');
  var addressInput = document.querySelector('#address');
  var shift;

  var onDrag = function (evt) {

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

      if (stopMoveY(findCoordsMainPin(shift.x, shift.y)) > STOP_TOP_MOVE && stopMoveY(findCoordsMainPin(shift.x, shift.y)) < STOP_BOTTOM_MOVE) {
        mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      }

      mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      addressInput.value = findCoordsMainPin(shift.x, shift.y);

    };

    var onMouseUp = function (upEvt) {

      upEvt.preventDefault();

      mapPins.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    mapPins.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  var findCoordsMainPin = function (shiftX, shiftY) {

    var x = Math.floor((mainPin.offsetLeft - shiftX) + parseInt(getComputedStyle(mainPin).width, 10) / 2);
    var y = Math.floor((mainPin.offsetTop - shiftY) + parseInt(getComputedStyle(mainPin).height, 10));
    var elemAfterHeight = parseInt(getComputedStyle(mainPin, ':after').height, 10);

    return x + ', ' + (y + elemAfterHeight);
  };

  var stopMoveY = function (coords) {
    return parseInt(coords.slice(-3), 10);
  };

  window.drag = {
    findCoordsMainPin: findCoordsMainPin,
    onDrag: onDrag
  };
})();
