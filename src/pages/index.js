import Card from '../components/Card.js';
import FormValidation from '../components/FormValidator.js';
import './index.css';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js'
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupDeletion from '../components/PopupDeletion.js'
import UserInfo from '../components/UserInfo.js';
import { iconCardDelete, cardDeleteSubmitBtn, myId, popupAvatar, submitterOfAvatar, avatar, avatarEditBtn, btnAddition, initialCards, placeInputInfo, placeImage, placeName, submitterOfAdd, popupAddForm, popupEditForm, btnAdd, btnOpenEditPopup, nameInput, jobInput, avatarInput, profileName, profileJob, photoSubtitle, popupPhoto, validationConfig } from '../utils/constants.js'
import Api from '../components/Api.js'



const popupWithImage = new PopupWithImage('.popup-photo');
const userInfo = new UserInfo({ userName: profileName, userInfo: profileJob, avatar: avatar })
const popupEditProfile = new PopupWithForm('.popup-edit', handleEditFormSubmit);
popupEditProfile.setEventListeners();
const popupAddCard = new PopupWithForm('.popup-add-card', handleAddFormSubmit);
popupAddCard.setEventListeners();
const popupChangeAvatar = new PopupWithForm('.popup-change-photo', handleAvatarSubmit);
popupChangeAvatar.setEventListeners();
const popupDeletion = new PopupDeletion('.popup-card-delete');
// popupDeletion.setEventListeners();

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-24',
    headers: {
        authorization: '4f373d74-bd3f-4a56-8098-6fb64502e0a9',
        'Content-Type': 'application/json'
    }
});
api.getUserInfo()
    .then((result) => {
        userInfo.setUserInfo({ nameInput: result.name, jobInput: result.about });
        document.querySelector('.profile__photo').src = result.avatar;
    })
    .catch((err) => {
        console.log(err); // выведем ошибку в консоль
    });








api.getCards()
    .then((result) => {
        const cardList = new Section({
            items: result,
            renderer: (item) => {
                const cards = new Card(item, '.card-template', openPhoto, myId, () => {
                    popupDeletion.open()
                }, () => {
                    api.like(cards.getId())
                        .then((res) => {
            console.log(res);
                            cards.likeCard();
                            cards.renewLikes(res);
                        })
                        .catch((err) => {
                            console.log(err); // выведем ошибку в консоль
                        })
                }, () => {
                    api.dislike(cards.getId())
                        .then((res) => {
                            cards.dislikeCard();
                            cards.renewLikes(res);
                        })
                        .catch((err) => {
                            console.log(err); // выведем ошибку в консоль
                        });
                });

                const cardElement = cards.createCard();
                cardList.addAnotherItem(cardElement);

                if (item.owner._id === myId) {
                    popupDeletion.setEventListeners(() => {
                        console.log('start')
                        api.deleteCard(cards.getId())
                            .then(() => {
                                cards.deleteCard();
                                console.log('mid')
                                // popupDeletion.close();
                            })
                            .catch((err) => {
                                console.log(err); // выведем ошибку в консоль
                            })
                    });
                }
            }
        }, '.cards');
        cardList.renderItems();
    })
    .catch((err) => {
        console.log(err); // выведем ошибку в консоль
    });

// валидация форм
const formAdding = new FormValidation(validationConfig, validationConfig.formAddSelector);
formAdding.enableValidation();
const formEditing = new FormValidation(validationConfig, validationConfig.formEditSelector);
formEditing.enableValidation();
const formAvatar = new FormValidation(validationConfig, validationConfig.formAvatarSelector);
formAvatar.enableValidation();

// функция добавления карточки через форму
function handleAddFormSubmit() {
    btnAddition.classList.add(validationConfig.inactiveButtonClass);
    btnAddition.setAttribute('disabled', 'true');
    loading(true);
    api.addNewCard()
        .then((result) => {
            const cardList = document.querySelector('.cards')
            const card = new Card(result, '.card-template', openPhoto, myId, () => {
                popupDeletion.open()
            }, () => {
                    api.like(card.getId())
                        .then((res) => {
                            card.likeCard();
                            card.renewLikes(res);
                        })
                        .catch((err) => {
                            console.log(err); // выведем ошибку в консоль
                        })
            }, () =>{
                    api.dislike(card.getId())
                        .then((result) => {
                            card.dislikeCard();
                            card.renewLikes(result);
                        })
                        .catch((err) => {
                            console.log(err); // выведем ошибку в консоль
                        });
            })
            popupDeletion.setEventListeners(() => {
                api.deleteCard(card.getId())
                    .then(() => {
                        card.deleteCard();
                        // popupDeletion.close();
                    })
                    .catch((err) => {
                        console.log(err); // выведем ошибку в консоль
                    })
            });
            const newPlace = card.createCard();

            cardList.prepend(newPlace);
        })
        .catch((err) => {
            console.log(err); // выведем ошибку в консоль
        })
        .finally(() => {
            loading(false);
        })
};

// функция поп-апа с картинкой
function openPhoto(image, title) {
    popupWithImage.open(image, title);
    popupPhoto.src = image;
    photoSubtitle.textContent = title;
    popupWithImage.setEventListeners();
};
function loading(status) {
    (status) ? document.querySelector('.popup__submit-btn').textContent = "Сохранение..." : document.querySelector('.popup__submit-btn').textContent = "Сохранить";

}

// функция редактирования профиля
function handleEditFormSubmit() {
    loading(true);
    api.changeUserInfo()
        .then((result) => {
            userInfo.setUserInfo({ nameInput: result.name, jobInput: result.about });
        })
        .catch((err) => {
            console.log(err); // выведем ошибку в консоль
        })
        .finally(() => {
            loading(false);
        })
};

function handleAvatarSubmit() {
    loading(true);
    api.changeProfilePhoto()
        .then((result) => {
            userInfo.setUserPhoto(result.avatar);
        })
        .catch((err) => {
            console.log(err); // выведем ошибку в консоль
        })
        .finally(() => {
            loading(false);
        })
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

avatarEditBtn.addEventListener('click', function () {
    submitterOfAvatar.reset();
    clearErrorData(popupAvatar);
    popupChangeAvatar.open();
});