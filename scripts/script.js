// TODO:

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
function openPopup(popup) {
  popup.classList.add("popup_visible");
  bindEscapeKey();
};

function closePopup(popup) {
  popup.classList.remove("popup_visible");
  unbindEscapeKey();
};

function openProfilePopup() {
  inputHeaderContents.value = profileHeaderContents.textContent;
  inputDescriptionContents.value = profileDescriptionContents.textContent;
  openPopup(profilePopup);
}

function openImagePopup(cardData) {
  // generate each part of the popup using the parts of cardData
  imagePopupImage.src = cardData.link;
  imagePopupCaption.textContent = cardData.name;
  openPopup(imagePopup);
}

const bindEscapeKey = () => {    // this function binds esc so that it closes whatever popup is currently open
  document.addEventListener("keydown", handleEscKeyPress);
}

const unbindEscapeKey = () => {
  document.removeEventListener("keydown", handleEscKeyPress); //this works
}

const handleEscKeyPress = (evt) => {
  if (evt.key === "Escape") {
    const currentlyOpenedPopup = document.querySelector(".popup_visible"); // select whatever popup is open
    closePopup(currentlyOpenedPopup);
  }
}

const makePopupBackgroundClickable = () => {
  const popupBackgrounds = Array.from(document.querySelectorAll(".popup"));

  popupBackgrounds.forEach((thisPopupBackground) => {
    thisPopupBackground.addEventListener("click", function (evt) {
      if (evt.target.classList.contains("popup")) { // only close the popup if the background is clicked
        closePopup(thisPopupBackground);
      }
    });
  });
}

function createCard(item) {

  const currentCard = cardTemplate.cloneNode(true); // clone card template into this to "build" a card with
  const cardImage = currentCard.querySelector(".card__picture");
  cardImage.src = item.link;
  cardImage.alt = item.name;
  currentCard.querySelector(".card__name").textContent = item.name;


  // add event listeners to the various parts of the newly created card
  cardImage.addEventListener("click", function() {
    openImagePopup(item);
  });
  const deleteCardButton = currentCard.querySelector(".card__delete-button");
  deleteCardButton.addEventListener("click", function(evt) {
    evt.target.parentElement.remove(); //removes the card when delete button is clicked
  });
  const likeCardButton = currentCard.querySelector(".card__social-symbol");
  likeCardButton.addEventListener("click", function(evt) {
    evt.target.classList.toggle("card__social-symbol_liked");
  });
  return currentCard; // returns a fully ready card
}

function renderInitialCards() {
  cardsInformationArray.forEach((item) => {
    const card = createCard(item);
    cardContainer.append(card);
  });
};

function handleProfileSubmit(e) {
  e.preventDefault(); //stops page from reloading

  profileHeaderContents.textContent = inputHeaderContents.value;
  profileDescriptionContents.textContent = inputDescriptionContents.value;

  closePopup(profilePopup);
}

function handleAddCardSubmit(e) {
  e.preventDefault(); // stops page from reloading

  const newCardTitle = cardTitleSubmitted.value;
  const newCardURL = cardURLSubmitted.value;
  const newCardObject = {
    name: newCardTitle,
    link: newCardURL
  };
  const card = createCard(newCardObject);
  cardContainer.prepend(card);
  closePopup(addCardPopup);
  addCardPopupForm.reset();
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

renderInitialCards();
makePopupBackgroundClickable();


