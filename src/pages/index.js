import Card from '../components/Card.js';
import FormValidation from '../components/FormValidator.js';
import './index.css';


const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];
const placeInputInfo =
{

};

const submitterOfAdd = document.querySelector('.form-place');
const placeName = document.querySelector('.form__item_el_place-name');
const placeImage = document.querySelector('.form__item_el_place-img');
const popupEditForm = document.querySelector('.popup-edit');
const popupAddForm = document.querySelector('.popup-add-card');
const popupBigPhoto = document.querySelector('.popup-photo')
const photoSubtitle = document.querySelector('.popup__caption');
const popupPhoto = document.querySelector('.popup__image');
const btnOpenEditPopup = document.querySelector('.profile__edit-btn');
const btnCloseEditPopup = document.querySelector('.popup__close-btn');
const btnClosePlacePopup = document.querySelector('.place-btn');
const btnClosePhoto = document.querySelector('.close-photo-btn');
const btnAdd = document.querySelector('.profile__add-btn');
const nameInput = document.querySelector('.form__item_el_name');
const jobInput = document.querySelector('.form__item_el_about');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__about');
const submitterOfForm = document.querySelector('.form-profile')

// функции открытия и закрытия универсальные
function openPopup(element) {
    element.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEsc);
    document.addEventListener('click', closeByOverlay);
};

function closePopup(element) {
    element.classList.remove('popup_opened');
    document.removeEventListener('click', closeByOverlay);
    document.removeEventListener('keydown', closeByEsc);
};

function closeByOverlay(evt) {
    if (evt.target.classList.contains('popup')) {
        closePopup(evt.target);
    }
}
function closeByEsc(evt) {
    if (evt.key === 'Escape') {
        closePopup(document.querySelector('.popup_opened'))
    };
}

// функция добавления карточки через форму
function handleAddFormSubmit(evt) {
    evt.preventDefault();
    const btnAddition = document.querySelector('.add-submit-btn');
    btnAddition.classList.add('popup__submit-btn_inactive');
    btnAddition.setAttribute('disabled', 'true');
    placeInputInfo.name = placeName.value;
    placeInputInfo.link = placeImage.value;
    const card = new Card(placeInputInfo, '.card-template', openPhoto)
    const newPlace = card.createCard();
    document.querySelector('.cards').prepend(newPlace);
    closePopup(popupAddForm);
    submitterOfAdd.reset();
}

// функция поп-апа с картинкой
function openPhoto(image, title) {
    openPopup(popupBigPhoto);
    popupPhoto.src = image;
    photoSubtitle.textContent = title;
};

// функция редактирования профиля
function handleEditFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupEditForm);
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

btnOpenEditPopup.addEventListener('click', function () {
    openPopup(popupEditForm);
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    clearErrorData(popupEditForm);
});
btnCloseEditPopup.addEventListener('click', function () {
    closePopup(popupEditForm);
});
btnAdd.addEventListener('click', function () {
    submitterOfAdd.reset();
    clearErrorData(popupAddForm);
    openPopup(popupAddForm);
});
btnClosePlacePopup.addEventListener('click', function () {
    submitterOfAdd.reset();
    closePopup(popupAddForm);
});
btnClosePhoto.addEventListener('click', function () {
    closePopup(popupBigPhoto);
});
submitterOfForm.addEventListener('submit', handleEditFormSubmit);
submitterOfAdd.addEventListener('submit', handleAddFormSubmit);

// выведение первых 6 карточек на страницу
// initialCards.forEach((item) => {
//     const cards = new Card(item, '.card-template', openPhoto);
//     const cardElement = cards.createCard();
//     document.querySelector('.cards').append(cardElement);
// });

// валидируем формы из класса валидации
const form = new FormValidation({
    formSelector: '.form',
    inputSelector: '.form__item',
    submitButtonSelector: '.popup__submit-btn',
    inactiveButtonClass: 'popup__submit-btn_inactive',
    inputErrorClass: 'form__item_type_error',
    errorClass: 'form__item-error_active'
});
form.enableValidation();

const cardList = new Section({
    data: initialCards,
    renderer: () => {

        const cardElement = card.createCard();

        cardList.addItem(cardElement);
    },
},
    cardListSection
);


cardList.renderItems();