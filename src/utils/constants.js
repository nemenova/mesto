const btnAddition = document.querySelector('.add-submit-btn');
const submitterOfAdd = document.querySelector('.form-place');
const popupEditForm = document.querySelector('.popup-edit');
const popupAddForm = document.querySelector('.popup-add-card');
const btnOpenEditPopup = document.querySelector('.profile__edit-btn');
const btnAdd = document.querySelector('.profile__add-btn');
const nameInput = document.querySelector('.form__item_el_name');
const jobInput = document.querySelector('.form__item_el_about');
const submitterOfAvatar = document.querySelector('.form-avatar')
const popupAvatar = document.querySelector('.popup-change-photo')
const avatarEditBtn = document.querySelector('.profile__photo-edit-btn');
const avatar = document.querySelector('.profile__photo');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__about');
const photoSubtitle = document.querySelector('.popup__caption');
const popupPhoto = document.querySelector('.popup__image');
const myId = 'f2d9e460d3134ab20662402a'
const validationConfig = {
    formAddSelector: '.form-place',
    formEditSelector: '.form-profile',
    formAvatarSelector: '.form-avatar',
    formSelector: '.form',
    inputSelector: '.form__item',
    submitButtonSelector: '.popup__submit-btn',
    inactiveButtonClass: 'popup__submit-btn_inactive',
    inputErrorClass: 'form__item_type_error',
    errorClass: 'form__item-error_active'
}
export { myId, popupAvatar, submitterOfAvatar, 
    avatar, avatarEditBtn, btnAddition, submitterOfAdd, 
    popupAddForm, popupEditForm, btnAdd, btnOpenEditPopup, 
    nameInput, jobInput, profileName, profileJob, photoSubtitle, 
    popupPhoto, validationConfig}