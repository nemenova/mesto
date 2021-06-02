export default class FormValidation {
    constructor(enableValidationObj, formSelector) {
        this._enableValidationObj = enableValidationObj;
        this._form = document.querySelector(formSelector);
        this._inputList = Array.from(this._form.querySelectorAll(this._enableValidationObj.inputSelector));
        this._buttonElement = this._form.querySelector(this._enableValidationObj.submitButtonSelector);
    }
    // Функция запуска проверки
    enableValidation = () => {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners();
    };

    // Функция, которая добавляет класс с ошибкой
    _showInputError = (inputElement, errorMessage) => {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._enableValidationObj.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._enableValidationObj.errorClass);
    };

    // Функция, которая удаляет класс с ошибкой
    _hideInputError = (inputElement) => {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._enableValidationObj.inputErrorClass);
        errorElement.classList.remove(this._enableValidationObj.errorClass);
        errorElement.textContent = '';
    };

    // Функции проверки валидности полей
    _isValid = (inputElement) => {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    };

    _hasInvalidInput = () => {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    };

    // Функция изменения состояния кнопки
    _toggleButtonState = () => {
        if (this._hasInvalidInput()) {
            this._disableButton()
        } else {
            this._buttonElement.classList.remove(this._enableValidationObj.inactiveButtonClass);
            this._buttonElement.removeAttribute('disabled');
        }
    };
    _disableButton() {
        this._buttonElement.classList.add(this._enableValidationObj.inactiveButtonClass);
        this._buttonElement.setAttribute('disabled', 'disabled');
    }
    // Функция установки слушателей на все
    _setEventListeners = () => {
        this._toggleButtonState();
        this._form.addEventListener('reset', () => {
            this._disableButton();
            this._inputList.forEach((inputElement) => {
                this._hideInputError(inputElement)
            })
        });
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._isValid(inputElement)
                this._toggleButtonState();
            });
            return inputElement;
        });
    };
};