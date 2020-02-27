'use strict';

(function () {

  var LIFT_KEY_MOUSE = 1;
  var KEY_ENTER = 'Enter';
  var MAX_RENDER_PINS = 5;
  var OFFSET_X = 25;
  var OFFSET_Y = 70;

  var statusesServer = {
    0: 'Время запроса истекло',
    400: 'Не верный запрос',
    403: 'Доступ запрещен',
    404: 'Файл не найден',
    500: 'Ошибка сервера',
    502: 'Проблемы на стороне сайта'
  };


  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var mainPinMap = map.querySelector('.map__pin--main');


  var removePins = function () {
    var btnPins = mapPins.querySelectorAll('.map__pin[type="button"]');

    for (var i = 0; i < btnPins.length; i++) {
      btnPins[i].remove();
    }
  };


  var renderPins = function (arr) {

    var fragment = document.createDocumentFragment();
    var template = document.querySelector('#pin').content.querySelector('.map__pin');

    removePins();

    for (var i = 0; i < MAX_RENDER_PINS; i++) {
      if (!arr[i]) {
        break;
      }

      if (arr[i].offer) {
        var elem = template.cloneNode(true);
        var img = elem.querySelector('img');
        var coords = 'left: ' + (arr[i].location.x - OFFSET_X) + 'px; top:' + (arr[i].location.y - OFFSET_Y) + 'px;';

        elem.setAttribute('style', coords);
        img.setAttribute('src', arr[i].author.avatar);
        img.setAttribute('alt', arr[i].offer.title);
      }

      fragment.append(elem);
    }

    window.map.openMap();
    mapPins.append(fragment);
    window.map.watchClickPins(arr);
  };

  var onLoad = function (list) {
    window.pins.copyPins = list;
    renderPins(list);
  };

  var onError = function (errorMessage) {

    var node = document.createElement('div');
    node.style = 'z-index: 100; background-color: black; color: pink; border: 2px solid pink; transform: translate(-50%); padding: 10px; text-align: center';
    node.style.position = 'fixed';
    node.style.left = '50%';
    node.style.bottom = '0';
    node.style.fontSize = '30px';

    node.textContent = filterError(errorMessage);
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var filterError = function (errorMessage) {
    if (statusesServer[errorMessage]) {
      errorMessage = statusesServer[errorMessage];
    } else {
      errorMessage = 'Неизвестная ошибка';
    }

    return 'Произошли проблемы: ' + errorMessage;
  };

  mainPinMap.addEventListener('keydown', function (evt) {
    if (evt.key === KEY_ENTER && map.classList.contains('map--faded')) {
      window.request.load(onLoad, onError);
    }
  });

  mainPinMap.addEventListener('mousedown', function (evt) {

    if (evt.which === LIFT_KEY_MOUSE && map.classList.contains('map--faded')) {
      window.request.load(onLoad, onError);
    }

    window.drag.onDrag(evt);
  });


  window.pins = {
    renderPins: renderPins,
    copyPins: null,
    removePins: removePins
  };

})();
