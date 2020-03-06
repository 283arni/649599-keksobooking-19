'use strict';

(function () {

  var NON_SHIFT = 0;
  var STOP_TOP_MOVE = 130;
  var STOP_BOTTOM_MOVE = 630;
  var DIVISOR = 2;

  var mapPins = document.querySelector('.map__pins');
  var addressInput = document.querySelector('#address');
  var mainPin = mapPins.querySelector('.map__pin--main');
  var centerMainPinMap = Math.floor(parseInt(getComputedStyle(mainPin).width, 10) / DIVISOR);
  var widthMap = Math.floor(parseInt(getComputedStyle(mapPins).width, 10));
  var heightMainPin = parseInt(getComputedStyle(mainPin).height, 10);
  var heightMainPinAfter;

  var Coord = function (x, y) {
    this.x = x;
    this.y = y;
  };

  var onMove = function (evt) {

    var startCoords = new Coord(evt.clientX, evt.clientY);
    heightMainPinAfter = parseInt(getComputedStyle(mainPin, ':after').height, 10);

    addressInput.value = addCoordsInAddress(mainPin.style.left, mainPin.style.top);

    var onMouseMove = function (moveEvt) {

      moveEvt.preventDefault();

      var shift = new Coord(startCoords.x - moveEvt.clientX, startCoords.y - moveEvt.clientY);

      startCoords = new Coord(moveEvt.clientX, moveEvt.clientY);

      if (findCoordsMainPinY(shift.y) >= STOP_TOP_MOVE && findCoordsMainPinY(shift.y) <= STOP_BOTTOM_MOVE) {
        mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      }

      if (findCoordsMainPinX(shift.x) >= NON_SHIFT && findCoordsMainPinX(shift.x) <= widthMap) {
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      }

      addressInput.value = addCoordsInAddress(mainPin.style.left, mainPin.style.top);
    };

    var onMouseUp = function (upEvt) {

      upEvt.preventDefault();

      mapPins.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    mapPins.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  var findCoordsMainPinX = function (shiftX) {
    return Math.ceil((mainPin.offsetLeft - (shiftX || NON_SHIFT)) + centerMainPinMap);
  };

  var findCoordsMainPinY = function (shiftY) {
    return Math.ceil((mainPin.offsetTop - (shiftY || NON_SHIFT)) + heightMainPin + (heightMainPinAfter || NON_SHIFT));
  };

  var addCoordsInAddress = function (left, top) {
    return (parseInt(left, 10) + centerMainPinMap) + ', ' + (parseInt(top, 10) + heightMainPin + (heightMainPinAfter || NON_SHIFT));
  };

  window.drag = {
    addCoordsInAddress: addCoordsInAddress,
    onMove: onMove
  };
})();
