export class Card {
  constructor(
    data,
    currentUserId,
    cardSelector,
    handleCardClick,
    handleCardDelete,
    isDeleteAllowed,
    handleCardLikeCallback
  ) {
    this._data = data;
    this._cardText = data.name;
    this._cardLink = data.link;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._likes = data.likes; // array containing the user objects who've liked this card
    this._currentUserId = currentUserId;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete; // callback that uses the ID to delete a card from the server and DOM
    this._deleteAllowed = isDeleteAllowed; // boolean | true if user's id matches card owner's id, false if not; used to determine which cards the user can delete
    this._handleCardLike = handleCardLikeCallback; // likeStatus in index | returns true or false to index | true if card was just liked, false if card was just unliked.
  }

  _setDeleteIcon() {
    if (!this._deleteAllowed) {
      this._cardDeleteButton.style.display = "none";
    }
  }

  _hasThisUserLiked() {
    // returns false if this user hasn't already liked this card
    return this._likes.some((thisUserObj) => {
      return thisUserObj._id === this._currentUserId;
    });
  }

  _getTemplate() {
    const cardElement = this._cardSelector
      .querySelector(".card")
      .cloneNode(true);
    return cardElement; // finished blank card
  }

  _handleHeartClick(e) {
    if (this._hasThisUserLiked()) {
      // this user has already liked this card, so they're trying to UNLIKE the card right now. return true to the index
      this._handleCardLike(true);
    } else {
      // this user did not have this card liked, so this trigger is the user liking the card. return false to the index
      this._handleCardLike(false);
    }
    // e.target.classList.toggle("card__social-symbol_liked");
  }

  _setEventListeners() {
    this._setDeleteIcon();
    if (this._deleteAllowed) {
      this._cardDeleteButton.addEventListener("click", () => {
        this._handleCardDelete(this._cardId, this._cardElement); // when trash clicked, ID and card are sent out to the callback
      });
    }

    this._heartIcon.addEventListener("click", (e) => {
      this._handleHeartClick(e);
    });
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._cardLink, this._cardText);
    });
  }

  // public methods
  //---------------

  returnCardID() {
    return this._cardId;
  }

  updateCardLikes(newLikesArray) {
    this._likes = newLikesArray;
    this._heartIcon.classList.toggle("card__social-symbol_liked"); // TODO TEST
    this._likesDisplay.textContent = newLikesArray.length;
  }

  createCard() {
    // makes a card from the data given, called in index.js
    this._cardElement = this._getTemplate();
    this._heartIcon = this._cardElement.querySelector(".card__social-symbol");
    this._cardImage = this._cardElement.querySelector(".card__picture"); // get the image and fill it
    this._likesDisplay = this._cardElement.querySelector(".card__like-count");
    this._cardDeleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );

    this._cardElement.querySelector(".card__name").textContent = this._cardText; // add text to card
    this._cardImage.src = this._cardLink;
    this._cardImage.alt = this._cardText;
    if (this._hasThisUserLiked()) {
      this._heartIcon.classList.add("card__social-symbol_liked");
    }
    this._likesDisplay.textContent = this._likes.length;
    this._setEventListeners();
    // return the finished card at the end of this method
    return this._cardElement;
  }
}
