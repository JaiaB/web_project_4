//Modals
const modal = document.querySelector ('.modal');
const form = document.querySelector ('.form');
const newCardModal = document.querySelector('.modal__open_new-card');
const imageModal = document.querySelector('.modal__open-image');


//Buttons
const editProfileButton = document.querySelector('.button_edit');
const closeFormButton = document.querySelector('.modal__close-button');
const addCardButton = document.querySelector('.button_add');
const closeAddCardButton = document.querySelector('.modal__close-button_new-card');
const closeImageModalButton = document.querySelector('.modal__close-button_image-modal');

//Profile section info change
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

//Form Inputs
const formName = document.querySelector('.form__input_type_name');
const formDescription = document.querySelector('.form__input_type_description');

//Smooth transition
function smoothTransition(){
  modal.oncommand.style.opacity = "1";
}

//Open modal 
function toggleModal () {
  modal.classList.toggle('modal__open');
}

//Open new card modal
function toggleAddCard() {
  newCardModal.classList.toggle('modal__open');
}

//Open image modal 
function openImageModal(){
  imageModal.classList.toggle('modal__open');
}

//Buttons functionality
editProfileButton.addEventListener('click', toggleModal)
closeFormButton.addEventListener('click', toggleModal)
addCardButton.addEventListener('click', toggleAddCard)
closeAddCardButton.addEventListener('click', toggleAddCard)
closeImageModalButton.addEventListener('click', openImageModal)


//Refresh information in profile section
function getUpdatedInfo () {
  formName.value = profileName.textContent;
  formDescription.value = profileDescription.textContent;
}

form.addEventListener('submit', function(e) {
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
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
]; 

const cardTemplate = document.querySelector(".card-template").content.querySelector(".cards__gallery-item");
//gallery will select the element in the DOM where we want to place the dynamic data.
const gallery = document.querySelector(".cards__gallery");


initialCards.forEach(data => {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".cards__image");
  const cardTitle = cardElement.querySelector(".cards__text");
  const cardLikeButton = cardElement.querySelector(".cards__button_like_inactive");
  const cardDeleteButton = cardElement.querySelector(".cards__button_delete");

  //elements to work with data
  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  //*cardImage.style.backgroundImage=`url(${data.link})`; if i use a div for the image instead of the img tag
  
  cardLikeButton.addEventListener('click', (event)=> {
    event.target.classList.toggle('cards__button_like_active');
    //console.log(EventSource);
  });

  cardDeleteButton.addEventListener('click', () => {
  //handlerCardDeleteClick()
  });

  cardImage.addEventListener('click', (event)=> {
  //Open image modal
  const modalImage = document.querySelector('.modal__image');
  const modalCaption = document.querySelector('.modal__caption');
   openImageModal();
   event.target.classList.toggle('modal__open-image');
   modalImage.src = data.link;
   modalCaption.textContent = data.name;
  });

  gallery.prepend(cardElement); 
});