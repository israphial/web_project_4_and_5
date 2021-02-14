



// const showInputError = (formElement, inputElement, errorMessage) => { // takes the errorElement (span) and adds the error message to its textContent
//     const errorElement = formElement.querySelector(`#${inputElement.id}-error`)
  
//     inputElement.classList.add("edit-form__input_type_error"); // makes the input's underline red
//     errorElement.classList.add("edit-form__error_active");
//     errorElement.textContent = errorMessage;
  
//   }
  
//   const hideInputError = (formElement, inputElement) => { // takes the errorElement and removes the error message from its textContent
//     // get the input error element
//     const errorElement = formElement.querySelector(`#${inputElement.id}-error`)
  
//     errorElement.classList.remove("edit-form__error_active");
//     errorElement.textContent = "";
//     inputElement.classList.remove("edit-form__input_type_error"); // removes the input's red underline
//     // re-enable the save button too, using toggleButtonState()
//   }
  
//   const hasInvalidInput = (inputElementList) => {
//     // receives input list and iterates over it, checking if all of the inputs are valid, and returns true if a field is not valid
//     return inputElementList.some((inputElement) => {
//       return !inputElement.validity.valid; // is the field currently valid?
//     })
//   }
  
//   const isValid = (formElement, inputElement) => { // this function checks for form element validity and is ran every time an input is fired
//     if (!inputElement.validity.valid) {
//       showInputError(formElement, inputElement, inputElement.validationMessage);
  
//     } else {
//       hideInputError(formElement, inputElement);
//     }
//   }
  
//   const toggleButtonState = (inputElementList, buttonElement) => { // controls the state of the button depending on the validity of the inputs
//     if (hasInvalidInput(inputElementList)) {
//       buttonElement.disabled = true;
//       buttonElement.classList.add("edit-form__save-button_disabled");
//     } else {
//       buttonElement.disabled = false;
//       buttonElement.classList.remove("edit-form__save-button_disabled");
  
//     }
//   }
  
//   const setEventListeners = (formElement) => {
  
//     // find all input fields, make an array out of them, add event listeners to each
//     const inputElementList = Array.from(formElement.querySelectorAll(".edit-form__input")); // get all of the form fields of this form
//     const buttonElement = formElement.querySelector(".edit-form__save-button"); // get the submit button of this form
  
//     // set event listeners to all input elements in list
//     inputElementList.forEach((inputElement) => {
//       inputElement.addEventListener("input", () => {
//         isValid(formElement, inputElement);
//         toggleButtonState(inputElementList, buttonElement); // THIS MIGHT NOT BE IN THE RIGHT SPOT!!!
//       });
//     });
//   };
  
//   const enableValidation = (settings) => { // this function finds all forms, then enables validation for each form it finds
     
//     const formList = Array.from(document.querySelectorAll(".edit-form__form")); // get all forms on page
//     // iterate over these forms, adding validation to each of them and disabling certain behaviors
//     formList.forEach((formElement) => {
//       formElement.addEventListener("submit", (evt) => {
//         evt.preventDefault(); // cancel default submission behavior of each form
//       });
//       setEventListeners(formElement); // send a form into setEventListeners
//     })
//   }
  
//   enableValidation(settingsObject);

// refactor with settings object
// --------------------------------------




const settingsObject = {
    formSelector: ".edit-form", // the form itself
    inputSelector: ".edit-form__input", // the inputs within "this" form
    submitButtonSelector: ".edit-form__save-button", // the button within "this" form
    inactiveButtonClass: "edit-form__save-button_disabled", // the disabled class for "this" button
    inputErrorClass: "edit-form__input_type_error", // this class is applied to the input when there's an input error / the input is invalid
    errorClass: "edit-form__error_active" // the span that "pops up" during an error state
};





const enableValidation = (settings) => {
    const formList = Array.from(document.querySelectorAll(settings.formSelector)); // set all forms on the page

    formList.forEach((formElement) => { // for each form (formElement), prevent default behavior
        formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
        })
        setEventListeners(formElement, settings); // send the current form and the settings to this to attach all necessary listeners
        // make each background clickable
        makePopupBackgroundClickable(formElement, settings);
        console.log(`enableValidation completed`)
    })
}


// setEventListeners attaches event listeners to all input elements, that trigger during input events. On each input, 
// the isValid function runs, checking to see if the field is "valid" or not. Depending on the validity of the fields, 
// the field is styled, the error is added and displayed, and the CSS of the field changes. 
const setEventListeners = (formElement, settings) => {

    const inputElementList = Array.from(formElement.querySelectorAll(settings.inputSelector)); // array: get all input elements of this form (formElement)
    const buttonElement = formElement.querySelector(settings.submitButtonSelector); // the submit button of this form

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

const makePopupBackgroundClickable = (currentForm, settings) => {
    console.log(`makePopupBackgroundClickable running`)
    // make this form's background div clickable + make it trigger closePopupUnsaved
    const popupBackgrounds = Array.from(document.querySelectorAll("popup"));

    
    popupBackgrounds.forEach((thisPopupBackground) => {
        thisPopupBackground.addEventListener("click", closePopup);
        console.log(`loop forEach ran`)
    })
}

const bindEscapeKey = (currentForm, settings) => {
    // this will bind esc to closing the popup that's open
}



enableValidation(settingsObject);