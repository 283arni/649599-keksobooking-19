'use strict';
var QUANTITY_ADS = 8;
var ads = [];
var titlesAds = ['Лучшая квартира', 'Квартира с хорошим видом', 'Сдаю жилье', 'Со всеми удобствами', 'Отель "У Кекса"', 'Гостевой дом"Васаби"', 'Отель "Самурай"', 'Улий'];
var priceAds = [1000, 2000, 3000, 4000, 5000];
var typeFlat = ['palace', 'flat', 'house', 'bungalo'];
var roomsFlat = [1, 2, 3, 4];
var quantityGuests = [2, 3, 4, 5];
var times = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var widthMap = parseInt(getComputedStyle(mapPins).width, 10);

map.classList.remove('map--faded');

var randomItem = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var randomLength = function (arr) {
  var lengthArr = Math.floor(Math.random() * arr.length);
  var newArr = [];
  for (var j = 0; j <= lengthArr; j++) {
    newArr.push(arr[j]);
  }
  return newArr;
};

var randomCoordX = function (x) {
  return Math.floor(Math.random() * (x + 1));
};

var randomCoordY = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

for (var i = 1; i <= QUANTITY_ADS; i++) {
  var obj = {
    author: {
      avatar: 'img/avatars/user0' + i + '.png'
    },
    offer: {
      title: titlesAds[i],
      address: '',
      price: randomItem(priceAds),
      type: randomItem(typeFlat),
      rooms: randomItem(roomsFlat),
      guests: randomItem(quantityGuests),
      checkin: randomItem(times),
      checkout: randomItem(times),
      features: randomLength(features),
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      photos: randomLength(photos),
    },
    location: {
      x: randomCoordX(widthMap),
      y: randomCoordY(130, 630)
    }
  };

  ads.push(obj);
}

console.log(ads)
