'use strict';

(function () {

  var fragment = document.createDocumentFragment();

  var onLoad = function (pins) {

    var template = document.querySelector('#pin').content.querySelector('.map__pin');
    var offsetX = 25;
    var offsetY = 70;

    for (var i = 0; i < pins.length; i++) {

      var elem = template.cloneNode(true);
      var img = elem.querySelector('img');
      var coords = 'left: ' + (pins[i].location.x - offsetX) + 'px; top:' + (pins[i].location.y - offsetY) + 'px;';

      elem.setAttribute('style', coords);
      img.setAttribute('src', pins[i].author.avatar);
      img.setAttribute('alt', pins[i].offer.title);

      fragment.append(elem);
    }
    window.map.openMap();
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

    switch (errorMessage) {
      case 400:
        errorMessage = 'Bad Request';
        break;
      case 403:
        errorMessage = 'Доступ запрещен';
        break;
      case 404:
        errorMessage = 'Файл не найден';
        break;
      case 500:
        errorMessage = 'Ошибка сервера';
        break;
      case 502:
        errorMessage = 'Bad Gateaway';
        break;
      default:
        errorMessage = 'Неизвестная ошибка';
    }

    return 'Произошли проблемы: ' + errorMessage;
  };

  window.pins = {
    onError: onError,
    onLoad: onLoad,
    fragment: fragment
  };

})();
