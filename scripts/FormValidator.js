class FormValidator {
  constructor(config,formElement) {
    this._config = config; //replaced individual config references
    this._form = formElement; //reference to real form in the document. Not instances
  }

  _showInputError(errorMessage, input) {
    const errorElement = this._form.querySelector(`#${input.id}-error`);
   errorElement.textContent = errorMessage;
   input.classList.add(this._config.inputErrorClass);
   errorElement.classList.add(this._config.errorClass);
  }

  _hideInputError(input) {
    const errorElement = this._form.querySelector(`#${input.id}-error`);
    // remove error message
    input.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = "";
    
  }

  _isValid(input) { //check input validity
  if (input.validity.valid) {
    this._hideInputError(input);
  } else {
    this._showInputError(input.validationMessage, input);
  }
}

  _toggleButtonState(inputList,buttonElement) {
  //tell me if there are invalid input elements
  //switched here as variable instead of private method
  const hasInvalidInput = inputList.some(inputElement => !inputElement.validity.valid);

  if (hasInvalidInput) {
    buttonElement.disabled = true;
    buttonElement.classList.add(this._config.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(this._config.inactiveButtonClass);
  }
}

  _setEventListeners() {
    const inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));

  const buttonElement = this._form.querySelector(this._config.submitButtonSelector);
  
  //on loading check for invalid inputs to disable button
  this._toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      //we call the functions to check for validity and to disable button
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  enableValidation() {
    //replaced formElement with this._
    this._form.addEventListener("submit", evt => evt.preventDefault());

    this._setEventListeners(); //we got rid of args because we are referencing to this._form
  }
}

export default FormValidator;
