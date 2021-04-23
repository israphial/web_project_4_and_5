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
export const editAvatarButton = document.querySelector(".profile__edit-avatar-button");

export const profileCloseButton = document.querySelector('.popup__close-button_type_profile'); 
export const addCardCloseButton = document.querySelector('.popup__close-button_type_add-card');
export const imageCloseButton = document.querySelector(".popup__close-button_type_image");
export const avatarCloseButton = document.querySelector(".popup__close-button_type_edit-avatar");
export const deleteCardCloseButton = document.querySelector(".popup__close-button_type_delete-card");

export const profileSaveButton = document.querySelector('.edit-form__save-button');
export const addCardSaveButton = document.querySelector('edit-form__save-button_type_add-card');
export const editAvatarSaveButton = document.querySelector(".edit-form__save-button_type_edit-avatar");
export const deleteCardSaveButton = document.querySelector(".edit-form__save-button_type_delete-card");

export const profilePopupElement = document.querySelector('.popup_type_profile'); // popup for profile
export const addCardPopupElement = document.querySelector(".popup_type_add-card"); // popup for add-card
export const imagePopupElement = document.querySelector(".popup_type_image"); // popup for images
export const avatarPopupElement = document.querySelector(".popup_type_edit-avatar");
export const deleteCardPopupElement = document.querySelector(".popup_type_delete-card");

export const profilePopupForm = document.querySelector('.edit-form_type_profile');
export const addCardPopupForm = document.querySelector('.edit-form__form_type_add-card');
export const avatarPopupForm = document.querySelector(".edit-form__form_type_edit-avatar");
export const deleteCardPopupForm = document.querySelector(".edit-form__form_type_delete-card")
// const allForms = document.querySelectorAll(".edit-form"); // uncomment if needed

// The parts that show up in profile popup
export const profileHeaderContents = document.querySelector('.profile__header');
export const profileDescriptionContents = document.querySelector('.profile__description');

// The input boxes of the popup form - these are made to match the contents of the profile when the form is opened
export const inputHeaderContents = document.querySelector('.edit-form__input_type_header');
export const inputDescriptionContents = document.querySelector('.edit-form__input_type_description');

// the input of the edit avatar form
export const avatarInputContents = document.querySelector(".edit-form__input_type_avatar-url");

// image popup elements
export const imagePopupImage = document.querySelector('.popup__image');
export const imagePopupCaption = document.querySelector('.popup__image-caption');

// storage for when the user adds a new card
export const cardTitleSubmitted = document.querySelector(".edit-form__input_type_title");
export const cardURLSubmitted = document.querySelector(".edit-form__input_type_url");

// the template for constructing a card
export const cardTemplate = document.querySelector("#card-template").content;

export const profileAvatar = document.querySelector(".profile__picture");