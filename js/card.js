
'use strict';

(function () {

  var typesHousing = {
    'bungalo': 'Бунгало',
    'flat': 'Квартира',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  var Numebers = {
    ZERO: 0,
    ONE: 1,
    FIVE: 5
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

  var checkRooms = function (rooms, guests) {
    var messageRooms = rooms.toString();
    var messageGuasts = guests.toString();

    if (+messageRooms[messageRooms.length - Numebers.ONE] === Numebers.ONE) {
      messageRooms = rooms + ' комната для ';
    } else if (+messageRooms[messageRooms.length - Numebers.ONE] >= Numebers.FIVE || +messageRooms === Numebers.ZERO) {
      messageRooms = rooms + ' комнат для ';
    } else {
      messageRooms = rooms + ' комнаты для ';
    }

    if (+messageGuasts[messageGuasts.length - Numebers.ONE] === Numebers.ONE) {
      messageGuasts = guests + ' гостя';
    } else {
      messageGuasts = guests + ' гостей';
    }

    return messageRooms + messageGuasts;
  };

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
    elemCardType.textContent = typesHousing[item.offer.type];
    elemCardAccommodate.textContent = checkRooms(item.offer.rooms, item.offer.guests);
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
