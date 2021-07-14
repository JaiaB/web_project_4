import Popup from './Popup';

export default class PopupWithImage extends Popup{
    open(link, caption) {
        this._popupSelector.querySelector('.modal__image').style.backgroundImage = `url(${link})`;
        this._popupSelector.querySelector('.modal__caption').textcontent = caption;

        super.open();
    }
};
