export default class UserInfo {
  constructor(
    { currentUserName, currentUserOccupation, avatar, id },
    profileHeaderContents,
    profileDescriptionContents,
    profileAvatar
  ) {
    this._userName = currentUserName; // the class selector for the user name
    this._userOccupation = currentUserOccupation; // the class selector for the user occupation
    this._avatar = avatar;
    this._id = id;
    this._profileHeaderContents = profileHeaderContents;
    this._profileDescriptionContents = profileDescriptionContents;
    this._profileAvatar = profileAvatar;
  }

  returnUserID() {
    // used to compare this user's ID to a card owner's ID
    return this._id;
  }

  getUserInfo() {
    this._userObj = {
      username: this._userName,
      occupation: this._userOccupation,
    };
    return this._userObj;
  }

  setUserInfo({ currentUserName, currentUserOccupation }) {
    // Update the DOM
    this._profileHeaderContents.textContent = currentUserName;
    this._profileDescriptionContents.textContent = currentUserOccupation;
    this._userName = currentUserName; // update the internal class information as well
    this._userOccupation = currentUserOccupation;
  }

  setAvatar(avatarObject = false) {
    if (avatarObject) {
      this._profileAvatar.src = avatarObject.avatarURL;
    } else {
      this._profileAvatar.src = this._avatar;
    }
  }
}
