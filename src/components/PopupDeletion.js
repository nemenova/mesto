
import Popup from './Popup.js'

export default class PopupDeletion extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._form = this._popup.querySelector('.form-delete'); 
    }
    open(deleteCard) {
        super.open();
        this._deleteCard = deleteCard;
    }
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._deleteCard();
        })
    }
}