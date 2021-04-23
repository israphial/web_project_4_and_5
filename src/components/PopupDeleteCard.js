import Popup from "./Popup.js";

export class PopupDeleteCard extends Popup {
  constructor(popupSelector, submitCallback, card, id) {
    super(popupSelector);
    this._form = this._popupSelector.querySelector(".edit-form__form");
    this._card = card;
    this._id = id;
    this._submitCallback = submitCallback;
  }

  _handleSubmit(evt) {
    evt.preventDefault(); /* don't refresh page on submit evt +
        needs to return the card's info back out to the index's callback  */
    this._submitCallback(this._id, this._card);
  }

  open(id, card) {
    super.open();
    this._id = id;
    this._card = card;
  }

  setEventListeners() {
    super.setEventListeners();
    // needs to set up submit event listener
    this._form.addEventListener("submit", (evt) => {
      this._handleSubmit(evt);
    });
  }

  renderLoading(isLoading) {
    // get current textContent of the current button:
    const thisFormButton = this._form.querySelector(".edit-form__save-button");
    const buttonText = thisFormButton.textContent;
    // const swapContainer = originalButtonText;
    const loadingButtonText = thisFormButton.getAttribute("data-loading-state");
    if (isLoading) {
      // btn needs loading text
      thisFormButton.textContent = loadingButtonText; // make the content of the btn to loading...
      thisFormButton.setAttribute("data-loading-state", buttonText); // swap the OG btn text into the data container
    } else {
      // btn needs base text, which should be stored in the data right now
      const container = buttonText; // will have the loading... text in it
      thisFormButton.textContent = loadingButtonText;
      thisFormButton.setAttribute("data-loading-state", container);
    }
  }
}
