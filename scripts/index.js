//Modals 
const modal = document.querySelector(".modal"); 
const profileModal = document.querySelector(".modal__open_edit");
const form = document.querySelector(".form"); 
const newCardModal = document.querySelector(".modal__open_new-card"); 
const imageModal = document.querySelector(".modal__open-image"); 
const profileForm = document.querySelector(".form_profile"); 
 
//Buttons 
const editProfileButton = document.querySelector(".button_edit"); 
const closeFormButton = document.querySelector(".modal__close-button"); 
const addCardButton = document.querySelector(".button_add"); 
const closeAddCardButton = document.querySelector(".modal__close-button_new-card"); 
const closeImageModalButton = document.querySelector(".modal__close-button_image-modal"); 
 
//Profile section info change 
const profileName = document.querySelector(".profile__name"); 
const profileDescription = document.querySelector(".profile__description"); 
 
//Form Inputs Profile Edition 
const formName = form.querySelector(".form__input_type_name"); 
const formDescription = form.querySelector(".form__input_type_description"); 
 
//Open modal  
function toggleProfileModal() { 
  profileModal.classList.toggle('modal__open'); 
} 
 
//Open new card modal 
function toggleAddCard() { 
  newCardModal.classList.toggle('modal__open'); 
} 
 
//Open image modal  
function openImageModal() { 
  imageModal.classList.toggle('modal__open'); 
} 
 
//Buttons functionality global scope 
editProfileButton.addEventListener('click', toggleProfileModal) 
editProfileButton.addEventListener('click', getUpdatedInfo)
closeFormButton.addEventListener('click', toggleProfileModal) 
addCardButton.addEventListener('click', toggleAddCard) 
closeAddCardButton.addEventListener('click', toggleAddCard) 
closeImageModalButton.addEventListener('click', openImageModal) 

 
//Refresh information in profile section 
function getUpdatedInfo() { 
  formName.value = profileName.textContent; 
  formDescription.value = profileDescription.textContent; 
} 
 
profileForm.addEventListener('submit', function (e) { 
  e.preventDefault(); 
  profileName.textContent = formName.value; 
  profileDescription.textContent = formDescription.value; 
  toggleModal() 
  getUpdatedInfo() 
}); 
 
//*SPRINT 5 

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
 

//variables for the card form 
const cardForm = document.querySelector(".form_new-card"); 
const createCardButton = document.querySelector(".form__button_create-card") 
//for createCard object, we take the name and link from the initial cards object list and we refer to the values so they are retrieved from the inputs 
function addImageHandler(event){ 
  event.preventDefault(); 
  const newCardElement = createCard({name: newCardName.value, link: newCardImageLink.value }); 
  gallery.prepend(newCardElement); 
  cardForm.reset(); 
  toggleAddCard(); 
  //i had return newCardElement here 
} 

 
//event listener for addImageHandler.  
createCardButton.addEventListener('click', addImageHandler); 
 
//Form Inputs Create New Card 
const newCardName = document.querySelector(".form__input_type_card-title"); 
const newCardImageLink = document.querySelector(".form__input_type_url"); 
//Card template section 
const cardTemplate = document.querySelector(".card-template").content.querySelector(".cards__gallery-item"); 
 
//gallery will select the element in the DOM where we want to place the dynamic data. 
const gallery = document.querySelector(".cards__gallery"); 
 
//elements used when opening image modal 
const modalImage = document.querySelector(".modal__image"); 
const modalCaption = document.querySelector(".modal__caption"); 
 
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
   
  //Like card
  cardLikeButton.addEventListener('click', likeCard);   
  
 //Delete card callback
  cardDeleteButton.addEventListener('click', () => { 
    deleteCard(cardElement); 
    //console.log('card was deleted'); 
  }); 
 
  //open image modal when clicking on the image 
  cardImage.addEventListener('click', (event) => { 
    event.preventDefault(); 
    modalImage.src = data.link; 
    modalCaption.textContent = data.name; 
    modalImage.alt = data.name; 
    openImageModal(); 
  }); 
 
  return cardElement; 
} 

//Like card 
function likeCard(cardElement){
  cardElement.target.classList.toggle("cards__button_like_active"); 
}

//Delete card  
function deleteCard(cardElement) { 
  gallery.removeChild(cardElement); 
} 

//this inserts the created card and initial cards into the gallery DOM 
function insertImage(data) { 
  gallery.prepend(createCard(data)); 
} 
 
//this function calls the insertImage for every object in the list 
initialCards.forEach((data) => { 
  insertImage(data); 
});
