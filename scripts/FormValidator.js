class FormValidator{
  constructor(config, form){
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    //reference to the real form in our document. result of document.querySelector. Not an instance of the formElement.
    this._formElement = form;
  }

  _showInputError(inputElement, errorMessage){
    //body
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement){
    //body
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

 //only left inputElement as arg
  _checkInputValidity(inputElement){
    //body
    if(!inputElement.validity.valid){
      this._showInputError(inputElement,  inputElement.validationMessage);
    }else{
      this._hideInputError(inputElement);
    }
  } 

  _hasInvalidInput(inputList){
    //body
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  } 

  _toggleButtonState(inputList, buttonElement){
    //removed variables, access the private method from above
    if(this._hasInvalidInput(inputList)){
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.disabled = true;
    }else{
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  _setEventListeners(){
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);

    this._toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement)=>{
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });

    //switched this event listener here to stay consistent
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
  }

  enableValidation(){
    //calling  the private method above
    this._setEventListeners(); // we got rid of arguments because we are referencing to this._formElement
  }
};

export default FormValidator;
