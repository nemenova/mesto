export default class FormValidation {
    constructor(enableValidationObj) {
        this._enableValidationObj = enableValidationObj;
    }

    // Функция запуска проверки
    enableValidation = () => {
        const formList = Array.from(document.querySelectorAll(this._enableValidationObj.formSelector));
        formList.forEach((formElement) => {
            formElement.addEventListener('submit', (evt) => {
                evt.preventDefault();
            });
            this._setEventListeners(formElement);
        });
    };

    // Функция, которая добавляет класс с ошибкой
    _showInputError = (formElement, inputElement, errorMessage) => {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._enableValidationObj.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._enableValidationObj.errorClass);
    };

    // Функция, которая удаляет класс с ошибкой
    _hideInputError = (formElement, inputElement) => {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._enableValidationObj.inputErrorClass);
        errorElement.classList.remove(this._enableValidationObj.errorClass);
        errorElement.textContent = '';
    };

    // Функции проверки валидности полей
    _isValid = (formElement, inputElement) => {
        if (!inputElement.validity.valid) {
            this._showInputError(formElement, inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(formElement, inputElement);
        }
    };

    _hasInvalidInput = (inputList) => {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    };

    // Функция изменения состояния кнопки
    _toggleButtonState = (inputList, buttonElement) => {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this._enableValidationObj.inactiveButtonClass);
            buttonElement.setAttribute('disabled', 'disabled');
        } else {
            buttonElement.classList.remove(this._enableValidationObj.inactiveButtonClass);
            buttonElement.removeAttribute('disabled');
        }
    };

    // Функция установки слушателей на все
    _setEventListeners = (formElement) => {
        const inputList = Array.from(formElement.querySelectorAll(this._enableValidationObj.inputSelector));
        const buttonElement = formElement.querySelector(this._enableValidationObj.submitButtonSelector);
        this._toggleButtonState(inputList, buttonElement);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._isValid(formElement, inputElement)
                this._toggleButtonState(inputList, buttonElement);
            });
        });
    };
};