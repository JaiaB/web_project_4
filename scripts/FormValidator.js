class FormValidator{
    constructor(config, formElement){
      this._inputSelector = config.inputSelector;
      this._submitButtonSelector = config.submitButtonSelector;
      this._inactiveButtonClass = config.inactiveButtonClass;
      this._inputErrorClass = config.inputErrorClass;
      this._errorClass = config.errorClass;
      //reference to the real form in our document. result of document.querySelector. Not an instance of the formElement.
      this._form = formElement;
    }
  
    _showInputError(inputElement, errorMessage){
      //body
      const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
      inputElement.classList.add(this._inputErrorClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(this._errorClass);
    }
  
    _hideInputError(inputElement){
      //body
      const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
      inputElement.classList.remove(this._inputErrorClass);
      errorElement.classList.remove(this._errorClass);
      errorElement.textContent = "";
    }
  
   //some of the args won't be necessary so we will delete them at some point
    _checkInputValidity(inputElement){
      //body
      const isValid = (formElement, inputElement) => {
        if(!inputElement.validity.valid){
          this._showInputError(inputElement,  inputElement.validationMessage);
        }else{
          this._hideInputError(formElement, inputElement);
        }
      }
    } 
  
    _hasInvalidInput(){
      //body
      const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
      const hasInvalidInput = (inputList) => {
      return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
        })
      }
    } 
  
    _toggleButtonState(){
      //body
      const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
      const buttonElement = this._form.querySelector(this._submitButtonSelector);
      const toggleButtonState = (inputList, buttonElement) => {
        if(hasInvalidInput(inputList)){
          buttonElement.classList.add(this._inactiveButtonClass);
          buttonElement.disabled = true;
        }else{
          buttonElement.classList.remove(this._inactiveButtonClass);
          buttonElement.disabled = false;
        }
      }
    }
  
    _setEventListeners(){
      //body
      const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
      const buttonElement = this._form.querySelector(this._submitButtonSelector);
  
      inputList.forEach((inputElement)=>{
        this._checkInputValidity(this._inputSelector);
        this._toggleButtonState(this._submitButtonSelector);
      });//modified the body, took out the for each iteration
    }
  
    enableValidation(){
      //we replaced formElement with this._
      this._form.addEventListener("submit", (evt) => {
        evt.preventDefault();
      });
      this._setEventListeners(); //we are referencing it from the private method above. we got rid of arguments because we are referencing to this._form
    }
  };
  
  export default FormValidator;
  