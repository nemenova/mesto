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
const placeInputInfo = [];

const submitterOfAdd = document.querySelector('.form-place');
const placeName = document.querySelector('.form__item_el_place-name');
const placeImage = document.querySelector('.form__item_el_place-img');
const popupEditForm = document.querySelector('.popup-edit');
const popupAddForm = document.querySelector('.popup-add-card');
const btnOpenEditPopup = document.querySelector('.profile__edit-btn');
const btnAdd = document.querySelector('.profile__add-btn');
const nameInput = document.querySelector('.form__item_el_name');
const jobInput = document.querySelector('.form__item_el_about');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__about');
const photoSubtitle = document.querySelector('.popup__caption');
const popupPhoto = document.querySelector('.popup__image');
export { initialCards, placeInputInfo, placeImage, placeName, submitterOfAdd, popupAddForm, popupEditForm, btnAdd, btnOpenEditPopup, nameInput,jobInput, profileName, profileJob, photoSubtitle, popupPhoto}