'use strict';

(function () {

  var NON_SHIFT = 0;
  var STOP_TOP_MOVE = 130;
  var STOP_BOTTOM_MOVE = 630;
  var DIVISOR = 2;
  var SLISER_COORDS = -3;

  var mapPins = document.querySelector('.map__pins');
  var addressInput = document.querySelector('#address');
  var mainPin = mapPins.querySelector('.map__pin--main');
  var centerMainPinMap = Math.floor(parseInt(getComputedStyle(mainPin).width, 10) / DIVISOR);

  var Coord = function (x, y) {
    this.x = x;
    this.y = y;
  };

  var onDrag = function (evt) {

    var startCoords = new Coord(evt.clientX, evt.clientY);

    addressInput.value = findCoordsMainPin();

    var onMouseMove = function (moveEvt) {

      moveEvt.preventDefault();

      var shift = new Coord(startCoords.x - moveEvt.clientX, startCoords.y - moveEvt.clientY);

      startCoords = new Coord(moveEvt.clientX, moveEvt.clientY);

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

    var offset = new Coord(Math.floor((mainPin.offsetLeft - (shiftX || NON_SHIFT)) + centerMainPinMap), Math.floor((mainPin.offsetTop - (shiftY || NON_SHIFT)) + parseInt(getComputedStyle(mainPin).height, 10)));

    var blockAfterHeight = parseInt(getComputedStyle(mainPin, ':after').height, 10);

    return offset.x + ', ' + (offset.y + blockAfterHeight);
  };

  var stopMoveY = function (coords) {
    return parseInt(coords.slice(SLISER_COORDS), 10);
  };

  window.drag = {
    findCoordsMainPin: findCoordsMainPin,
    onDrag: onDrag,
    centerMainPinMap: centerMainPinMap
  };
})();
