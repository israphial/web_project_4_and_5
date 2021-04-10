// imports
import "../pages/index.css";
import * as consts from "../utils/consts.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { openPopup, closePopup } from "../utils/SharedFunctions.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
// import { data } from "autoprefixer";

// helper functions: 
//-------------------------------
const handleCardClick = () => {
  imagePopupClass.open(link, image)
}

const makeNewValidator = (formElement) => {
  const validator = new FormValidator(consts.settingsObject, formElement);
  validator.enableValidation();
  return validator;
}

const makeNewCard = (cardName, cardLink, cardTemplate) => { // don't repeat yourself rule
  const card = new Card(cardName, cardLink, cardTemplate, handleCardClick);
  const finishedCard = card.createCard();
  return finishedCard;
}
//------------------------------

// instantiations:
//------------------------------

// init the validators for each form
const editProfileFormValidator = makeNewValidator(consts.profilePopupForm);

const addCardFormValidator = makeNewValidator(consts.addCardPopupForm);

// init profileInfo class:
const currentUserName = consts.profileHeaderContents; // manually declared here so that I can pass them into destructuring syntax - consts.profileHeaderContents doesn't work
const currentUserOccupation = consts.profileDescriptionContents;
const profileInfo = new UserInfo({ currentUserName, currentUserOccupation }); // instantiate the userInfo class so that I can use its setUserInfo() and getUserInfo() methods

// init the section containining the cards
const initialCards = new Section(
  {
    data: consts.cardsInformationArray,
    renderer: (thisCard) => {
      const card = makeNewCard(thisCard.name, thisCard.link, consts.cardTemplate, handleCardClick)
      initialCards.addItem(card);
    }
  }, consts.cardContainer  // the container that the cards are put into
)

// init imagePopupClass:
const imagePopupClass = new PopupWithImage(consts.imagePopupElement);

const addCardPopup = new PopupWithForm(consts.addCardPopupElement, 
  (valuesPassedIn) => { // valuesPassedIn is an object that comes from the _getInputValues() return in PopupWithForm
  const card = makeNewCard(valuesPassedIn.cardTitle, valuesPassedIn.cardURL, consts.cardTemplate, handleCardClick);
  initialCards.addItem(card) // add it to the DOM
  addCardPopup.close()
}, 
() => { // the form OPEN callback:
  consts.addCardPopupForm.reset(); // reset the form's fields so that they're empty when the popup opens
})

// init the edit Profile Popup form
const editUserForm = new PopupWithForm(consts.profilePopupElement, // pass in profile popup element to be opened
  (profileObject) => { // callback 1 - do this when the form is submitted || the profileObject is returned by getUserInfo()
    profileInfo.setUserInfo(profileObject.profileName, profileObject.profileDescription);
    editUserForm.close() // closes popup and resets form
  },
  () => { // callback 2 - when the form is opened
    const { username, occupation } = profileInfo.getUserInfo(); // get the existing user info to fill the form inputs when profile edit form is opened
    consts.inputHeaderContents.value = username.textContent;
    consts.inputDescriptionContents.value = occupation.textContent;
  }
)


// event listeners: 

consts.addCardButton.addEventListener("click", () => {
  addCardPopup.open();
})

consts.editProfileButton.addEventListener("click", () => {
  editUserForm.open();
})

consts.addCardCloseButton.addEventListener("click", () => {
  addCardPopup.close();
})

consts.imageCloseButton.addEventListener("click", () => {
  imagePopupClass.close();
})

// initializations
initialCards.renderElements();

addCardPopup.setEventListeners();
editUserForm.setEventListeners();
imagePopupClass.setEventListeners();
