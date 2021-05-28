// import { data } from "autoprefixer";

export default class Card {
    constructor(data, cardSelector, handleCardClick) {
        this._image = data.link;
        this._title = data.name;
        this._owner = data.owner._id;
        this._cardSelector = cardSelector;
        this._openPhoto = handleCardClick;
    }
    _getTemplate() {
        const cardElement = document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);

        return cardElement;
    }
    createCard() {
        this._element = this._getTemplate();
        if (this._owner != 'f2d9e460d3134ab20662402a') {
            
            const extraBtn = this._element.querySelector('.card__delete-btn')
            extraBtn.remove();
        }
        const cardImage = this._element.querySelector('.card__image');
        const cardTitle = this._element.querySelector('.card__title');
        cardTitle.textContent = this._title;
        cardImage.src = this._image;
        cardImage.alt = this._title;
        this._setEventListeners();
        
        return this._element;
    }
    _setEventListeners() {

        if (this._owner === 'f2d9e460d3134ab20662402a') {
            this._element.querySelector('.card__delete-btn').addEventListener('click', () => {
                this._deleteCard();
            });
        }
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
