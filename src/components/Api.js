import { nameInput, jobInput, avatarInput, placeName, placeImage} from '../utils/constants.js'

export default class Api {
    constructor(options) {
        this._address = options.baseUrl;
        this._token = options.headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`${res.status}`);
    }
    getCards() {
        return fetch(`${this._address}/cards`, {
            headers: this._token
        })
            .then(this._checkResponse)
    }
    getUserInfo() {
        return fetch(`${this._address}/users/me`, {
            headers: this._token,
        
        })
            .then(this._checkResponse)
    }
    changeUserInfo() {
        return fetch(`${this._address}/users/me`,  {
            method: 'PATCH',
            headers: this._token,
            
            body: JSON.stringify({
                name: nameInput.value,
                about: jobInput.value
            })
                
        }).then(this._checkResponse)
    }
    addNewCard() {
        return fetch(`${this._address}/cards`, {
            method: 'POST',
            headers: this._token,

            body: JSON.stringify({
                name: placeName.value,
                link: placeImage.value
            })

        }).then(this._checkResponse)
    }
    changeProfilePhoto() {
        return fetch(`${this._address}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._token,

            body: JSON.stringify({
                avatar: avatarInput.value
            })

        }).then(this._checkResponse)
    }
    deleteCard(id) {
        return fetch(`${this._address}/cards/${id}`, {
            method: 'DELETE',
            headers: this._token,
            
        }).then(this._checkResponse)
    }
    like(id) {
        return fetch(`${this._address}/cards/likes/${id}`, {
            method: 'PUT',
            headers: this._token,

        }).then(this._checkResponse)
    }
    dislike(id) {
        return fetch(`${this._address}/cards/likes/${id}`, {
            method: 'DELETE',
            headers: this._token,

        }).then(this._checkResponse)
    }
}