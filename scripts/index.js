const popup = document.querySelectorAll('.popup');
const popupArray = Array.from(popup);
let openPopupBtn = document.querySelector('.profile__edit-btn');
let closePopupBtn = document.querySelector('.popup__close-btn');
const closePlacePopupBtn = document.querySelector('#place-btn');
let nameInput = document.querySelector('.form__item_el_name');
let jobInput = document.querySelector('.form__item_el_about');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__about');
let formSubmitter = document.querySelector('.form__profile')
profileName.textContent = nameInput.getAttribute('value');
profileJob.textContent = jobInput.getAttribute('value');

const cardTemplate = document.querySelector('#cards').content;
const cardsList = document.querySelector('.cards');

const addBtn = document.querySelector('.profile__add-btn');
const placePopup = document.querySelector('#place');
console.log(placePopup);
const namePopup = document.querySelector('#name');
console.log(namePopup);





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

// создадим из массива дел массив элементов
const cards = initialCards.map(item => {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = card.querySelector('.card__image');
    const cardTitle = card.querySelector('.card__title');

    cardImage.src = item.link;
    cardTitle.textContent = item.name;
    return card;
});

// добавим элементы в DOM, «разложив» массив
cardsList.append(...cards); 






const addSubmit = document.querySelector('.form__place');


const placeName = document.querySelector('.form__item_el_place-name');
const placeImage = document.querySelector('.form__item_el_place-img');

function addPlace(evt) {
    evt.preventDefault();
    const newPlace = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = newPlace.querySelector('.card__image');
    const cardTitle = newPlace.querySelector('.card__title');
    cardTitle.textContent = placeName.value;
    cardImage.src = placeImage.value;
    cardsList.prepend(newPlace);

    closePopup(popupArray[1]);


}
addSubmit.addEventListener('submit', addPlace); 


function openPopup (element){
    element.classList.add('popup_opened');
};
function closePopup (element){
    element.classList.remove('popup_opened');
};
openPopupBtn.addEventListener('click', function(event) {
    openPopup(popupArray[0]);
});
closePopupBtn.addEventListener('click', function(event) {
    closePopup(popupArray[0]);
});

addBtn.addEventListener('click', function (event){
    openPopup(popupArray[1]);
    
});
closePlacePopupBtn.addEventListener('click', function (event) {
    closePopup(popupArray[1]);
});
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    closePopup(popupArray[0]);
};
formSubmitter.addEventListener('submit', formSubmitHandler); 

