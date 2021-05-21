import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
    constructor(popupSelector){
        super(popupSelector)


    }
    open(image, title){
        this._popup.querySelector('.popup__caption').textContent = title;
        this._popup.querySelector('.popup__image').alt = title;
        this._popup.querySelector('.popup__image').src = image;
        super.open();
    }
}