export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector; // this needs to be the div containing the modal window
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    // private methods:
    //-----------------

    _handleEscClose(e) {
        if (e.key === "Escape") {
            this.close();
        }
    }

    // public methods:
    //-----------------

    setEventListeners() {
        // add a click event to the close button of this popup
        this._closeButton = this._popupSelector.querySelector(".popup__close-button");
        this._closeButton.addEventListener("click", () => {
            this.close() // the 'this' object should be the popup
        })
        // also add the evt listener that watches for a click on the overlay - 
        this._popupSelector.addEventListener("click", (evt) => {
            if (evt.target.classList.contains("popup")) {
                this.close();
            }
        })
    }

    open() {
        this._popupSelector.classList.add("popup_visible");
        document.addEventListener("keyup", this._handleEscClose);
    }

    close() {
        this._popupSelector.classList.remove("popup_visible");
        document.removeEventListener("keyup", this._handleEscClose);
    }
}
