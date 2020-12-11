
let editButton = document.querySelector('.profile__edit');
let closeButton = document.querySelector('.edit-form__close-button');
let saveButton = document.querySelector('.edit-form__save-button');
let popupWindow = document.querySelector('.popup');
let popupForm = document.querySelector('.edit-form__form');

// The stuff that shows up in profile
let profileHeaderContents = document.querySelector('.profile__header');
let profileDescriptionContents = document.querySelector('.profile__description');

// The input boxes of the popup form - these are made to match the contents of the profile when the form is opened
let inputHeaderContents = document.querySelector('.edit-form__input_type_header');
let inputDescriptionContents = document.querySelector('.edit-form__input_type_description');

function openPopup() {
    popupWindow.classList.add("popup_visible");
    inputHeaderContents.value = profileHeaderContents.textContent;
    inputDescriptionContents.value = profileDescriptionContents.textContent;
};

function closePopup() {
    popupWindow.classList.remove("popup_visible");
};

function closePopupSaved(e) {
    e.preventDefault();

    profileHeaderContents.textContent = inputHeaderContents.value;
    profileDescriptionContents.textContent = inputDescriptionContents.value;
    closePopup();
};


editButton.addEventListener("click", openPopup);
closeButton.addEventListener("click", closePopup);
popupForm.addEventListener("submit", closePopupSaved);