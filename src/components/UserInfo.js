export default class UserInfo {
    constructor({ name, title }){
        this._name = name;
        this._title = title;
        this._displayName = document.querySelector(".profile__name");
        this._displayDescription = document.querySelector(".profile__description");
    }

    getUserInfo(){
        return {
            name: this._name,
            title: this._title
        };
    }

    setUserInfo(data) {
        this._displayName.textContent = this._name;
        this._displayDescription.textContent = this._title;
    }
};
