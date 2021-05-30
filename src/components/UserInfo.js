
export default class UserInfo {
    constructor({ userName, userInfo, avatar }) {
        this._userName = userName;
        this._userInfo = userInfo;
        this._userPhoto = avatar;
    }
    getUserInfo() {
        const values = {
            name: this._userName.textContent,
            userInfo: this._userInfo.textContent,
            // id: this._id
        };
       
        return values;
    }
    setUserInfo({nameInput, jobInput, myId}) {
        this._userName.textContent = nameInput;
        this._userInfo.textContent = jobInput;
        this._id = myId;

    }
    setUserPhoto(avatar){
        this._userPhoto.src = avatar;
    }
    getId() {
        return this._id;
    }
}