import { openModal, imageModal, modalImage, modalCaption} from "../utils/constants.js";

export default class Card {
    constructor(data, templateSelector, handleCardClick){
        this._link = data.link;
        this._name = data.name;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate(){
        const cardTemplate = document
        .querySelector(this._templateSelector)
        .content
        .querySelector(".cards__gallery-item")
        .cloneNode(true);
        
        return cardTemplate;
    }

    
}

