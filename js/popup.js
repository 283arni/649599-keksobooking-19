
'use strict';

(function () {

  var typeHousing = {
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

  var templateCard = document.querySelector('#card').content.querySelector('.map__card');
  var fragment = document.createDocumentFragment();

  var createFeatures = function (namesFeatures) {

    namesFeatures.forEach(function (name) {
      var elem = document.createElement('li');
      elem.classList.add('popup__feature', 'popup__feature--' + name);
      elem.textContent = name;
      fragment.append(elem);
    });

    return fragment;
  };

  var addPhoto = function (elem, photos) {

    photos.forEach(function (photo) {
      var elemClone = elem.cloneNode();
      elemClone.setAttribute('src', photo);
      fragment.append(elemClone);
    });

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
    elemCardType.textContent = typeHousing[item.offer.type];
    elemCardAccommodate.textContent = checkRooms(item.offer.rooms, item.offer.guests);
    elemCardTime.textContent = 'Заезд после ' + item.offer.checkin + ', выезд до ' + item.offer.checkout;
    elemCardFeaturesClone.append(createFeatures(item.offer.features));
    elemCardFeatures.replaceWith(elemCardFeaturesClone);
    elemCardDescription.textContent = item.offer.description;
    elemCardPhoto.replaceWith(addPhoto(elemCardPhoto, item.offer.photos));
    elemCardAvatar.setAttribute('src', item.author.avatar);

    if (!elemCard.querySelector('.popup__photos').children.length) {
      elemCard.querySelector('.popup__photos').style.display = 'none';
    }

    if (!elemCard.querySelector('.popup__features').children.length) {
      elemCard.querySelector('.popup__features').style.display = 'none';
    }

    return elemCard;
  };

  window.popup = {
    createCard: createCard
  };
})();
