export default class Card {
    constructor(data, cardSelector, action) {
        this._image = data.link;
        this._title = data.name;
        this._cardSelector = cardSelector;
        this._openPhoto = action;

    }
    _getTemplate() {
        const cardElement = document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);

        return cardElement;

    }
    createCard() {
        this._element = this._getTemplate();
        this._element.querySelector('.card__title').textContent = this._title;
        this._element.querySelector('.card__image').src = this._image;
        this._element.querySelector('.card__image').alt = this._title;
        this._setEventListeners();
        
        return this._element;
    }
    _setEventListeners() {
        this._element.querySelector('.card__delete-btn').addEventListener('click', () => {
            this._deleteCard();
        });
        this._element.querySelector('.card__like-btn').addEventListener('click', () => {
            this._likeCard();
        });

        this._element.querySelector('.card__image').addEventListener('click', () => {
            this._openPhoto(this._image, this._title);
        });
    };
    // функции лайка и удаления карточки
    _likeCard() {
        this._element.querySelector('.card__like-btn').classList.toggle('card__like-btn_active');
    };

    _deleteCard() {
        const extraCard = this._element.closest('.card');
        extraCard.remove();
    };

};
