import config from '../utils/constants.js';
export default class Popup{
    constructor(popupSelector){
        this._popupSelector = document.querySelectorAll(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
        this._closeButton = document.querySelector(".modal__close-button");
    }
    open(){
        this._popupSelector.classList.add("modal_open");
        document.addEventListener("keydown", this._handleEscClose);
    }
    close(){
        this._popupSelector.classList.remove("modal_open");
        document.removeEventListener("keydown", this._handleEscClose);
    }
    _handleEscClose(){
        if(evt.key === "Escape"){
            this.close();
        }
    }
    setEventListeners(){
        this._popupSelector.addEventListener('click', (evt) =>{
            if(evt.target.classList.contains ('modal__close-button') || evt.target.classList.contains('modal_open')){
                this.close();
            }
        });
    }
}