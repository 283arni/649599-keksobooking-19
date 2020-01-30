'use strict';

var QUANTITY_ADS = 8;

var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var widthMap = parseInt(getComputedStyle(mapPins).width, 10);
var mapFilters = document.querySelector('.map__filters-container');

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

var createObjects = function () {

  var ads = [];
  var titlesAds = ['Лучшая квартира', 'Квартира с хорошим видом', 'Сдаю жилье', 'Со всеми удобствами', 'Отель "У Кекса"', 'Гостевой дом"Васаби"', 'Отель "Самурай"', 'Улей'];
  var priceAds = [1000, 2000, 3000, 4000, 5000];
  var typeFlat = ['palace', 'flat', 'house', 'bungalo'];
  var roomsFlat = [1, 2, 3, 4];
  var quantityGuests = [2, 3, 4, 5];
  var times = ['12:00', '13:00', '14:00'];
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  for (var i = 1; i <= QUANTITY_ADS; i++) {
    var obj = {
      author: {
        avatar: 'img/avatars/user0' + i + '.png'
      },
      offer: {
        title: titlesAds[i - 1],
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

    obj.offer.address = obj.location.x + ', ' + obj.location.y;
    ads.push(obj);
  }

  return ads;
};

var arr = createObjects();

var renderPins = function () {

  var template = document.querySelector('#pin').content.querySelector('.map__pin');
  var fragment = document.createDocumentFragment();
  var offsetX = 25;
  var offsetY = 70;

  for (var i = 0; i < QUANTITY_ADS; i++) {

    var elem = template.cloneNode(true);
    var img = elem.querySelector('img');
    var coords = 'left: ' + (arr[i].location.x - offsetX) + 'px; top:' + (arr[i].location.y - offsetY) + 'px;';

    elem.setAttribute('style', coords);
    img.setAttribute('src', arr[i].author.avatar);
    img.setAttribute('alt', arr[i].offer.title);

    fragment.append(elem);
  }

  return fragment;
};

mapPins.append(renderPins());

var chooseType = function (type) {

  switch (type) {
    case 'palace':
      type = 'Дворец';
      break;
    case 'flat':
      type = 'Квартира';
      break;
    case 'bungalo':
      type = 'Бунгало';
      break;
    case 'house':
      type = 'Дом';
  }

  return type;
};

var checkGuests = function (rooms, guests) {

  if (rooms === 1) {
    return rooms + ' комната для ' + guests + ' гостей';
  } else if (rooms === 5) {
    return rooms + ' комнат для ' + guests + ' гостей';
  }

  return rooms + ' комнаты для ' + guests + ' гостей';
};

var createFeatures = function (namesFeatures) {

  var fragment = document.createDocumentFragment();

  for (var i = 0; i < namesFeatures.length; i++) {
    var elem = document.createElement('li');
    elem.classList.add('popup__feature', 'popup__feature--' + namesFeatures[i]);
    elem.textContent = namesFeatures[i];
    fragment.append(elem);
  }

  return fragment;
};

var addPhoto = function (elem, photos) {

  var fragment = document.createDocumentFragment();

  for (var i = 0; i < photos.length; i++) {
    var elemClone = elem.cloneNode();
    elemClone.setAttribute('src', photos[i]);
    fragment.append(elemClone);
  }

  return fragment;
};


var createCards = function () {

  var temolateCard = document.querySelector('#card').content.querySelector('.map__card');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < QUANTITY_ADS; i++) {
    var elemCard = temolateCard.cloneNode(true);
    var elemCardTitle = elemCard.querySelector('.popup__title');
    var elemCardAddress = elemCard.querySelector('.popup__text--address');
    var elemCardPrice = elemCard.querySelector('.popup__text--price');
    var elemCardType = elemCard.querySelector('.popup__type');
    var elemCardAccommodate = elemCard.querySelector('.popup__text--capacity');
    var elemCardTime = elemCard.querySelector('.popup__text--time');
    var elemCardFeatures = elemCard.querySelector('.popup__features');
    var elemCardFeaturesClone = elemCardFeatures.cloneNode();
    var elemCardDescription = elemCard.querySelector('.popup__description');
    var elemCardPhoto = elemCard.querySelector('.popup__photo');

    elemCardTitle.textContent = arr[i].offer.title;
    elemCardAddress.textContent = arr[i].offer.address;
    elemCardPrice.innerHTML = arr[i].offer.price + ' &#x20bd;<span>/ночь</span>';
    elemCardType.textContent = chooseType(arr[i].offer.type);
    elemCardAccommodate.textContent = checkGuests(arr[i].offer.rooms, arr[i].offer.guests);
    elemCardTime.textContent = 'Заезд после ' + arr[i].offer.checkin + ', выезд до ' + arr[i].offer.checkout;
    elemCardFeaturesClone.append(createFeatures(arr[i].offer.features));
    elemCardFeatures.replaceWith(elemCardFeaturesClone);
    elemCardDescription.textContent = arr[i].offer.description;
    elemCardPhoto.replaceWith(addPhoto(elemCardPhoto, arr[i].offer.photos));

    fragment.append(elemCard);
  }

  return fragment;
};

mapFilters.before(createCards());
