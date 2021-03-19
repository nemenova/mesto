

let popup = document.querySelector('.popup');
console.log(popup)

let openPopupBtn = document.querySelector('.open_popup_btn');
console.log(openPopupBtn)

let closePopupBtn = document.querySelector('.popup__close-btn');

let nameInput = document.querySelector('.form__item_el_name');
let jobInput = document.querySelector('.form__item_el_about');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__about');

profileName.textContent = nameInput.getAttribute('value');
profileJob.textContent = jobInput.getAttribute('value');



// console.log(profileName.textContent);
// console.log(profileJob);
// console.log(nameInput.getAttribute('value'));

// nameInput.setAttribute('value', profileName.textContent);
// console.log(nameInput.getAttribute('value'));

// jobInput.setAttribute('value', profileJob.textContent);
// console.log(jobInput.getAttribute('value'));

// Находим форму в DOM
let formElement = document.querySelector('.form')


function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
 
    closePopup();
}

formElement.addEventListener('submit', formSubmitHandler); 










function openPopup (){
    popup.classList.add('popup_opened');
}

function closePopup (){
    popup.classList.remove('popup_opened');
}
openPopupBtn.addEventListener('click', function(event) {
    openPopup ();
});

closePopupBtn.addEventListener('click', function(event){
 closePopup ();
});



