
export default class UserInfo {
    constructor({ userName, userInfo }) {
        this._userName = userName;
        this._userInfo = userInfo;
    }

    getUserInfo() {
        const values = {
            name: this._userName.textContent,
            userInfo: this._userInfo.textContent
        };
       
        return values;
    }

    setUserInfo() {
        this._userName.textContent = document.querySelector('.form__item_el_name').value;
        this._userInfo.textContent = document.querySelector('.form__item_el_about').value;
    }
}