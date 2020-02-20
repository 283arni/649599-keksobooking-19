
'use strict';

(function () {

  // var QUANTITY_ADS = 8;

  // var mapPins = document.querySelector('.map__pins');
  // // var widthMap = parseInt(getComputedStyle(mapPins).width, 10);

  // // var randomItem = function (arr) {
  // //   return arr[Math.floor(Math.random() * arr.length)];
  // // };

  // // var randomLength = function (arr) {

  // //   var lengthArr = Math.floor(Math.random() * arr.length);
  // //   var newArr = [];

  // //   for (var j = 0; j <= lengthArr; j++) {
  // //     newArr.push(arr[j]);
  // //   }

  // //   return newArr;
  // // };

  // // var randomCoordX = function (x) {
  // //   return Math.floor(Math.random() * (x + 1));
  // // };

  // // var randomCoordY = function (min, max) {
  // //   return Math.floor(Math.random() * (max - min + 1)) + min;
  // // };

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

  // var createObjects = function () {

  //   var ads = [];
  //   var titlesAds = ['Лучшая квартира', 'Квартира с хорошим видом', 'Сдаю жилье', 'Со всеми удобствами', 'Отель "У Кекса"', 'Гостевой дом"Васаби"', 'Отель "Самурай"', 'Улей'];
  //   var priceAds = [1000, 2000, 3000, 4000, 5000];
  //   var typeFlats = ['palace', 'flat', 'house', 'bungalo'];
  //   var roomsFlat = [1, 2, 3, 4];
  //   var quantityGuests = [2, 3, 4, 5];
  //   var times = ['12:00', '13:00', '14:00'];
  //   var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  //   var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  //   for (var i = 1; i <= QUANTITY_ADS; i++) {
  //     var obj = {
  //       author: {
  //         avatar: 'img/avatars/user0' + i + '.png'
  //       },
  //       offer: {
  //         title: titlesAds[i - 1],
  //         address: '',
  //         price: randomItem(priceAds),
  //         type: randomItem(typeFlats),
  //         rooms: randomItem(roomsFlat),
  //         guests: randomItem(quantityGuests),
  //         checkin: randomItem(times),
  //         checkout: randomItem(times),
  //         features: randomLength(features),
  //         description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  //         photos: randomLength(photos),
  //       },
  //       location: {
  //         x: randomCoordX(widthMap),
  //         y: randomCoordY(130, 630)
  //       }
  //     };

  //     obj.offer.address = obj.location.x + ', ' + obj.location.y;
  //     ads.push(obj);
  //   }

  //   return ads;
  // };

  // var arr = createObjects();

  var createCard = function (item) {

    var templateCard = document.querySelector('#card').content.querySelector('.map__card');

    var elemCard = templateCard.cloneNode(true);
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
    var elemCardAvatar = elemCard.querySelector('.popup__avatar');

    elemCardTitle.textContent = item.offer.title;
    elemCardAddress.textContent = item.offer.address;
    elemCardPrice.innerHTML = item.offer.price + ' &#x20bd;<span>/ночь</span>';
    elemCardType.textContent = chooseType(item.offer.type);
    elemCardAccommodate.textContent = checkGuests(item.offer.rooms, item.offer.guests);
    elemCardTime.textContent = 'Заезд после ' + item.offer.checkin + ', выезд до ' + item.offer.checkout;
    elemCardFeaturesClone.append(createFeatures(item.offer.features));
    elemCardFeatures.replaceWith(elemCardFeaturesClone);
    elemCardDescription.textContent = item.offer.description;
    elemCardPhoto.replaceWith(addPhoto(elemCardPhoto, item.offer.photos));
    elemCardAvatar.setAttribute('src', item.author.avatar);

    return elemCard;
  };

  window.card = {
    createCard: createCard
  };
})();
