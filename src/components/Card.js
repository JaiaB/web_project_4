export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._link = data.link; //image data
    this._name = data.name; //name data
    this._templateSelector = templateSelector; //the template element (not the instance)
    this._handleCardClick = handleCardClick;
  }
  
  _getCardTemplate(){
    const cardTemplate = document.querySelector(this._templateSelector).content.querySelector(".cards__gallery-item").cloneNode(true);

    return cardTemplate;
  }
  
  _likeCard(evt) { 
    evt.target.classList.toggle("cards__button_like_active");
  }
  
  _deleteCard(){
    this._cardElement.remove();
    this._cardElement = null;
  }
  
  _setEventListeners(){  
    this._cardElement.querySelector(".cards__button_like_inactive").addEventListener('click', ()=>{
      this._likeCard
    });

    this._cardElement.querySelector(".cards__button_delete").addEventListener('click', () => {
      this._deleteCard(this._cardElement);
    });

    //handler to render image and name when clicking on the image modal.
    this._cardElement.querySelector(".cards__image").addEventListener('click', () =>{
      this._handleCardClick(this._name, this._link);
    } );
  }
  
  generateCard(){ //is the same as createCard in index
    this._cardElement = this._getCardTemplate();
  
    //now we search the elements inside this._cardElement
    //dynamic data rendering name and image of card
    this._cardElement.querySelector(".cards__image").src = this._link;
    this._cardElement.querySelector(".cards__text").textContent = this._name;
  
    //we have to call the private method of _setEventListeners because its needed for the card to be generated properly. 
    this._setEventListeners();
  
    return this._cardElement;
  }
}