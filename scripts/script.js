/* Reviewer: 
  I've added one of my favorite libraries, the Mousetrap library. This gives the user another way to close the popups (via the esc key). It's a personal touch that I don't think will interfere with
  the rest of the project in any way, and it improves usability. I tested it in a variety of ways to see if it would break anything, and I couldn't find any issues.
  If you see a reason to remove it though, I can. 
*/

// TODO: 
// -- Card data is not wiped from the cardsInformationArray when a card is deleted - should this be added in project 5? The effect that this causes is that 
//    the default cards that have previously been deleted are re-drawn when generateCards() is called, as the data is still in the array. 
// -- Build in handling for broken links that don't lead to images - maybe have a validation occur that checks to see if this is an image link, and block the submission if it's not

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
let cardContainer = document.querySelector(".cards__container"); //is used by functions to add cards to the DOM

let editProfileButton = document.querySelector('.profile__edit');
let addCardButton = document.querySelector(".profile__add");

let profileCloseButton = document.querySelector('.popup__close-button_type_profile'); 
let addCardCloseButton = document.querySelector('.popup__close-button_type_add-card');
let imageCloseButton = document.querySelector(".popup__close-button_type_image");

let profileSaveButton = document.querySelector('.edit-form__save-button');
let addCardSaveButton = document.querySelector('edit-form__save-button_type_add-card');

let profilePopup = document.querySelector('.popup_type_profile'); // popup for profile
let addCardPopup = document.querySelector(".popup_type_add-card"); // popup for add-card
let imagePopup = document.querySelector(".popup_type_image"); // popup for images

let profilePopupForm = document.querySelector('.edit-form_type_profile');
let addCardPopupForm = document.querySelector('.popup_type_add-card');


// The parts that show up in profile popup
let profileHeaderContents = document.querySelector('.profile__header');
let profileDescriptionContents = document.querySelector('.profile__description');

// The input boxes of the popup form - these are made to match the contents of the profile when the form is opened
let inputHeaderContents = document.querySelector('.edit-form__input_type_header');
let inputDescriptionContents = document.querySelector('.edit-form__input_type_description');

// parts for image popup

// image popup elements
let imagePopupImage = document.querySelector('.popup__image');
let imagePopupCaption = document.querySelector('.popup__image-caption');

// functions 

function openPopup(popup, imageSource=undefined) {
  Mousetrap.bind("esc", function() { // Binds escape key to close any popup that's currently open
    closePopupUnsaved(popup);
  })
    popup.classList.add("popup_visible");
    popup.classList.remove("faded-out");
    popup.classList.add("faded-in");

    if (popup == profilePopup) {
      inputHeaderContents.value = profileHeaderContents.textContent;
      inputDescriptionContents.value = profileDescriptionContents.textContent;
    }

    if (popup == imagePopup) {
      // get various parts of the card's image and store them in variables
      let newImageCaption = imageSource.alt;
      let newImageSource = imageSource.getAttribute("src")

      //set the various parts of the popup
      imagePopupImage.src = newImageSource;
      imagePopupCaption.textContent = newImageCaption;
    }
};

function closePopupUnsaved(popup) {
  Mousetrap.reset(); // unbinds esc key
  popup.classList.remove("popup_visible");
  popup.classList.remove("faded-in");
  popup.classList.add("faded-out");
};

function closePopupSaved(e, popup) {
    e.preventDefault(); // This stops the page from reloading on form submission

    if (popup == profilePopup) {
      profileHeaderContents.textContent = inputHeaderContents.value;
      profileDescriptionContents.textContent = inputDescriptionContents.value;
    }

    if (popup == addCardPopup) {
      let cardTitleSubmitted = document.querySelector(".edit-form__input_type_title").value;
      let cardURLSubmitted = document.querySelector(".edit-form__input_type_url").value;
      let newCardTitle = cardTitleSubmitted;
      let newCardURL = cardURLSubmitted;
      let newCardObject = {
        name: newCardTitle,
        link: newCardURL
      };
      cardsInformationArray.unshift(newCardObject);
      console.log(cardsInformationArray);
      generateCards();
    }
    popup.classList.remove("popup_visible");
    popup.classList.remove("faded-in");
    popup.classList.add("faded-out");
};




function generateCards() {

    // erase existing cards so that all can be redrawn and re-assigned their event listeners
    let currentCards = cardContainer.querySelectorAll(".card");
    currentCards.forEach((element) => {
      element.remove();
    });

    // clone the contents of the card template and store it
    const cardTemplate = document.querySelector("#card-template").content;

    // add elements to the newly copied card
    cardsInformationArray.forEach(function (currentCardObject) {
        const currentCard = cardTemplate.cloneNode(true);
        // append the title and image src to the right elements
        const currentCardImageSource = currentCard.querySelector(".card__picture").src = currentCardObject.link;
        currentCardImageAltText = currentCard.querySelector(".card__picture").alt = currentCardObject.name;
        const currentCardTitleText = currentCard.querySelector(".card__name").textContent = currentCardObject.name;

        // append the new card to the container
        cardContainer.append(currentCard);
    });

    // select all delete buttons and add an event listener to all of them
    const deleteCardButtons = document.querySelectorAll(".card__delete-button");

    // This click event listener deletes the parent card when the delete button is clicked
    deleteCardButtons.forEach(deleteButton => {
      deleteButton.addEventListener("click", function (evt) {
          evt.target.parentElement.remove();
      });
    });

    // like button handling
    // select all like buttons
    const likeCardButtons = document.querySelectorAll(".card__social-symbol");

    // event listener ties behavior to each button that modifies its appearance when clicked
    likeCardButtons.forEach( (likeButton) => {
      likeButton.addEventListener("click", function (evt) {
        evt.target.classList.toggle("card__social-symbol_liked");
      });
    });

    // image click handling
    const cardImages = document.querySelectorAll(".card__picture");
    cardImages.forEach( (image) => {
      image.addEventListener("click", function (evt) {
        let thisImage = evt.target;
        openPopup(imagePopup, thisImage);
      });
    });
};


// event listeners 
editProfileButton.addEventListener("click", function () {
  openPopup(profilePopup);
});
addCardButton.addEventListener("click", function() {
  openPopup(addCardPopup);
})
profileCloseButton.addEventListener("click", function() {
  closePopupUnsaved(profilePopup);
});
addCardCloseButton.addEventListener("click", function() {
  closePopupUnsaved(addCardPopup);
})
imageCloseButton.addEventListener("click", function() {
  closePopupUnsaved(imagePopup);
});
profilePopupForm.addEventListener("submit", function(e) { // this handles the submission for the profile edit form
  closePopupSaved(e, popup = profilePopup);
});
addCardPopupForm.addEventListener("submit", function(e) { // this handles the submission for the addCard form
  closePopupSaved(e, popup = addCardPopup);
});


generateCards();