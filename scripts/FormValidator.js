class FormValidator {
    constructor (settings, formElement) {
        // make form validator object
        this._settings = settings;
        this._formElement = formElement;
    }

    _toggleButtonState() {

    }

    _toggleButtonState() {
        
    }


    _setEventListeners() {
        // assign things to _formElement
        const inputElementList = Array.from(this._formElement.querySelectorAll(settings.inputSelector));
        const buttonElement = this._formElement.querySelector(settings.submitButtonSelector);

        _toggleButtonState(inputElementList, buttonElement);
        inputElementList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this._isValid(inputElement);
                this._toggleButtonState(inputElementList, buttonElement);
            })
        })
    }

    enableValidation() {
        this._formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
        })
        _setEventListeners();
    }
}

// setEventListeners attaches event listeners to all input elements, that trigger during input events. On each input, 
// the isValid function runs, checking to see if the field is "valid" or not. Depending on the validity of the fields, 
// the field is styled, the error is added and displayed, and the CSS of the field changes. 
const setEventListeners = (formElement, settings) => {

    const inputElementList = Array.from(formElement.querySelectorAll(settings.inputSelector)); // array: get all input elements of this form (formElement)
    const buttonElement = formElement.querySelector(settings.submitButtonSelector); // the submit button of this form

    toggleButtonState(inputElementList, buttonElement, settings);
    inputElementList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
            isValid(formElement, inputElement, settings); // send the current form and the input element that triggered the event into a validity check, pass settings object in so that deeper functions have access to it
            toggleButtonState(inputElementList, buttonElement, settings); // send all inputs of this form and the button to set the button to its appropriate state
        })
    })

}

const isValid = (formElement, inputElement, settings) => { // checks the validity of the input that triggered an input event, in the "current form"
    // is the input field valid? if it is, hideError. If it's not, showError. 
    // is this implementation correct/complete? 
    if (!inputElement.validity.valid) { // if it's not valid:
        showInputError(formElement, inputElement, inputElement.validationMessage, settings);
    } else { // if it is valid:
        hideInputError(formElement, inputElement, settings);
    }
}


const showInputError = (formElement, inputElement, errorMessage, settings) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`); // select the span element for "this" input
    // modify the input so that it gets the new class that gives it the red underline, called edit-form__input_type_error
    inputElement.classList.add(settings.inputErrorClass);

    // next, make the error span active/visible, then add the error message to its text, so that it displays the error
    errorElement.classList.add(settings.errorClass);
    errorElement.textContent = errorMessage;
}



const hideInputError = (formElement, inputElement, settings) => { // this takes the errorElement, settings object and removes the error message
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = "";

    // remove the field's error class too:
    inputElement.classList.remove(settings.inputErrorClass);
}

const toggleButtonState = (inputElementList, buttonElement, settings) => { // this function controls the state of the submit button in "this" form based on the validity of the fields in "this" form
    if (hasInvalidInput(inputElementList)) { // one or both input fields are in an invalid state
        buttonElement.disabled = true;
        buttonElement.classList.add(settings.inactiveButtonClass);
    } else { // all fields for this form are in a valid state
        buttonElement.disabled = false;
        buttonElement.classList.remove(settings.inactiveButtonClass);
    }
}

const hasInvalidInput = (inputElementList) => {
    return inputElementList.some((inputElement) => { // if ANY of the inputs is invalid, return false/invalid
        return !inputElement.validity.valid; // is this field currently valid? 
    })
}


enableValidation(settingsObject);