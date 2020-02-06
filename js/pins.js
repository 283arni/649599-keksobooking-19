'use strict';

(function () {

  var renderPins = function () {

    var template = document.querySelector('#pin').content.querySelector('.map__pin');
    var fragment = document.createDocumentFragment();
    var offsetX = 25;
    var offsetY = 70;

    for (var i = 0; i < window.card.QUANTITY_ADS; i++) {

      var elem = template.cloneNode(true);
      var img = elem.querySelector('img');
      var coords = 'left: ' + (window.card.arr[i].location.x - offsetX) + 'px; top:' + (window.card.arr[i].location.y - offsetY) + 'px;';

      elem.setAttribute('style', coords);
      img.setAttribute('src', window.card.arr[i].author.avatar);
      img.setAttribute('alt', window.card.arr[i].offer.title);

      fragment.append(elem);
    }

    return fragment;
  };

  window.pins = {
    renderPins: renderPins()
  };

})();
