//Modals
const modal = document.querySelector ('.modal');
const form = document.querySelector ('.form');

//Buttons
const editProfileButton = document.querySelector('.button_edit');
const closeFormButton = document.querySelector('.modal__close-button');

//Profile section info change
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

//Form Inputs
const formName = document.querySelector('.form__input_type_name');
const formDescription = document.querySelector('.form__input_type_description');

//Open modal to edit profile section
function toggleModal () {
  modal.classList.toggle('modal__open');
}

editProfileButton.addEventListener('click', toggleModal)
closeFormButton.addEventListener('click', toggleModal)

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
const gallery = document.querySelector(".cards__gallery");

initialCards.forEach(data => {
const cardElement = cardTemplate.cloneNode(true);
const cardImage = cardElement.querySelector(".cards__image");
const cardTitle = cardElement.querySelector(".cards__text");
const cardLikeButton = cardElement.querySelector(".cards__button_like_inactive");
const cardDeleteButton = cardElement.querySelector(".cards__button_delete");
cardTitle.textContent = data.name;
cardImage.src = data.link;

//*cardImage.style.backgroundImage=`url(${data.link})`;

cardLikeButton.addEventListener('click', (event)=> {
  event.target.classList.toggle('cards__button_like_active');
});

cardDeleteButton.addEventListener('click', () => {
  //handlerCardDeleteClick()
});

cardImage.addEventListener('click', ()=> {
  //open modal
});

gallery.prepend(cardElement); 
});