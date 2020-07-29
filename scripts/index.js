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
})