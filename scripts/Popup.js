export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._handleEscClose = this._handleEscClose.bind(this);
    }



    // private methods:
    //-----------------
    _handleEscClose(e) {
        // if (e.key pressed == "escape") {
            // this.close();
        // }
    }

    // public methods:
    //-----------------

    setEventListeners() {
        // add a click event to the close button of this popup
        this._popupSelector.addEventListener("click", )
    }

    open() {
        this._popupSelector.classList.add("popup_visible")

        // add an event listener that makes the esc keyup event trigger _handleEscClose()
        document.addEventListener("keyup", this._handleEscClose);
    }

    close() {
        this._popupSelector.classList.remove("popup_visible")

        // remove the evt listener that ties esc keyup event to _handleEscClose()
        document.removeEventListener("keyup", this._handleEscClose);
    }
}