import { nameInput, jobInput} from '../utils/constants.js'

export default class Api {
    constructor(options) {
        this._address = options.baseUrl;
        this._token = options.headers;
    }

    getCards() {
        return fetch(`${this._address}/cards`, {
            headers: this._token
        })
          
            .then(result => result.ok ? result.json() : Promise.reject(`${result.status}`))
            // .then(result => console.log(result))
    }
    getUserInfo() {
        return fetch(`${this._address}/users/me`, {
            headers: this._token,
        
        })
            .then(result => result.ok ? result.json() : Promise.reject(`${result.status}`))
        // .then(result => console.log(result))
        //     .then((result) => {
        //     const fuck = result;
        // })
    }
    changeUserInfo() {
        return fetch(`${this._address}/users/me`,  {
            method: 'PATCH',
            headers: this._token,
            
            body: JSON.stringify({
                name: nameInput.value,
                about: jobInput.value
            })
                
        }) .then(result => result.ok ? result.json() : Promise.reject(`${result.status}`))
    }
    // changeUserInfo(name, job) {
    //     return fetch(`${this._address}/users/me`, {
    //         method: 'PATCH',
    //         headers: this._token,

    //         body: JSON.stringify({
    //             name: name,
    //             about: job
    //         })

    //     }).then(result => result.ok ? result.json() : Promise.reject(`${result.status}`))
    // }
    
}