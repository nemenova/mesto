export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector)
    }
    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
        document.addEventListener('click', this.closeByOverlay);
    }
    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
        document.removeEventListener('click', this.closeByOverlay);
    }
    _handleEscClose = (evt) => {
        if (evt.key === 'Escape') {
            this.close();
        };
    }
    closeByOverlay = (evt) => {
    if (evt.target.classList.contains('popup')) {
        this.close();
    }
}
    setEventListeners() {
        this._popup.querySelector('.popup__close-btn').addEventListener('click', () => {
            this.close();
        })
    }
}