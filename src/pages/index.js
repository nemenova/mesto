import Card from '../components/Card.js';
import FormValidation from '../components/FormValidator.js';
import './index.css';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import { btnAddition, initialCards, placeInputInfo, placeImage, placeName, submitterOfAdd, popupAddForm, popupEditForm, btnAdd, btnOpenEditPopup, nameInput, jobInput, profileName, profileJob, photoSubtitle, popupPhoto, validationConfig } from '../utils/constants.js'

const popupWithImage = new PopupWithImage('.popup-photo');
const userInfo = new UserInfo({ userName: profileName, userInfo: profileJob })

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
    
    btnAddition.classList.add(validatonConfig.inactiveButtonClass);
    btnAddition.setAttribute('disabled', 'true');
    placeInputInfo.name = placeName.value;
    placeInputInfo.link = placeImage.value;
    const card = new Card(placeInputInfo, '.card-template', openPhoto)
    const newPlace = card.createCard();
    cardList.addItem(newPlace);
}
// функция поп-апа с картинкой
function openPhoto(image, title) {
    
    popupWithImage.open(image, title);
    popupPhoto.src = image;
    photoSubtitle.textContent = title;
    popupWithImage.setEventListeners();
};

// функция редактирования профиля
function handleEditFormSubmit(data) {
    userInfo.setUserInfo(data);
};

// функция очистки сообщения об ошибке и стиля инпута после закрытия без сабмита
function clearErrorData(element) {
    const inputListform = element.querySelectorAll(validatonConfig.inputSelector);
    inputListform.forEach((item) => {
        const errorElement = element.querySelector(`.${item.id}-error`);
        errorElement.textContent = '';
        item.classList.remove(validatonConfig.inputErrorClass);
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
const form = new FormValidation(validationConfig);
form.enableValidation();