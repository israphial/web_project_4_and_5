export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  apiTester() {
    fetch(this._baseUrl + "/cards", {
      // fetching cards information, for example
      method: "GET",
      headers: this._headers, // headers ALWAYS needs to be set
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
    );
  }

  getAllCards() {
    // retrieves all card objects from the server.
    // returns the result of a fetch() call that produces EITHER the res.json() OR sends a Promise.reject(err) to a .catch(), which console logs the error.
    // this will be called in index.js in the initialization of the initialCards Section class, where you will replace the old cards array with the array that this method returns.
    return fetch(this._baseUrl + "/cards/", {
      headers: this._headers,
    }).then((res) =>
      res.ok
        ? res.json()
        : Promise.reject(`Error: ${res.status} ${res.statusText}`)
    ); // on resolve, returns an object of card objects
  }

  getUserInfo() {
    // retrieves user info from server and returns it to index.js's init for profileInfo (new UserInfo).
    return fetch(this._baseUrl + "/users/me", {
      headers: this._headers,
    }).then((res) =>
      res.ok
        ? res.json()
        : Promise.reject(`Error: ${res.status} ${res.statusText}`)
    ); // send user info out into the callback to propagate user info
  }

  setUserInfo({ name, about }) {
    // PATCH https://around.nomoreparties.co/v1/groupId/users/me
    return fetch(this._baseUrl + "/users/me", {
      // send new user info to server
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) =>
      res.ok
        ? res.json()
        : Promise.reject(`Error: ${res.status} ${res.statusText}`)
    );
  }

  addNewCard({ name, link }) {
    // this is used when a new card is added. returns a fetch that POSTS a JSON.stringified() card object.
    return fetch(this._baseUrl + "/cards/", {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({
        name, // pulls the name from the decon'd object and passes it in to this object
        link, // ^ same with link
      }),
    }).then((res) =>
      res.ok ? res.json() : Promise.reject("Error, " + res.status)
    );
  }

  deleteCard(cardID) {
    // cardID is retrieved from the card object
    return fetch(this._baseUrl + "/cards/" + cardID, {
      // add the cardID to the end of the url to specify which card to delete
      headers: this._headers,
      method: "DELETE",
    }).then((res) =>
      res.ok ? res.json() : Promise.reject("Error, " + res.status)
    );
  }

  addCardLike(cardID) {
    // PUT https://around.nomoreparties.co/v1/groupId/cards/likes/cardId where cardId is the cardID
    return fetch(this._baseUrl + `/cards/likes/${cardID}`, {
      headers: this._headers,
      method: "PUT",
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Error, ${res.status}`)
    );
  }

  removeCardLike(cardID) {
    // DELETE https://around.nomoreparties.co/v1/groupId/cards/likes/cardId where cardId is the cardID
    return fetch(this._baseUrl + `/cards/likes/${cardID}`, {
      headers: this._headers,
      method: "DELETE",
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Error, ${res.status}`)
    );
  }

  updateAvatar(link) {
    // PATCH https://around.nomoreparties.co/v1/groupId/users/me/avatar
    return fetch(this._baseUrl + "/users/me/avatar", {
      // fetching cards information, for example
      headers: this._headers, // headers ALWAYS needs to be set
      method: "PATCH",
      body: JSON.stringify({
        avatar: link.avatarURL,
      }),
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
    );
  }
}
