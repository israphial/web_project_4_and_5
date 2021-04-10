
export const cardsInformationArray = [ // gets passed into Section as the items array inside of the object
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

export const settingsObject = {
    formSelector: ".edit-form", // the form itself
    inputSelector: ".edit-form__input", // the inputs within "this" form
    submitButtonSelector: ".edit-form__save-button", // the button within "this" form
    inactiveButtonClass: "edit-form__save-button_disabled", // the disabled class for "this" button
    inputErrorClass: "edit-form__input_type_error", // this class is applied to the input when there's an input error / the input is invalid
    errorClass: "edit-form__error_active" // the span that "pops up" during an error state
  };

export const cardContainer = document.querySelector(".cards__container"); //is used by functions to add cards to the DOM

export const editProfileButton = document.querySelector('.profile__edit');
export const addCardButton = document.querySelector(".profile__add");

export const profileCloseButton = document.querySelector('.popup__close-button_type_profile'); 
export const addCardCloseButton = document.querySelector('.popup__close-button_type_add-card');
export const imageCloseButton = document.querySelector(".popup__close-button_type_image");

export const profileSaveButton = document.querySelector('.edit-form__save-button');
export const addCardSaveButton = document.querySelector('edit-form__save-button_type_add-card');

export const profilePopupElement = document.querySelector('.popup_type_profile'); // popup for profile
export const addCardPopupElement = document.querySelector(".popup_type_add-card"); // popup for add-card
export const imagePopupElement = document.querySelector(".popup_type_image"); // popup for images

export const profilePopupForm = document.querySelector('.edit-form_type_profile');
export const addCardPopupForm = document.querySelector('.edit-form__form_type_add-card');
// const allForms = document.querySelectorAll(".edit-form");

// The parts that show up in profile popup
export const profileHeaderContents = document.querySelector('.profile__header');
export const profileDescriptionContents = document.querySelector('.profile__description');

// The input boxes of the popup form - these are made to match the contents of the profile when the form is opened
export const inputHeaderContents = document.querySelector('.edit-form__input_type_header');
export const inputDescriptionContents = document.querySelector('.edit-form__input_type_description');

// image popup elements
export const imagePopupImage = document.querySelector('.popup__image');
export const imagePopupCaption = document.querySelector('.popup__image-caption');

// storage for when the user adds a new card
export const cardTitleSubmitted = document.querySelector(".edit-form__input_type_title");
export const cardURLSubmitted = document.querySelector(".edit-form__input_type_url");

// the template for constructing a card
export const cardTemplate = document.querySelector("#card-template").content;