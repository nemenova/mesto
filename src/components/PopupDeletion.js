
import Popup from './Popup.js'

export default class PopupDeletion extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._button = this._popup.querySelector('.form-delete');
        // this._submitHandler = submitHandler;
        
        
    }
    // open() {
    //     super.open();
        
    //     // this._id = id;
    //     console.log('popup opened 2')
        
    // }
    setEventListeners(deleteCard) {
        this._deleteCard = deleteCard;
        console.log('fuck2')
        super.setEventListeners();
        console.log('listeners super in popup class')
        this._button.addEventListener('submit', (evt) => {
            evt.preventDefault();
            console.log('listeners indi in popup class')
            console.log(this._deleteCard)
        
            this._deleteCard();
            this.close();
        })
    }
    close() {
        this.form.reset();
        super.close();
    }
}