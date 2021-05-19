
import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitHandler) {
        super(popupSelector);
        this._submitHandler = submitHandler;

    }

    _getInputValues() {
        const values = {};
        const inputs = [...this.form.querySelectorAll('.form__item')];
        inputs.forEach(input => {
            values[input.name] = input.value
        });
        return values;
    }
    setEventListeners() {
        super.setEventListeners();
        this._form = this._popup.querySelector('.form');
        this._form.addEventListener('submit', () => {
            this._submitHandler(this._getInputValues());
            this.close();
        })
    }
    close() {
        this.form.reset();
        super.close();
    }
}