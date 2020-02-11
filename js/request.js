'use strict';

(function () {

  var STATUS_OK = 200;
  var SET_TIMEOUT = 5000;

  var url;


  var load = function (onLoad, onError) {
    url = 'https://js.dump.academy/keksobooking/data';

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', url);

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onLoad(xhr.response);
      } else {
        onError(xhr.status);
      }
    });

    xhr.addEventListener('timeout', function () {
      onError(xhr.status);
    });

    xhr.timeout = SET_TIMEOUT;

    xhr.send();
  };

  var send = function (data, onLoad, onError) {
    url = 'https://js.dump.academy/keksobooking';

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('POST', url);

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onLoad();
      } else {
        onError(xhr.status);
      }
    });

    xhr.addEventListener('timeout', function () {
      onError(xhr.status);
    });

    xhr.timeout = SET_TIMEOUT;

    xhr.send(data);
  };

  window.request = {
    load: load,
    send: send
  };
})();
