export default class Popup{
    constructor(popupSelector){
        this._popupSelector = popupSelector;
        //bind prevents the handler from reaching the global scope and breaking
        this._handleEscClose = this._handleEscClose.bind(this);
    }
    open(){
        this._popupSelector.classList.add("modal_open");
        document.addEventListener("keydown", this._handleEscClose);
    }
    close(){
        this._popupSelector.classList.remove("modal_open");
        document.removeEventListener("keydown", this._handleEscClose);
    }
    _handleEscClose(evt){
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