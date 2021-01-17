//show input error message 
function showError(config, errorMessage, input){
  const error = document.querySelector(`#${input.id}-error`)
  error.textContent = errorMessage;
  //console.log('errorMessage', errorMessage)
  input.classList.add(config.inputErrorClass); //when error is active
  error.classList.add(config.errorClass);
}

//hide input error message
function hideError(config, input){
  const error = document.querySelector(`#${input.id}-error`)
  error.textContent = "";
  input.classList.remove(config.inputErrorClass); //when error is active
  error.classList.remove(config.errorClass);
}

//check input validity
function checkInputValidity(config, input){
  if(input.validity.valid){
    //console.log("valid")
    hideError(config, input)
  }else{
    //console.log("not valid")
    showError(config, input.validationMessage, input)
  }
}

function toggleButtonState(button, config, inputs){
  const isValid = inputs.every(input => input.validity.valid)
  if(isValid){
    button.disabled = false;
    button.classList.remove(config.inactiveButtonClass)
  }else{
    button.disabled = true;
    button.classList.add(config.inactiveButtonClass)
  }
}

//global enable validation
function enableValidation(config) {
  const allForms = [...document.querySelectorAll(config.formSelector)];

  allForms.forEach (form => {
    form.addEventListener("submit", (evt) => {
      evt.preventDefalult()
    });

    const inputs = [...form.querySelectorAll(config.inputSelector)];
    const button = form.querySelectorAll(config.submitButtonSelector);

    inputs.forEach(input => {
        input.addEventListener("input", () =>{
        checkInputValidity(config, input)
        toggleButtonState(button, config, inputs)
      })
    })
  })
}

enableValidation({
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: ".form__button_disabled",
  //need to make these two other classes
  inputErrorClass: "form__input_type_error", //this is the class that should be added to input which is not valid at the moment
  errorClass: "form__error_visible" //span error class
});