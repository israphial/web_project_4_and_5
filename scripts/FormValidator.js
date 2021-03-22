export class FormValidator {
    constructor (settings, formElement) {
        this._settings = settings;
        this._formElement = formElement;
    }

    // private methods
    //----------------

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._settings.inputErrorClass);
        errorElement.classList.add(this._settings.errorClass);
        errorElement.textContent = errorMessage;
    }

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        
        errorElement.classList.remove(this._settings.errorClass);
        errorElement.textContent = "";
        inputElement.classList.remove(this._settings.inputErrorClass);
    }

    _toggleButtonState(inputElementList, buttonElement) {
        if (this._hasInvalidInput(inputElementList)) {
            buttonElement.disabled = true;
            buttonElement.classList.add(this._settings.inactiveButtonClass);
        } else {
            buttonElement.disabled = false;
            buttonElement.classList.remove(this._settings.inactiveButtonClass);
        }
    }

    _hasInvalidInput(inputElementList) {
        return inputElementList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _isValid(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _setEventListeners() {
        const inputElementList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
        const buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector);

        this._toggleButtonState(inputElementList, buttonElement);
        inputElementList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this._isValid(inputElement);
                this._toggleButtonState(inputElementList, buttonElement);
            })
        })
    }

    // public methods
    // --------------

    enableValidation() {
        this._formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
        })
        this._setEventListeners();
    }
}
