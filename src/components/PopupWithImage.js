import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector); // run the parent's constructor and pass in popupSelector
        // this._popupSelector is now accessible in this class
    }

    open(imageLink, imageName) {
        this._popupSelector.querySelector(".popup__image").src = imageLink; // set the image
        this._popupSelector.querySelector(".popup__image-caption").textContent = imageName; // set the caption
        super.open();
    }
}