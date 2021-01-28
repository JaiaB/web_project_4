//Modals
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

//open modal
function openModal(modal){
  modal.classList.add('modal_open');
  //console.log("trying to open modal");
  document.addEventListener("keydown", escKeyClose); //event listener for escKeyClose (close modal using Escape key)
}

//close modal
function closeModal(modal){
  modal.classList.remove('modal_open');
  //console.log("trying to close modal")
  document.removeEventListener("keydown", escKeyClose);
}

//close modal with escape key
const escKeyClose = (evt) => {
  const currentModal = document.querySelector(".modal_open");
   if(evt.key ==="Escape" ) {
    //console.log("hi from escKeyClose");
    closeModal(currentModal);
  }
}

//close modal when clicking overlay
const closeModalOverlay = () => {
  const allOpenModals = Array.from(document.querySelectorAll(".modal"));
  allOpenModals.forEach((openModal) => {
    openModal.addEventListener('click', (evt) => {
      if(evt.target.classList.contains('modal_open')) {
        closeModal(evt.target);
        //console.log("you're trying to close clicking overlay")
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
      //console.log('card was deleted');
    });

  //open image modal when clicking on the image
  cardImage.addEventListener('click', (event) => {
    event.preventDefault()
    modalImage.src = data.link;
    modalCaption.textContent = data.name;
    modalImage.alt = data.name;
    openModal(imageModal);
  });

  return cardElement;
}

//for createCard object, we take the name and link from the initial cards object list and we refer to the values so they are retrieved from the inputs
function addImageHandler(){
  const newCardElement = createCard({name: newCardName.value, link: newCardImageLink.value});
  gallery.prepend(newCardElement);
  closeModal(newCardModal); //exits create card modal on submitting
}

//this function inserts in the DOM the newCard's image using the values from the image handler
function insertImage(data) {
  gallery.prepend(createCard(data));
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
profileForm.addEventListener('submit', (evt)=> {
  evt.preventDefault();
  profileName.textContent = formName.value;
  profileDescription.textContent = formDescription.value;
  closeModal(profileModal);
});

//Form Add new card
cardForm.addEventListener('submit', (evt)=>{
  evt.preventDefault();
  addImageHandler();
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

//this function calls the insertImage for every object in the list
initialCards.forEach((data) => {
  insertImage(data);
});
