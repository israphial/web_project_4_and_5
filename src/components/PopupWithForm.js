import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmissionCallback, formOpenCallback) {
    super(popupSelector);
    this._form = this._popupSelector.querySelector(".edit-form__form"); // should select the current/relevant form
    this._formSubmissionCallback = formSubmissionCallback; // this gets the values from _getInputValues and pulls it through to the index.js to make a new card
    this._formOpenCallback = formOpenCallback; // this runs when the form is first opened, clears form and starts live validation
  }

  _getInputValues() {
    // makes an object with the values of the inputs of the relevant form, then returns it out into the callback
    this._inputList = this._form.querySelectorAll(".edit-form__input"); // get the inputs of this form
    this._inputValues = {}; // new object to fill and return
    this._inputList.forEach((inputField) => {
      this._inputValues[inputField.name] = inputField.value;
    });
    return this._inputValues; // the object should be filled with the name: value properties derived from all of the form inputs
  }

  setEventListeners() {
    super.setEventListeners(); // adds functionality to the close button/overlay
    // add the click evt listener to the close icon AND add the submit evt handler to the submit button
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault(); // stop refresh

      // call to formSubmissionCallback
      this._formSubmissionCallback(this._getInputValues()); // retrieves the current input values and passes them into the formSubmissionCallback, which gives index.js the valuesPassedIn object
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  open() {
    super.open();
    if (this._formOpenCallback != undefined) {
      this._formOpenCallback();
    }
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
