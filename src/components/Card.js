export default class Card {
  constructor({data, handleCardClick}, templateSelector) {
    this._link = data.link; //image data
    this._name = data.name; //name data
    this._templateSelector = templateSelector; //the template element (not the instance)
    this._handleCardClick = handleCardClick; //function to open image modal
  }
  
  _getCardTemplate(){
    const cardTemplate = document.querySelector(this._templateSelector)
      .content.querySelector(".cards__gallery-item")
      .cloneNode(true); //we need to place this variable here in order to find the elements below in the generate card. 
      //first we find the template, and then we return it.
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
    this._cardElement.querySelector(".cards__button_like_inactive").addEventListener('click', (evt)=>{
      this._likeCard(evt);
    });

    this._cardElement.querySelector(".cards__button_delete").addEventListener('click', () => {
      this._deleteCard(this._cardElement);
    });

    //handler to render image and name when clicking on the card image.
    this._cardElement.querySelector(".cards__image").addEventListener('click', () =>{
      this._handleCardClick();
    });
  }
  
  generateCard(){ //is the same as createCard
    //we can store this._cardElement here instead of the constructor
    this._cardElement = this._getCardTemplate();
  
    //now we search the elements inside this._cardElement
    const cardImage = this._cardElement.querySelector(".cards__image");
    const cardTitle = this._cardElement.querySelector(".cards__text");
  
    //dynamic data that renders image and name of card
    cardTitle.textContent = this._name;
    cardImage.src = this._link;
    cardImage.alt = this._name;
  
    //we have to call the private method of _setEventListeners because its needed for the card to be generated properly. 
    this._setEventListeners();
  
    return this._cardElement;
  }
}