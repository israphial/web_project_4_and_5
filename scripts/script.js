// TODO: 


/* proj4 code */
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

function closePopupSaved(e) {
    e.preventDefault();

    profileHeaderContents.textContent = inputHeaderContents.value;
    profileDescriptionContents.textContent = inputDescriptionContents.value;
    popupWindow.classList.remove("popup_visible");
};

function closePopupUnsaved() {
    popupWindow.classList.remove("popup_visible");
};

editButton.addEventListener("click", openPopup);
closeButton.addEventListener("click", closePopupUnsaved);
popupForm.addEventListener("submit", closePopupSaved);

/* End proj4 code */

// TODO:
// Make a function that loads all of the pre-made cards from the array of objects. First, make the bare elements that make up the card, then add the title, picture, and
//  like button to each element. This could be accomplished using the <template> thing - clone the template for each card that needs to be made. maybe use the forEach method

const initialCards = [
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

function generateCards() {
    //for each object (card) in the initialCards array, clone the contents of the template and add the name and link to their title and img.src, respectively

    const cardContainer = document.querySelector(".cards__container");
    // clone the contents of the template 
    const cardTemplate = document.querySelector("#card-template").content;


    // 
    initialCards.forEach(function (currentCardObject) {
        const currentCard = cardTemplate.cloneNode(true);
        // append the title and image src to the right elements
        const currentCardImageSource = currentCard.querySelector(".card__picture").src = currentCardObject.link;
        currentCardImageAltText = currentCard.querySelector(".card__picture").alt = currentCardObject.name;
        const currentCardTitleText = currentCard.querySelector(".card__name").textContent = currentCardObject.name;

        // append currentCard to cardContainer
        cardContainer.append(currentCard);
    })

}

