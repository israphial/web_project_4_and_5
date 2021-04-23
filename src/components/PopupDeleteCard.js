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
}
