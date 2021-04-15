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

const cardTemplate = document.querySelector('.card-template').content;
const cardsList = document.querySelector('.cards');

// функции лайка и удаления карточки
function likeCard(evt) {
    evt.target.classList.toggle('card__like-btn_active');
};

function deleteCard(evt) {
    const extraCard = evt.target.closest('.card');
    extraCard.remove();
};

// функция воспроизведения карточки
function createCard(title, link) {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = card.querySelector('.card__image');
    const cardTitle = card.querySelector('.card__title');
    const likeBtn = card.querySelector('.card__like-btn');
    const deleteBtn = card.querySelector('.card__delete-btn');
    likeBtn.addEventListener('click', likeCard);
    deleteBtn.addEventListener('click', deleteCard);
    cardImage.addEventListener('click', openPhoto);
    cardTitle.textContent = title;
    cardImage.src = link;
    cardImage.alt = title;
    return card;
};

// выведение первых 6 карточек на страницу
initialCards.forEach(function (item) {
    const cards = createCard(item.name, item.link);
    cardsList.append(cards);
});

// функция добавления карточки через форму
const addSubmitter = document.querySelector('.form-place');
const placeName = document.querySelector('.form__item_el_place-name');
const placeImage = document.querySelector('.form__item_el_place-img');

function handleAddFormSubmit(evt) {
    evt.preventDefault();
    const newPlace = createCard(placeName.value, placeImage.value);
    cardsList.prepend(newPlace);
    closePopup(popupAddForm);
}

addSubmitter.addEventListener('submit', handleAddFormSubmit);

const popupEditForm = document.querySelector('.popup-edit');
const popupAddForm = document.querySelector('.popup-add-card');
const popupBigPhoto = document.querySelector('.popup-photo')
const photoSubtitle = document.querySelector('.popup__caption');
const popupPhoto = document.querySelector('.popup__image');
const openEditPopupBtn = document.querySelector('.profile__edit-btn');
const closeEditPopupBtn = document.querySelector('.popup__close-btn');
const closePlacePopupBtn = document.querySelector('.place-btn');
const closePhotoBtn = document.querySelector('.close-photo-btn');
const addBtn = document.querySelector('.profile__add-btn');

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


 function closeByOverlay(evt){
     if (evt.target.classList.contains('popup')){
         closePopup(evt.target);
   }
    
 }
function closeByEsc(evt) {
    if (evt.key === 'Escape') {
        closePopup(document.querySelector('.popup_opened'))
    };

}







// слушатели на кнопки открытия и закрытия поп-апов
openEditPopupBtn.addEventListener('click', function () {
    openPopup(popupEditForm);
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
});

closeEditPopupBtn.addEventListener('click', function () {
    closePopup(popupEditForm);
});

addBtn.addEventListener('click', function () {
    openPopup(popupAddForm);

});

closePlacePopupBtn.addEventListener('click', function () {
    closePopup(popupAddForm);
});

// функция поп-апа с картинкой. передача значений и его закрытие
function openPhoto(evt) {
    openPopup(popupBigPhoto);
    popupPhoto.src = evt.target.src;
    const parent = evt.target.parentNode;
    const cardTitle = parent.querySelector('.card__title');
    photoSubtitle.textContent = cardTitle.textContent;
};

closePhotoBtn.addEventListener('click', function () {
    closePopup(popupBigPhoto);
});

// редактирование профиля
const nameInput = document.querySelector('.form__item_el_name');
const jobInput = document.querySelector('.form__item_el_about');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__about');
const formSubmitter = document.querySelector('.form-profile')

function handleEditFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupEditForm);
};

formSubmitter.addEventListener('submit', handleEditFormSubmit); 
