import Card from '../components/Card.js';
import FormValidation from '../components/FormValidator.js';
import './index.css';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupDeletion from '../components/PopupDeletion.js'
import UserInfo from '../components/UserInfo.js';
import {avatar, avatarEditBtn, btnAdd, btnOpenEditPopup, nameInput, jobInput, profileName,
    profileJob, validationConfig} from '../utils/constants.js'
import Api from '../components/Api.js'

const popupWithImage = new PopupWithImage('.popup-photo');
popupWithImage.setEventListeners();
const userInfo = new UserInfo({ userName: profileName, userInfo: profileJob, avatar: avatar })
const popupEditProfile = new PopupWithForm('.popup-edit', handleEditFormSubmit);
popupEditProfile.setEventListeners();
const popupAddCard = new PopupWithForm('.popup-add-card', handleAddFormSubmit);
popupAddCard.setEventListeners();
const popupChangeAvatar = new PopupWithForm('.popup-change-photo', handleAvatarSubmit);
popupChangeAvatar.setEventListeners();
const popupDeletion = new PopupDeletion('.popup-card-delete');
popupDeletion.setEventListeners();
const cardList = new Section((item) => {
    cardList.addItem(createCard(item))
}, '.cards');

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-24',
    headers: {
        authorization: '4f373d74-bd3f-4a56-8098-6fb64502e0a9',
        'Content-Type': 'application/json'
    }
});

Promise.all([api.getUserInfo(), api.getCards()])
    .then(([user, cards]) => {
        userInfo.setUserInfo({ nameInput: user.name, jobInput: user.about, myId: user._id });
        userInfo.setUserPhoto(user.avatar)
        cardList.renderItems(cards);
    })
    .catch((err) => {
        console.log(err); // выведем ошибку в консоль
    });

function createCard(data) {
    const myId = userInfo.getId();
    const card = new Card(data, '.card-template', 
        () => {
            popupWithImage.open(data.link, data.name);
        }, myId, 
        () => {
        popupDeletion.open(() => {
            api.deleteCard(card.getId())
                .then(() => {
                    card.deleteCard();
                    popupDeletion.close();
                })
                .catch((err) => {
                    console.log(err); // выведем ошибку в консоль
                })
        })
    },
        () => {
            api.like(card.getId()) // функция лайка
                .then((res) => {
                    card.likeCard();
                    card.renewLikes(res);
                })
                .catch((err) => {
                    console.log(err); // выведем ошибку в консоль
                })
        }, () => {
            api.dislike(card.getId()) // снятие лайка
                .then((res) => {
                    card.dislikeCard();
                    card.renewLikes(res);
                })
                .catch((err) => {
                    console.log(err); // выведем ошибку в консоль
                });
        });
    return card.createCard();
}
// валидация форм
const formAdding = new FormValidation(validationConfig, validationConfig.formAddSelector);
formAdding.enableValidation();
const formEditing = new FormValidation(validationConfig, validationConfig.formEditSelector);
formEditing.enableValidation();
const formAvatar = new FormValidation(validationConfig, validationConfig.formAvatarSelector);
formAvatar.enableValidation();

// функция добавления карточки через форму
function handleAddFormSubmit() {
    popupAddCard.renderLoading(true);
    api.addNewCard()
        .then((result) => {
            cardList.addAnotherItem(createCard(result));
        })
        .then(() => {
            popupAddCard.close();
        })
        .catch((err) => {
            console.log(err); // выведем ошибку в консоль
        })
        .finally(() => {
            popupAddCard.renderLoading(false);
        })
};

// функция редактирования профиля
function handleEditFormSubmit() {
    popupEditProfile.renderLoading(true);
    api.changeUserInfo()
        .then((result) => {
            userInfo.setUserInfo({ nameInput: result.name, jobInput: result.about });
            popupEditProfile.close();
        })
        .catch((err) => {
            console.log(err); // выведем ошибку в консоль
        })
        .finally(() => {
            popupEditProfile.renderLoading(false);
        })
};
// замена аватара
function handleAvatarSubmit() {
    popupChangeAvatar.renderLoading(true);
    api.changeProfilePhoto()
        .then((result) => {
            userInfo.setUserPhoto(result.avatar);
            popupChangeAvatar.close();
        })
        .catch((err) => {
            console.log(err); // выведем ошибку в консоль
        })
        .finally(() => {
            popupChangeAvatar.renderLoading(false);
        })
};
// редактирование профиля
btnOpenEditPopup.addEventListener('click', function () {
    popupEditProfile.open();
    nameInput.value = userInfo.getUserInfo().name;
    jobInput.value = userInfo.getUserInfo().userInfo;
});
// добавление новой карточки
btnAdd.addEventListener('click', function () {
    popupAddCard.open();
});
// открытие попапа для замены аватара
avatarEditBtn.addEventListener('click', function () {
    popupChangeAvatar.open();
});