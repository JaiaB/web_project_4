import {config} from './utils.js';
  
  //show error message and error input class when invalid
  const showInputError = (formElement, inputElement, errorMessage) => {
    //we need to find the error element message inside this function
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.inputErrorClass);
  }

  //hideInputError--
  const hideInputError = (formElement, inputElement) => {
    //we need to find the error element message inside this function
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = "";
  }

  //check input validity, then we can call inside another function and add diff params
  //isValid checks if the fields are valid
  const isValid = (formElement, inputElement) => {
    if(!inputElement.validity.valid){
      showInputError(formElement, inputElement, inputElement.validationMessage);
    }else{
      hideInputError(formElement, inputElement);
    }
  }

  //checks for validity property of the inputs
  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }
  
  //works along isValid to determine whether or not to disable button
  const toggleButtonState = (config, inputList, buttonElement) => {
    if(hasInvalidInput(inputList)){
      buttonElement.classList.add(config.inactiveButtonClass);
      buttonElement.disabled = true;
    }else{
      buttonElement.classList.remove(config.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

//find all inputs inside form, the submit button inside form and we call the event listeners on inputs checking for their validity and submit button state toggle functionality
  const setEventListeners = (config, formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    //on first load will check for invalid inputs in order to disable button
    toggleButtonState(config, inputList, buttonElement); 
    //now we iterate over inputList
    inputList.forEach((input) => {
      input.addEventListener('input', () => {
        //we call isValid and pass the form and element to be checked
        isValid(formElement, input);
        toggleButtonState(config, inputList, buttonElement);
      })
    })
  }
  
  //this function adds  submit event handlers TO ALL FORMS
  const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener("submit", (evt) => {
        evt.preventDefault();
      });
      setEventListeners(config, formElement);
    })
  }
  //now we invoke the function
  enableValidation(config);