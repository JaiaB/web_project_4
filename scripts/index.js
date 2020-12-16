//body__preload class to stop triggering transitions on page load
window.addEventListener("load", function() {
  const preload=document.querySelector (".preload");
  preload.classList.remove('preload');
});

//Modals
const globalModal = document.querySelector(".modal_open");
const profileModal = document.querySelector(".modal_open_edit");
const newCardModal = document.querySelector(".modal_open_new-card");
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

//Toggle global modal
function toggleModal(globalModal){
  globalModal.classList.toggle('modal');
}

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
      //console.log('card was deleted');
    });

  //open image modal when clicking on the image
  cardImage.addEventListener('click', (event) => {
    event.preventDefault()
    modalImage.src = data.link;
    modalCaption.textContent = data.name;
    modalImage.alt = data.name;
    toggleModal(imageModal);
  });

  return cardElement;
}

//for createCard object, we take the name and link from the initial cards object list and we refer to the values so they are retrieved from the inputs
function addImageHandler(event){
  event.preventDefault();
  const newCardElement = createCard({name: newCardName.value, link: newCardImageLink.value});
  gallery.prepend(newCardElement);
  cardForm.reset();
}

//this function inserts in the DOM the newCard's image using the values from the image handler
function insertImage(data) {
  //event listener for addImageHandler
  createCardButton.addEventListener('click', addImageHandler);
  gallery.prepend(createCard(data));
  toggleModal(newCardModal);
}

//Delete card
function deleteCard(cardElement){
  gallery.removeChild(cardElement);
}

//Like card
function likeCard(cardElement){
  cardElement.target.classList.toggle("cards__button_like_active");
}

//Form Edit Profile 
profileForm.addEventListener('submit', function (e) {
  e.preventDefault();
  profileName.textContent = formName.value;
  profileDescription.textContent = formDescription.value;
  toggleModal(profileModal);
});

//Buttons functionality 

//profile modal open & refresh profile info using arrow function
editProfileButton.addEventListener('click', () => {
  toggleModal(profileModal),  
  getUpdatedInfo()
 }
);

//profile modal close
closeFormButton.addEventListener('click', ()=> toggleModal(profileModal));

//open add card modal
addCardButton.addEventListener('click', ()=> toggleModal(newCardModal));

//close add card modal
closeAddCardButton.addEventListener('click', ()=> toggleModal(newCardModal));

//when clicking on "create" button, close the add card modal
createCardButton.addEventListener('click', ()=> toggleModal(newCardModal));

//close Image modal button
closeImageModalButton.addEventListener('click', ()=> toggleModal(imageModal));

//this function calls the insertImage for every object in the list
initialCards.forEach((data) => {
  insertImage(data);
});
