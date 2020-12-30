// TODO: 
// -- Card data is not wiped from the cardsInformationArray when a card is deleted - should this be added in project 5? The effect that this causes is that 
//    cards that have previously been deleted are re-drawn when generateCards() is called, as the data is still in the array. 

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

// buttons and DOM elements, including template selector
let cardContainer = document.querySelector(".cards__container"); //is used by functions to add cards to the DOM

let editProfileButton = document.querySelector('.profile__edit');
let addCardButton = document.querySelector(".profile__add");

let profileCloseButton = document.querySelector('.edit-form__close-button_type_profile');
let addCardCloseButton = document.querySelector('.edit-form__close-button_type_add-card');
let imageCloseButton = document.querySelector(".edit-form__close-button_type_image");

let profileSaveButton = document.querySelector('.edit-form__save-button');
let addCardSaveButton = document.querySelector('edit-form__save-button_type_add-card');

let profilePopup = document.querySelector('.popup_type_profile'); // popup for profile
let addCardPopup = document.querySelector(".popup_type_add-card"); // popup for add-card
let imagePopup = document.querySelector(".popup_type_image"); // popup for images

let profilePopupForm = document.querySelector('.edit-form_type_profile');
let addCardPopupForm = document.querySelector('.popup_type_add-card');


// The stuff that shows up in profile
let profileHeaderContents = document.querySelector('.profile__header');
let profileDescriptionContents = document.querySelector('.profile__description');

// The input boxes of the popup form - these are made to match the contents of the profile when the form is opened
let inputHeaderContents = document.querySelector('.edit-form__input_type_header');
let inputDescriptionContents = document.querySelector('.edit-form__input_type_description');

// parts for image popup

// image popup elements
let imagePopupImage = document.querySelector('.popup__image');
let imagePopupCaption = document.querySelector('.popup__image-caption');

function openPopup(popup, imageSource=undefined) {
    popup.classList.add("popup_visible");

    if (popup == profilePopup) {
      inputHeaderContents.value = profileHeaderContents.textContent;
      inputDescriptionContents.value = profileDescriptionContents.textContent;
    }

    if (popup == imagePopup) {
      // set the popup image source (the thing that should be occupying the content or background of the popup) to imageSource
      imagePopupImage.src = imageSource;
    }
};

function closePopupUnsaved(popup) {
  popup.classList.remove("popup_visible");
};

function closePopupSaved(e, popup) {
    e.preventDefault(); // This stops the page from reloading on form submission, e is the event occurring

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
profilePopupForm.addEventListener("submit", function(e) { // this handles the submission for the profile edit form
  closePopupSaved(e, popup = profilePopup);
});
addCardPopupForm.addEventListener("submit", function(e) { // this handles the submission for the addCard form
  closePopupSaved(e, popup = addCardPopup);
});




function generateCards() {

    // erase existing cards
    let currentCards = cardContainer.querySelectorAll(".card");
    currentCards.forEach((element) => {
      element.remove();
    });

    // clone the contents of the card template and store it
    const cardTemplate = document.querySelector("#card-template").content;

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
      })
    })

    // image click handling
    // select all images
    const cardImages = document.querySelectorAll(".card__picture");
    cardImages.forEach( (image) => {
      image.addEventListener("click", function (evt) {
        console.log(evt.target) // this should be the image; if it is then you need to make its src pass into openPopup with an argument that gets passed into the correct section
        let thisImageSource = evt.target.getAttribute('src');
        openPopup(imagePopup, thisImageSource);
      })
    })
}

generateCards();




