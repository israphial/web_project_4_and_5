import { profileHeaderContents, profileDescriptionContents } from "../utils/consts.js";

export default class UserInfo {
    constructor({currentUserName, currentUserOccupation}) { // the selectors of 2 elements; the user's name and the user's occupation
        this._userName = currentUserName; // the class selector for the user name
        this._userOccupation = currentUserOccupation; // the class selector for the user occupation
    }

    getUserInfo() {
        this._userObj = {
            username: this._userName,
            occupation: this._userOccupation
        }
        return this._userObj;
    }

    setUserInfo(newUserName, newUserOccupation) { // used to update the profile
        // set the textContent of the page's user info to the contents of newUserName and newUserOccupation
        profileHeaderContents.textContent = newUserName;
        profileDescriptionContents.textContent = newUserOccupation;
    }
}