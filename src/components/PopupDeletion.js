
import Popup from './Popup.js'

export default class PopupDeletion extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._button = this._popup.querySelector('.form-delete'); 
    }
    open(deleteCard) {
        super.open();
        this._deleteCard = deleteCard;
        this.setEventListeners();
    }
    setEventListeners() {
        super.setEventListeners();
        this._button.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._deleteCard();
            this.close();
        })
    }
    close() {
        this.form.reset();
        super.close();
    }
}