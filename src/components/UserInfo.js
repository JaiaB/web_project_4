export default class UserInfo {
    constructor( { userName, userDescription } ){
        this._userName = userName;
        this._userDescription = userDescription;
    }
    getUserInfo(){
        const userName = this._userName.textContent;
        const aboutUser = this._userDescription.textContent;
        return{name: userName, description: aboutUser}
    }
    setUserInfo(data){
        this._userName.textContent = data.name;
        this._userDescription.textContent = data.description;
    }
}