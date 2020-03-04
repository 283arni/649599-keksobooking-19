'use strict';

(function () {

  var STATUS_OK = 200;
  var SET_TIMEOUT = 5000;

  var Urls = {
    GET_DATA: 'https://js.dump.academy/keksobooking/data',
    SEND_DATA: 'https://js.dump.academy/keksobooking'
  };

  var getResponse = function (onLoad, onError, xhr) {

    xhr.responseType = 'json';

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

  };

  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();

    getResponse(onLoad, onError, xhr);

    xhr.open('GET', Urls.GET_DATA);
    xhr.send();
  };

  var send = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();

    getResponse(onLoad, onError, xhr);

    xhr.open('POST', Urls.SEND_DATA);
    xhr.send(data);
  };

  window.request = {
    load: load,
    send: send
  };
})();
