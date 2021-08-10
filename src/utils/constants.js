//Image modals
const imageModal = document.querySelector(".modal_open-image");
//elements used when opening image modal
const modalImage = document.querySelector(".modal__image");
const modalCaption = document.querySelector(".modal__caption");

function openModal(modal){
  modal.classList.add('modal_open');
  document.addEventListener("keydown", escKeyClose); 
}

function closeModal(modal){
  modal.classList.remove('modal_open');
  document.removeEventListener("keydown", escKeyClose);
}

function escKeyClose(evt){
  const currentModal = document.querySelector(".modal_open");
   if(evt.key ==="Escape" ) {
    closeModal(currentModal);
  }
}

export const initialCards = [ 
  { 
    name: "Yosemite Valley", 
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg" 
  }, 
  { 
    name: "Lake Louise", 
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg" 
  }, 
  { 
    name: "Bald Mountains", 
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg" 
  }, 
  { 
    name: "Latemar", 
    link: "https://code.s3.yandex.net/web-code/latemar.jpg" 
  }, 
  { 
    name: "Vanoise National Park", 
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg" 
  }, 
  { 
    name: "Lago di Braies", 
    link: "https://code.s3.yandex.net/web-code/lago.jpg", 
    alt: "Lago di Braies" 
  } 
]; 

export const config = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input_type_error", //error as user types
  errorClass: "form__error_visible" //span error class
};

//Form variables
const form = document.querySelector(".form");
//modals used for the form validation variables below
const profileModal = document.querySelector(".modal_open_edit");
const newCardModal = document.querySelector(".modal_open_new-card"); 

export const profileConfig = {
  editProfileButton: ".button_edit",
  editProfileForm: profileModal.querySelector(".form_profile"),//profileModal = profileForm
  profileName : ".profile__name",
  profileDescription: ".profile__description",
  //Form Inputs to edit Profile 
  formName : form.querySelector(".form__input_type_name"),
  formDescription : form.querySelector(".form__input_type_description")
};

export const cardConfig = {
  addCardButton: ".button_add",
  addCardForm : newCardModal.querySelector(".form_new-card"),//newCardModal = cardForm
  //Form inputs to create new card
  newCardName: ".form__input_type_card-tile",
  newCardImageLink: ".form__input_type_url",
};
