const editProfileButton = document.querySelector('.profile__button_edit');
const closeFormButton = document.querySelector('.popup__close-button');
const popup = document.querySelector ('.popup');
const form = document.querySelector ('.form');
const formName = document.querySelector('.form__input_type_name');
const formDescription = document.querySelector('.form__input_type_description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

function togglePopup () {
  popup.classList.toggle('popup_opened');
}

function getUpdatedInfo () {
  formName.value = profileName.textContent;
  formDescription.value = profileDescription.textContent;
}

editProfileButton.addEventListener('click', togglePopup)
closeFormButton.addEventListener('click', togglePopup)

form.addEventListener('submit', function(e) {
  e.preventDefault();
  profileName.textContent = formName.value;
  profileDescription.textContent = formDescription.value;
  togglePopup()
  getUpdatedInfo()
})

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
  //*this second variable is the one we will use to clone an empty card and the contents
  const cardElement = cardTemplate.cloneNode(true);
  //*now we add the dynamic elements and add the delete button
  const cardImage = cardElement.querySelector(".cards__image");
  const cardTitle = cardElement.querySelector(".cards__text");
  const cardLikeButton = cardElement.querySelector(".cards__button_like");
  const cardDeleteButton = cardElement.querySelector(".cards__button_delete");
  //*over here we start working with the data from the objects
  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  //*cardImage.style.backgroundImage=`url(${data.link})`;
  cardLikeButton.addEventListener('click', () => {
  });
  