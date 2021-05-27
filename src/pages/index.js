import Card from '../components/Card.js';
import FormValidation from '../components/FormValidator.js';
import './index.css';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import { btnAddition, initialCards, placeInputInfo, placeImage, placeName, submitterOfAdd, popupAddForm, popupEditForm, btnAdd, btnOpenEditPopup, nameInput, jobInput, profileName, profileJob, photoSubtitle, popupPhoto, validationConfig } from '../utils/constants.js'
import Api from '../components/Api.js'

const popupWithImage = new PopupWithImage('.popup-photo');
const userInfo = new UserInfo({ userName: profileName, userInfo: profileJob })
const popupEditProfile = new PopupWithForm('.popup-edit', handleEditFormSubmit);
popupEditProfile.setEventListeners();
const popupAddCard = new PopupWithForm('.popup-add-card', handleAddFormSubmit);
popupAddCard.setEventListeners();

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-24',
    headers: {
        authorization: '4f373d74-bd3f-4a56-8098-6fb64502e0a9',
        'Content-Type': 'application/json'
    }
});
// profileName.textContent = api.getUserInfo().name;
api.getUserInfo()
.then((result) =>{
    userInfo.setUserInfo({ nameInput: result.name, jobInput: result.about });
    console.log(result)
    console.log(result.avatar)
    document.querySelector('.profile__photo').src = result.avatar;
})
.catch ((err) => {
    console.log(err); // выведем ошибку в консоль
});



// console.log(api.getUserInfo());
// console.log(api.getUserInfo().name);
// userInfo.setUserInfo({ nameInput: api.getUserInfo().name, jobInput: jobInput });


api.getCards()
    .then((result) => {
        console.log(result);
        const cardList = new Section({
            items: result,
            renderer: (item) => {
                const cards = new Card(item, '.card-template', openPhoto);
                const cardElement = cards.createCard();
                cardList.addAnotherItem(cardElement);
            },
        },
            '.cards'
        );
        cardList.renderItems();
    })
  .catch ((err) => {
            console.log(err); // выведем ошибку в консоль
        });
// console.log(api)
// console.log(api.getCards());




// валидация форм
const formAdding = new FormValidation(validationConfig, validationConfig.formAddSelector);
formAdding.enableValidation();
const formEditing = new FormValidation(validationConfig, validationConfig.formEditSelector);
formEditing.enableValidation();



// функция добавления карточки через форму
function handleAddFormSubmit() {
    btnAddition.classList.add(validationConfig.inactiveButtonClass);
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
function handleEditFormSubmit() {
    userInfo.setUserInfo({ nameInput: api.getUserInfo().name, jobInput: jobInput });
};

// функция очистки сообщения об ошибке и стиля инпута после закрытия без сабмита
function clearErrorData(element) {
    const inputListform = element.querySelectorAll(validationConfig.inputSelector);
    inputListform.forEach((item) => {
        const errorElement = element.querySelector(`.${item.id}-error`);
        errorElement.textContent = '';
        item.classList.remove(validationConfig.inputErrorClass);
    })
}
// редактирование профиля
btnOpenEditPopup.addEventListener('click', function () {

    popupEditProfile.open();
    nameInput.value = userInfo.getUserInfo().name;
    jobInput.value = userInfo.getUserInfo().userInfo;
    clearErrorData(popupEditForm);
});
// добавление новой карточки
btnAdd.addEventListener('click', function () {
    submitterOfAdd.reset();
    clearErrorData(popupAddForm);

    popupAddCard.open();
});
