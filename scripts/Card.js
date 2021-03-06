//shared elements btwn card.js and index.js 
import {
  openModal,
  imageModal,
  modalImage,
  modalCaption,
} from "./utils.js";
  
  class Card {
    constructor(data, templateSelector) {
      this._link = data.link; //image data
      this._name = data.name; //name data
      this._templateSelector = templateSelector; //the template element (not the instance)
    }
  
    _getCardTemplate(){
      const cardTemplate = document.querySelector(this._templateSelector).content.querySelector(".cards__gallery-item"); //we need to place this variable here in order to find the elements below in the generate card. 
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
  
    _modalImageHandler(){//shows the dynamic data when opening the modal image
      modalImage.src = this._link;
      modalCaption.textContent = this._name;
      modalImage.alt = this._name;
      openModal(imageModal);
    }
  
    _setEventListeners(){  
      const cardImage = this._cardElement.querySelector(".cards__image");
      const cardLikeButton = this._cardElement.querySelector(".cards__button_like_inactive");
      const cardDeleteButton = this._cardElement.querySelector(".cards__button_delete");
  
      cardLikeButton.addEventListener('click', this._likeCard); 
      
      cardDeleteButton.addEventListener('click', () => {
        this._deleteCard(this._cardElement);
      });
      //handler to open image modal when clicking on the image.
      cardImage.addEventListener('click', () => this._modalImageHandler());
  
    }
  
    generateCard(){ //is the same as createCard
      //we can store this._cardElement here instead of the constructor
      this._cardElement = this._getCardTemplate().cloneNode(true);
  
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
  
  export default Card;