import FormValidator from './FormValidator.js';
import Card from './Card.js';
//shared elements btwn card.js and index.js
import {
  openModal,
  closeModal,
  initialCards,
  config,
  imageModal,
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

//createCard is the equivalent of the public method generateCard
//need to fix this in order to generate the new card on submit
const addNewCardHandler = () => { //creates new card on submit, use the new keyword replacing the deleted createCard function
  const newCardElement = new Card({name: newCardName.value, link: newCardImageLink.value}, '.card-template').generateCard();

  gallery.prepend(newCardElement);
  closeModal(newCardModal); //exits create card modal on submitting
}

//this function inserts in the DOM the newCard's image using the values from the image handler
const insertImage = (data) => {
  const card = new Card(data, '.card-template'); //here we are making sure to insert the new card instance
  //gallery.prepend(createCard(data)); we dont need this anymore
  gallery.prepend(card.generateCard()); //add new card instance using generateCard public method from Card class.
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