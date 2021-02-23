import FormValidator from './FormValidator.js';
import Card from './Card.js';
//shared elements btwn card.js and index.js
import {
  openModal,
  closeModal,
  escKeyClose,
  initialCards,
  config,
} from "./utils.js";

//modals used for the form validation variables below
const profileModal = document.querySelector(".modal_open_edit");
const newCardModal = document.querySelector(".modal_open_new-card"); 

//find the form instance inside the modals above
const editProfileForm = profileModal.querySelector(".form_profile");//profileModal = profileForm
const addCardForm = newCardModal.querySelector(".form_new-card");//newCardModal = cardForm

//the second parameter is the instance of the form we want
const editFormValiator = new FormValidator(config,editProfileForm);
const addFormValidator = new FormValidator(config, addCardForm);

//after finding the corresponding form instances, we call enableValidation method
editFormValiator.enableValidation();
addFormValidator.enableValidation();

//Modals
const imageModal = document.querySelector(".modal_open-image");
//elements used when opening image modal
const modalImage = document.querySelector(".modal__image");
const modalCaption = document.querySelector(".modal__caption");

//Buttons
const editProfileButton = document.querySelector(".button_edit");
const closeFormButton = document.querySelector(".modal__close-button");
const addCardButton = document.querySelector(".button_add");
const closeAddCardButton = document.querySelector(".modal__close-button_new-card");
const closeImageModalButton = document.querySelector(".modal__close-button_image-modal");
const createCardButton = document.querySelector(".form__button_create-card");

//Form variables
const form = document.querySelector(".form");
//Form Profile
const profileForm = document.querySelector(".form_profile");
//Form Inputs to edit Profile 
const formName = form.querySelector(".form__input_type_name");
const formDescription = form.querySelector(".form__input_type_description");
//Form New Card
const cardForm = document.querySelector(".form_new-card");
//Form Inputs to create New Card
const newCardName = document.querySelector(".form__input_type_card-title");
const newCardImageLink = document.querySelector(".form__input_type_url");

//Profile Section 
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

//Card Template Section used variables
const cardTemplate = document.querySelector(".card-template").content.querySelector(".cards__gallery-item");
//gallery will select the element in the DOM where we want to place the dynamic data.
const gallery = document.querySelector(".cards__gallery");

//close modal when clicking overlay
const closeModalOverlay = () => {
  const allOpenModals = Array.from(document.querySelectorAll(".modal"));
  allOpenModals.forEach((openModal) => {
    openModal.addEventListener('click', (evt) => {
      if(evt.target.classList.contains('modal_open')) {
        closeModal(evt.target);
      }
    });
  });
};

closeModalOverlay();

//Refresh information in profile section
function getUpdatedInfo() {
  formName.value = profileName.textContent;
  formDescription.value = profileDescription.textContent;
}

function createCard(data){
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".cards__image");
  const cardTitle = cardElement.querySelector(".cards__text");
  const cardLikeButton = cardElement.querySelector(".cards__button_like_inactive");
  const cardDeleteButton = cardElement.querySelector(".cards__button_delete");

  //dynamic data that renders image and name of card
  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;
  
  cardLikeButton.addEventListener('click', likeCard); 

  cardDeleteButton.addEventListener('click', () => {
      deleteCard(cardElement);
    });

  //open image modal when clicking on the image
  cardImage.addEventListener('click', () => modalImageHandler(data));

  return cardElement;
}

//for createCard object, we take the name and link from the initial cards object list and we refer to the values so they are retrieved from the inputs

const addNewCardHandler = () => { //creates new card on submit
  const newCardElement = createCard({name: newCardName.value, link: newCardImageLink.value});
  gallery.prepend(newCardElement);
  closeModal(newCardModal); //exits create card modal on submitting
}

//modalImageHandler //shows the dynamic data when opening the modal image
const modalImageHandler = (data) => {
  modalImage.src = data.link;
  modalCaption.textContent = data.name;
  modalImage.alt = data.name;
  openModal(imageModal);
}

//this function inserts in the DOM the newCard's image using the values from the image handler
const insertImage = (data) => {
  const card = new Card(data, '.card-template'); //here we are making sure to insert the new card instance
  //gallery.prepend(createCard(data)); we dont need this anymore
  gallery.prepend(card.generateCard()); //add to the gallery the instance of generateCard public method.
}

//Delete card
const deleteCard = (cardElement)=> {
  gallery.removeChild(cardElement);
}

//Like card
const likeCard = (cardElement) => {
  cardElement.target.classList.toggle("cards__button_like_active");
}

//Form Edit Profile 
profileForm.addEventListener('submit', (evt)=> {
  evt.preventDefault();
  profileName.textContent = formName.value;
  profileDescription.textContent = formDescription.value;
  closeModal(profileModal);
});

//Form Add new card
cardForm.addEventListener('submit', (evt)=>{
  evt.preventDefault();
  addNewCardHandler();
  cardForm.reset();
  createCardButton.disabled = true;
  createCardButton.classList.add(config.inactiveButtonClass);
})

//Buttons functionality 

//profile modal open & refresh profile info using arrow function
editProfileButton.addEventListener('click', () => {
  openModal(profileModal);
  getUpdatedInfo()
});

//profile modal close
closeFormButton.addEventListener('click', ()=> closeModal(profileModal));

//open add card modal
addCardButton.addEventListener('click', ()=> openModal(newCardModal));

//close add card modal
closeAddCardButton.addEventListener('click', ()=> closeModal(newCardModal));

//when clicking on "create" button, close the add card modal
createCardButton.addEventListener('click', ()=> openModal(newCardModal));

//close Image modal button
closeImageModalButton.addEventListener('click', ()=> closeModal(imageModal));

//this function calls the insertImage for every object in the list (render cards)
initialCards.forEach((data) => {
  insertImage(data);
});