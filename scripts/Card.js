const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

// функция воспроизведения карточки
class Card {
    constructor(data, cardSelector) {
        this._image = data.link;
        this._title = data.name;
        this._cardSelector = cardSelector;
        // this._openPhoto = openPhoto;
    }
    getTemplate() {
        const cardElement = document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);
        console.log(cardElement);
        return cardElement;

    }
    createCard() {
        this._element = this.getTemplate();
        console.log(this._element);
        
        this._element.querySelector('.card__title').textContent = this._title;
        this._element.querySelector('.card__image').src = this._image;
        this._element.querySelector('.card__image').alt = this._title;

        this.setEventListeners();

        // this._image.addEventListener('click', openPhoto);


        return this._element;
        
    }

    setEventListeners() {
        
        this._element.querySelector('.card__delete-btn').addEventListener('click', () => {
            this._deleteCard();
        });
        this._element.querySelector('.card__like-btn').addEventListener('click', () => {
            this._likeCard();
        });
    }

    // функции лайка и удаления карточки
    likeCard() {
        this._element.querySelector('.card__like-btn').classList.toggle('card__like-btn_active');
    };

    deleteCard() {
        const extraCard = this._element.closest('.card');
        extraCard.remove();
    };

};

initialCards.forEach((item) => {
    const cards = new Card(item, '.card-template');
    
    const cardElement = cards.createCard();
    document.querySelector('.cards').append(cardElement);
});