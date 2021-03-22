import { openPopup, closePopup } from "./SharedFunctions.js";

export class Card {
    constructor(text, link, cardSelector) {
        this._cardText = text;
        this._cardLink = link;
        this._cardSelector = cardSelector;
    }
    
    // private methods
    //----------------

    _getTemplate () {
        const cardElement = this._cardSelector
            .cloneNode(true);
        return cardElement; // finished blank card
    }

    // event handlers

    _handleHeartClick(e) {
        e.target.classList.toggle('card__social-symbol_liked')
    }

    _handleDeleteButtonClick(e) {
        e.target.parentElement.remove();
    }

    // _handleBackgroundImageClick(e) { // not necessary?? 
    //     // use openImagePopup(e) here after figuring out how to build in openImagePopup
    // }

    _openImagePopup() {
        const imagePopup = document.querySelector(".popup_type_image");
        const imagePopupImage = document.querySelector(".popup__image");
        const imagePopupCaption = document.querySelector(".popup__image-caption");

        imagePopupImage.src = this._cardLink;
        imagePopupCaption.textContent = this._cardText;
        openPopup(imagePopup);
    }



    _setEventListeners() {
        // will use arrow methods because they'll be using 'this'
        const cardDeleteButton = this._cardElement.querySelector('.card__delete-button');
        const cardHeartIcon = this._cardElement.querySelector('.card__social-symbol');
        const cardBackgroundImage = this._cardElement.querySelector('.card__picture');

        // assign listeners to these
        cardDeleteButton.addEventListener("click", (e) => {
            this._handleDeleteButtonClick(e); // do i need to pass evt in here? assuming yes
        })
        cardHeartIcon.addEventListener("click", (e) => {
            this._handleHeartClick(e);
        })
        cardBackgroundImage.addEventListener("click", () => {
            this._openImagePopup();
        })
    }

    // public methods
    //---------------
    createCard() {
        // makes a card from the data given, called in index.js
        this._cardElement = this._getTemplate();

        const cardImage = this._cardElement.querySelector(".card__picture"); // get the image and fill it
        this._cardElement.querySelector(".card__name").textContent = this._cardText; // add text to card
        cardImage.src = this._cardLink;
        cardImage.alt = this._cardText;
        this._setEventListeners(); 
        // return the finished card at the end of this method
        return this._cardElement;
    }
}
