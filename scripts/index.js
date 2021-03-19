let popup = document.querySelector('.popup');
let openPopupBtn = document.querySelector('.open-popup-btn');
let closePopupBtn = document.querySelector('.popup__close-btn');
let nameInput = document.querySelector('.form__item_el_name');
let jobInput = document.querySelector('.form__item_el_about');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__about');
let formElement = document.querySelector('.form')
profileName.textContent = nameInput.getAttribute('value');
profileJob.textContent = jobInput.getAttribute('value');

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
 
    closePopup();
};
formElement.addEventListener('submit', formSubmitHandler); 
function openPopup (){
    popup.classList.add('popup_opened');
};
function closePopup (){
    popup.classList.remove('popup_opened');
};
openPopupBtn.addEventListener('click', function(event) {
    openPopup ();
});
closePopupBtn.addEventListener('click', function(event){
 closePopup ();
});



