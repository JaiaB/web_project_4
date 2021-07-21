import Popup from './Popup.js';

export default class PopupWithForm extends Popup{
    constructor( popupSelector, { handlerFormSubmit } ) {
        super(popupSelector);
        this._formElement = this._popupSelector.querySelector(".form");
        this._formHandler = handlerFormSubmit;
    }
    close(){
        this._formElement.reset();
        super.close();
    }
    setEventListeners(){
        this._formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._formHandler(this._getInputValues());
            this.close();            
        });
        super.setEventListeners();
    }
    _getInputValues(){
        const inputsArray = Array.from(this._formElement.querySelectorAll(".form__input"));
        this._inputValues = {};
        inputsArray.forEach((input) => {this._inputValues[input.name] = input.value});
        return this._inputValues;
    }
}