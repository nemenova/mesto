export default class Card {
    constructor(data, cardSelector, handleCardClick, myId, func, like, dislike) {
        this._data = data;
        this._image = data.link;
        this._title = data.name;
        this._owner = data.owner._id;
        this._id = data._id;
        this._likes = data.likes;
        this._cardId = data._id;
        this._like = like;
        this._dislike = dislike;
        this._myId = myId;
        this._cardSelector = cardSelector;
        this._openPhoto = handleCardClick;
        this._func = func;
    }
    _getTemplate() {
        const cardElement = document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);

        return cardElement;
    }
    getId() {
        return this._id;
    }
    createCard() {
        this._element = this._getTemplate();
        if (this._owner != this._myId) {

            const extraBtn = this._element.querySelector('.card__delete-btn')
            extraBtn.remove();
        }
        this._likeBtn = this._element.querySelector('.card__like-btn')
        this._likesNumber = this._element.querySelector('.card__likes-number');
        const cardImage = this._element.querySelector('.card__image');
        const cardTitle = this._element.querySelector('.card__title');
        cardTitle.textContent = this._title;
        cardImage.src = this._image;
        cardImage.alt = this._title;
        this._setEventListeners();

        this.renewLikes(this._data);
        this._checkLikes();

        return this._element;
    }
    _setEventListeners() {

        if (this._owner === this._myId) {
            this._element.querySelector('.card__delete-btn').addEventListener('click', () => {
                this._func();
            });
        }
        this._element.querySelector('.card__like-btn').addEventListener('click', () => {
            if (this._likeBtn.classList.contains('card__like-btn_active')) {
                this.dislikeCard();
                this._dislike();
            } else {
                this.likeCard();
                this._like();
            }
        });

        this._element.querySelector('.card__image').addEventListener('click', () => {
            this._openPhoto(this._image, this._title);
        });
    };
    _checkLikes() {
        this._likes.forEach(like => {
            if (like._id === this._myId) {
                this._likeBtn.classList.add('card__like-btn_active');
            }
        });
    }
    // функции лайка, обновления количества лайков и удаления карточки
    likeCard() {
        this._likeBtn.classList.add('card__like-btn_active');
    };
    dislikeCard() {
        this._likeBtn.classList.remove('card__like-btn_active');
    };
    renewLikes(data) {
        this._likesNumber.textContent = data.likes.length;
    }
    deleteCard = () => {
        this._element.remove();
    };
};
