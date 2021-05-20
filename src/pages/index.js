import Card from '../components/Card.js';
import FormValidation from '../components/FormValidator.js';
import './index.css';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import { initialCards, placeInputInfo, placeImage, placeName, submitterOfAdd, popupAddForm, popupEditForm, btnAdd, btnOpenEditPopup, nameInput, jobInput, profileName, profileJob } from '../utils/constants.js'

const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
        const cards = new Card(item, '.card-template', openPhoto);
        const cardElement = cards.createCard();
        cardList.addAnotherItem(cardElement);
    },
},
    '.cards'
);
cardList.renderItems();

// функция добавления карточки через форму
function handleAddFormSubmit() {
    const btnAddition = document.querySelector('.add-submit-btn');
    btnAddition.classList.add('popup__submit-btn_inactive');
    btnAddition.setAttribute('disabled', 'true');
    placeInputInfo.name = placeName.value;
    placeInputInfo.link = placeImage.value;
    const card = new Card(placeInputInfo, '.card-template', openPhoto)
    const newPlace = card.createCard();
    cardList.addItem(newPlace);
}
// функция поп-апа с картинкой
function openPhoto(image, title) {
    const popupWithImage = new PopupWithImage('.popup-photo');
    popupWithImage.open(image, title);
    popupWithImage.setEventListeners();
};

// функция редактирования профиля
function handleEditFormSubmit(data) {
    const userInfo = new UserInfo({ userName: profileName, userInfo: profileJob })
    userInfo.setUserInfo(data);
};

// функция очистки сообщения об ошибке и стиля инпута после закрытия без сабмита
function clearErrorData(element) {
    const inputListform = element.querySelectorAll('.form__item');
    inputListform.forEach((item) => {
        const errorElement = element.querySelector(`.${item.id}-error`);
        errorElement.textContent = '';
        item.classList.remove('form__item_type_error');
    })
}
// редактирование профиля
btnOpenEditPopup.addEventListener('click', function () {
    const popupEditProfile = new PopupWithForm('.popup-edit', handleEditFormSubmit);
    popupEditProfile.setEventListeners();
    popupEditProfile.open();
    const inputInfo = new UserInfo({ userName: profileName, userInfo: profileJob });
    nameInput.value = inputInfo.getUserInfo().name;
    jobInput.value = inputInfo.getUserInfo().userInfo;
    clearErrorData(popupEditForm);
});
// добавление новой карточки
btnAdd.addEventListener('click', function () {
    submitterOfAdd.reset();
    clearErrorData(popupAddForm);
    const popupAddCard = new PopupWithForm('.popup-add-card', handleAddFormSubmit);
    popupAddCard.setEventListeners();
    popupAddCard.open();
});
// валидация форм
const form = new FormValidation({
    formSelector: '.form',
    inputSelector: '.form__item',
    submitButtonSelector: '.popup__submit-btn',
    inactiveButtonClass: 'popup__submit-btn_inactive',
    inputErrorClass: 'form__item_type_error',
    errorClass: 'form__item-error_active'
});
form.enableValidation();