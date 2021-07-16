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

const initialCards = [ 
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

const config = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input_type_error", //error as user types
  errorClass: "form__error_visible" //span error class
};

export{
  imageModal,
  modalImage,
  modalCaption,
  openModal,
  closeModal,
  escKeyClose,
  initialCards,
  config,
};