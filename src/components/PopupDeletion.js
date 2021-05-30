
import Popup from './Popup.js'

export default class PopupDeletion extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._button = this._popup.querySelector('.form-delete'); 
    }
  
    setEventListeners(deleteCard) {
        this._deleteCard = deleteCard;
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