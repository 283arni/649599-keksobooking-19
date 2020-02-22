
'use strict';

(function () {

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
