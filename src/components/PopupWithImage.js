import Popup from './Popup.js';

export default class PopupWithImage extends Popup{
    constructor(popupSelector){
        super(popupSelector);
        this._popupImage = this._popupSelector.querySelector('.modal__image');
        this._popupCaption = this._popupSelector.querySelector('.modal__caption');
    }

    open(link, caption){
        this._popupImage.src = link;
        this._popupCaption.textContent = caption;
        super.open();
    }
};
