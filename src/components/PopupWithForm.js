
import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitHandler) {
        super(popupSelector);
        this._submitHandler = submitHandler;
        this._form = this._popup.querySelector('.form');
        this._inputs = this._form.querySelectorAll('.form__item');
        this._submitBtn = this._form.querySelector('.popup__submit-btn');
    }
    _getInputValues() {
        const values = {};
        this._inputs.forEach(input => {
            values.name = input.value;
        });
        return values;
    }
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', () => {
            this._submitHandler(this._getInputValues());
        })
    }
    close() {
        this._form.reset();
        super.close();
    }
    renderLoading(status){
        (status) ? this._submitBtn.textContent = "Сохранение..." : this._submitBtn.textContent = "Сохранить";
    }
}