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
const addSubmit = document.querySelector('.form__place');
const placeName = document.querySelector('.form__item_el_place-name');
const placeImage = document.querySelector('.form__item_el_place-img');

function addPlace(evt) {
    evt.preventDefault();
    const newPlace = createCard(placeName.value, placeImage.value);
    cardsList.prepend(newPlace);
    closePopup(popupArray[1]);
}

addSubmit.addEventListener('submit', addPlace);

const popup = document.querySelectorAll('.popup');
const popupArray = Array.from(popup); // делаем массив из нод-листа, чтобы обращаться по индексу к нужному окну
const photoSubtitle = document.querySelector('.popup__caption');
const cardTitle = document.querySelector('.card__title');
const cardImage = document.querySelectorAll('.card__image');
const popupPhoto = document.querySelector('.popup__image');
const openPopupBtn = document.querySelector('.profile__edit-btn');
const closePopupBtn = document.querySelector('.popup__close-btn');
const closePlacePopupBtn = document.querySelector('.place-btn');
const closePhotoBtn = document.querySelector('.close-photo-btn')

// функции открытия и закрытия универсальные
function openPopup(element) {
    element.classList.add('popup_opened');
};

function closePopup(element) {
    element.classList.remove('popup_opened');
};

// слушатели на кнопки открытия и закрытия поп-апов
openPopupBtn.addEventListener('click', function (event) {
    openPopup(popupArray[0]);
});

closePopupBtn.addEventListener('click', function (event) {
    closePopup(popupArray[0]);
});

const addBtn = document.querySelector('.profile__add-btn'); // почему-то, если эту переменную выносить ко всем остальным, появляется мелькание поп-апов при загрузке стр

addBtn.addEventListener('click', function (event) {
    openPopup(popupArray[1]);

});

closePlacePopupBtn.addEventListener('click', function (event) {
    closePopup(popupArray[1]);
});

// функция поп-апа с картинкой. передача значений и его закрытие
function openPhoto(evt) {
        openPopup(popupArray[2]);
        popupPhoto.src = evt.target.src;
        const parent = evt.target.parentNode;
        const cardTitle = parent.querySelector('.card__title');
        photoSubtitle.textContent = cardTitle.textContent;
};

closePhotoBtn.addEventListener('click', function (evt) {
    closePopup(popupArray[2]);
});

// редактирование профиля
const nameInput = document.querySelector('.form__item_el_name');
const jobInput = document.querySelector('.form__item_el_about');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__about');
const formSubmitter = document.querySelector('.form__profile')

profileName.textContent = nameInput.getAttribute('value');
profileJob.textContent = jobInput.getAttribute('value');

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupArray[0]);
};

formSubmitter.addEventListener('submit', formSubmitHandler); 