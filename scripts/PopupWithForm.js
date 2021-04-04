export default class PopupWithForm extends Popup {
    constructor (popupSelector, formSubmissionCallback) { // also needs to take "a callback of the form submission" into the constructor, need to figure this out...
        super(popupSelector);
    }

    _getInputValues () {
        // collects data from all of the input fields
    }

    setEventListeners () { // method override -
        // add the click evt listener to the close icon AND add the submit evt handler to the submit button
    }

    close() { // method override -
        // needs to also reset the form once the popup is closed
    }
}

// create an instance of each 