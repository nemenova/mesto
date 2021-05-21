
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

    setUserInfo({ nameInput, jobInput }) {
        this._userName.textContent = nameInput.value;
        this._userInfo.textContent = jobInput.value;
    }
}