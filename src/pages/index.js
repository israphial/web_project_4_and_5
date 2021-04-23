// imports
import "../pages/index.css";
import * as consts from "../utils/consts.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import { PopupDeleteCard } from "../components/PopupDeleteCard";

// import { data } from "autoprefixer";

// helper functions:
//-------------------------------
const handleCardClick = (imageLink, imageName) => {
  imagePopupClass.open(imageLink, imageName);
};

const makeNewValidator = (formElement) => {
  const validator = new FormValidator(consts.settingsObject, formElement);
  validator.enableValidation();
  return validator;
};

//-------------------------------

// init the validators for each form
const editProfileFormValidator = makeNewValidator(consts.profilePopupForm);
const addCardFormValidator = makeNewValidator(consts.addCardPopupForm);
const editAvatarFormValidator = makeNewValidator(consts.avatarPopupForm);
const deleteCardFormValidator = makeNewValidator(consts.deleteCardPopupForm); // this allows access to the renderLoading method

// init imagePopupClass:
const imagePopupClass = new PopupWithImage(consts.imagePopupElement);

consts.imageCloseButton.addEventListener("click", () => {
  imagePopupClass.close();
});

imagePopupClass.setEventListeners();

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-7",
  headers: {
    authorization: "be27dd99-9631-4f9f-ab55-fc3bfe11bfdc",
    "Content-Type": "application/json",
  },
});

Promise.all([api.getUserInfo(), api.getAllCards()]).then((res) => {
  const userResponse = res[0];
  const cardsResponse = res[1];

  // initiations

  // user section

  const profileInfo = new UserInfo(
    {
      currentUserName: userResponse.name,
      currentUserOccupation: userResponse.about,
      avatar: userResponse.avatar,
      id: userResponse._id,
    },
    consts.profileHeaderContents,
    consts.profileDescriptionContents,
    consts.profileAvatar
  ); // instantiate the userInfo class so that I can use its setUserInfo() and getUserInfo() methods
  profileInfo.setUserInfo({
    currentUserName: userResponse.name,
    currentUserOccupation: userResponse.about,
  }); // set fetched profile info to the DOM
  profileInfo.setAvatar();

  const editUserForm = new PopupWithForm(
    consts.profilePopupElement, // pass in profile popup element to be opened
    (profileObject) => {
      // callback 1 - do this when the form is submitted || the profileObject is returned by getUserInfo()
      editProfileFormValidator.renderLoading(true);
      api
        .setUserInfo({
          name: profileObject.profileName,
          about: profileObject.profileDescription,
        })
        .finally(() => {
          editProfileFormValidator.renderLoading(false);
          profileInfo.setUserInfo({
            currentUserName: profileObject.profileName,
            currentUserOccupation: profileObject.profileDescription,
          });
          editUserForm.close(); // closes popup and resets form
        });
    },
    () => {
      // callback 2 | _formOpenCallback - when the form is opened
      // const { username, occupation } = profileInfo.getUserInfo(); // get the existing user info to fill the form inputs when profile edit form is opened
      api.getUserInfo().then((res) => {
        consts.inputHeaderContents.value = res.name;
        consts.inputDescriptionContents.value = res.about;
      });
    }
  );

  const editAvatarPopup = new PopupWithForm(
    consts.avatarPopupElement,
    (avatarObject) => {
      // cb 1 | when form is submitted, needs to get the input, post the input to server, and update the avatar image
      editAvatarFormValidator.renderLoading(true);
      api.updateAvatar(avatarObject).finally(() => {
        editAvatarFormValidator.renderLoading(false);
        profileInfo.setAvatar(avatarObject);
        editAvatarPopup.close();
      });
    }
  );
  editAvatarPopup.setEventListeners();

  consts.editAvatarButton.addEventListener("click", () => {
    editAvatarPopup.open();
  });

  consts.avatarCloseButton.addEventListener("click", () => {
    editAvatarPopup.close();
  });

  consts.editProfileButton.addEventListener("click", () => {
    editUserForm.open();
  });

  editUserForm.setEventListeners();

  const makeNewCard = (data, cardTemplate) => {
    const idComparer = () => {
      const thisUserId = profileInfo.returnUserID();
      // used to compare card owner's ID to the current logged in user's ID to determine if card is delete-able by this user
      if (thisUserId == data.owner._id) {
        return true;
      } else {
        return false;
      }
    };
    const card = new Card(
      data,
      currentUserId,
      cardTemplate,
      handleCardClick,
      handleCardDelete,
      idComparer(), // tells the card true if this card is owned by the current user, false if it's not owned by the current user
      (likeStatus) => {
        console.log(likeStatus);
        // cb | returns true if user is trying to be unlike, false if user is trying to like
        if (likeStatus) {
          // if likeStatus is true, the user has previously liked the card so they're trying to unlike the card.
          api.removeCardLike(data._id).then((res) => {
            const newLikesArray = res.likes;
            card.updateCardLikes(newLikesArray);
          });
        } else {
          // likeStatus is false, so they haven't already liked the card and they're trying to like the card now.
          api.addCardLike(data._id).then((res) => {
            const newLikesArray = res.likes;
            card.updateCardLikes(newLikesArray);
          });
        }
      }
    );
    const finishedCard = card.createCard();
    return finishedCard;
  }; // end const makeNewCard

  // cards section
  const initialCards = new Section(
    {
      data: cardsResponse,
      renderer: (thisCard) => {
        const card = makeNewCard(
          thisCard,
          consts.cardTemplate,
          handleCardClick
        );
        initialCards.addItem(card);
      },
    },
    consts.cardContainer // the container that the cards are put into
  );
  initialCards.renderElements();

  const addCardPopup = new PopupWithForm(
    consts.addCardPopupElement,
    (valuesPassedIn) => {
      // first callback | valuesPassedIn is an object that comes from the _getInputValues() return in PopupWithForm
      addCardFormValidator.renderLoading(true);
      api
        .addNewCard({
          name: valuesPassedIn.cardTitle,
          link: valuesPassedIn.cardURL,
        }) // updates server with new card
        .then((res) => {
          const card = makeNewCard(res, consts.cardTemplate, handleCardClick);
          initialCards.addNewItem(card); // add it to the DOM
          addCardFormValidator.renderLoading(false);
          addCardPopup.close();
        });
    },
    () => {
      // the form OPEN callback
      consts.addCardPopupForm.reset();
    }
  );

  consts.addCardButton.addEventListener("click", () => {
    addCardPopup.open();
  });

  consts.addCardCloseButton.addEventListener("click", () => {
    addCardPopup.close();
  });

  addCardPopup.setEventListeners();

  const deleteCardPopup = new PopupDeleteCard(
    consts.deleteCardPopupElement,
    (id, card) => {
      // cb | do this when delete button is clicked | values received by _handleSubmit in popupDeleteCard
      deleteCardFormValidator.renderLoading(true);
      api.deleteCard(id).finally(() => {
        deleteCardFormValidator.renderLoading(false);
        card.remove();
        deleteCardPopup.close();
      });
    }
  );

  deleteCardPopup.setEventListeners();

  const handleCardDelete = (cardID, card) => {
    deleteCardPopup.open(cardID, card);
  };

  const currentUserId = profileInfo.returnUserID();
}); // end main Promise.all.then() call
