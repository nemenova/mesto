const enableValidationObj = {
    formSelector: '.form',
    inputSelector: '.form__item',
    submitButtonSelector: '.popup__submit-btn',
    inactiveButtonClass: 'popup__submit-btn_inactive',
    inputErrorClass: 'form__item_type_error',
    errorClass: 'form__item-error_active'
};

const formElement = document.querySelector(enableValidationObj.formSelector);
const inputList = Array.from(formElement.querySelectorAll(enableValidationObj.inputSelector));

// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(enableValidationObj.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(enableValidationObj.errorClass);
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(enableValidationObj.inputErrorClass);
    errorElement.classList.remove(enableValidationObj.errorClass);
    errorElement.textContent = '';
};

// Функции проверки валидности полей
const isValid = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

// Функция изменения состояния кнопки
const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(enableValidationObj.inactiveButtonClass);
        buttonElement.setAttribute('disabled', 'disabled');
    } else {
        buttonElement.classList.remove(enableValidationObj.inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
    }
};

// Функция установки слушателей на все
const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(enableValidationObj.inputSelector));
    const buttonElement = formElement.querySelector(enableValidationObj.submitButtonSelector);
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement)
            toggleButtonState(inputList, buttonElement);
        });
    });
};

// Функция запуска проверки
const enableValidation = (objConfig) => {
    const formList = Array.from(document.querySelectorAll(objConfig.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement);
    });
};

enableValidation(enableValidationObj);