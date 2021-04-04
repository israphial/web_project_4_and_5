// imports
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { openPopup, closePopup } from "./sharedFunctions.js";
import Section from "./Section.js";

// data 
const cardsInformationArray = [
    {
      name: "Yosemite Valley",
      link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
    },
    {
      name: "Lake Louise",
      link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
    },
    {
      name: "Bald Mountains",
      link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
    },
    {
      name: "Latemar",
      link: "https://code.s3.yandex.net/web-code/latemar.jpg"
    },
    {
      name: "Vanoise National Park",
      link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
    },
    {
      name: "Lago di Braies",
      link: "https://code.s3.yandex.net/web-code/lago.jpg"
    }
];


const settingsObject = {
  formSelector: ".edit-form", // the form itself
  inputSelector: ".edit-form__input", // the inputs within "this" form
  submitButtonSelector: ".edit-form__save-button", // the button within "this" form
  inactiveButtonClass: "edit-form__save-button_disabled", // the disabled class for "this" button
  inputErrorClass: "edit-form__input_type_error", // this class is applied to the input when there's an input error / the input is invalid
  errorClass: "edit-form__error_active" // the span that "pops up" during an error state
};

// buttons and DOM elements
const cardContainer = document.querySelector(".cards__container"); //is used by functions to add cards to the DOM

const editProfileButton = document.querySelector('.profile__edit');
const addCardButton = document.querySelector(".profile__add");

const profileCloseButton = document.querySelector('.popup__close-button_type_profile'); 
const addCardCloseButton = document.querySelector('.popup__close-button_type_add-card');
const imageCloseButton = document.querySelector(".popup__close-button_type_image");

const profileSaveButton = document.querySelector('.edit-form__save-button');
const addCardSaveButton = document.querySelector('edit-form__save-button_type_add-card');

const profilePopup = document.querySelector('.popup_type_profile'); // popup for profile
const addCardPopup = document.querySelector(".popup_type_add-card"); // popup for add-card
const imagePopup = document.querySelector(".popup_type_image"); // popup for images

const profilePopupForm = document.querySelector('.edit-form_type_profile');
const addCardPopupForm = document.querySelector('.edit-form__form_type_add-card');
// const allForms = document.querySelectorAll(".edit-form");

// The parts that show up in profile popup
const profileHeaderContents = document.querySelector('.profile__header');
const profileDescriptionContents = document.querySelector('.profile__description');

// The input boxes of the popup form - these are made to match the contents of the profile when the form is opened
const inputHeaderContents = document.querySelector('.edit-form__input_type_header');
const inputDescriptionContents = document.querySelector('.edit-form__input_type_description');

// image popup elements
const imagePopupImage = document.querySelector('.popup__image');
const imagePopupCaption = document.querySelector('.popup__image-caption');

// storage for when the user adds a new card
const cardTitleSubmitted = document.querySelector(".edit-form__input_type_title");
const cardURLSubmitted = document.querySelector(".edit-form__input_type_url");

// the template for constructing a card
const cardTemplate = document.querySelector("#card-template").content;


// functions 

function openProfilePopup() {
  inputHeaderContents.value = profileHeaderContents.textContent;
  inputDescriptionContents.value = profileDescriptionContents.textContent;
  openPopup(profilePopup);
}

function openImagePopup(cardData) {
  imagePopupImage.src = cardData.link;
  imagePopupCaption.textContent = cardData.name;
  openPopup(imagePopup);
}

const makePopupBackgroundClickable = () => {
  const popupBackgrounds = Array.from(document.querySelectorAll(".popup"));

  popupBackgrounds.forEach((thisPopupBackground) => {
    thisPopupBackground.addEventListener("click", function (evt) {
      if (evt.target.classList.contains("popup")) { 
        closePopup(thisPopupBackground);
      }
    });
  });
}

function handleProfileSubmit(e) {
  e.preventDefault(); //stops page from reloading

  profileHeaderContents.textContent = inputHeaderContents.value;
  profileDescriptionContents.textContent = inputDescriptionContents.value;

  closePopup(profilePopup);
}

function createCard(cardName, cardLink, cardTemplate) {
  const card = new Card(cardName, cardLink, cardTemplate);
  const finishedCard = card.createCard();
  return finishedCard;
}

function loadInitialCards() { 
  cardsInformationArray.forEach((item) => {
    // const card = new Card(item.name, item.link, cardTemplate);
    const card = createCard(item.name, item.link, cardTemplate)
    // const finishedCardElement = card.createCard();
    cardContainer.append(card); 
  })
}

function handleAddCardSubmit(e) { 
  e.preventDefault(); // stops page from reloading

  const newCardTitle = cardTitleSubmitted.value;
  const newCardURL = cardURLSubmitted.value;
  const newCardObject = {
    name: newCardTitle,
    link: newCardURL
  };

  // const card = new Card(newCardTitle, newCardURL, cardTemplate);
  // const finishedCard = card.createCard();
  const card = createCard(newCardTitle, newCardURL, cardTemplate)
  cardContainer.prepend(card);
  closePopup(addCardPopup);
  addCardPopupForm.reset();
}

const validateForms = () => {
  const formList = Array.from(document.querySelectorAll(settingsObject.formSelector));
  formList.forEach((formElement) => {
    const formToValidate = new FormValidator(settingsObject, formElement);
    formToValidate.enableValidation();
  });
}



// event listeners 
editProfileButton.addEventListener("click", openProfilePopup);

profilePopupForm.addEventListener("submit", handleProfileSubmit);

addCardPopupForm.addEventListener("submit", handleAddCardSubmit);

addCardButton.addEventListener("click", function() {
  openPopup(addCardPopup);
})
profileCloseButton.addEventListener("click", function() {
  closePopup(profilePopup);
});
addCardCloseButton.addEventListener("click", function() {
  closePopup(addCardPopup);
});
imageCloseButton.addEventListener("click", function() {
  closePopup(imagePopup);
});


// initializations

loadInitialCards();
validateForms();
makePopupBackgroundClickable();



