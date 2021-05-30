
export default class UserInfo {
    constructor({ userName, userInfo, avatar }) {
        this._userName = userName;
        this._userInfo = userInfo;
        this._userPhoto = avatar;
    }
    getUserInfo() {
        const values = {
            name: this._userName.textContent,
            userInfo: this._userInfo.textContent
        };
       
        return values;
    }
    setUserInfo({nameInput, jobInput}) {
        this._userName.textContent = nameInput;
        this._userInfo.textContent = jobInput;
    }

    setUserPhoto(avatar){
        this._userPhoto.src = avatar;
    }
    getUserId(me){
        this._myId = me;
        const myId = {
            id: this._myId
        };
        return myId;
    }

}