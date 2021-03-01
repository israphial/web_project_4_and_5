/*

TODO:
 -BUG: makePopupBackgroundClickable closes the popup when ANY part of the popup is clicked, not just the overlay
 -BUG/ISSUE: bindEscapeKey is passing the wrong thing into closePopup(), it needs to be sending the current popup element, not the current form element
 */

 
const makePopupBackgroundClickable = (currentForm, settings) => {
    // make this form's background div clickable + make it trigger closePopup
    const popupBackgrounds = Array.from(document.querySelectorAll(".popup"));

    
    popupBackgrounds.forEach((thisPopupBackground) => {
        thisPopupBackground.addEventListener("click", function () {
            closePopup(thisPopupBackground);
        });
    });
}

const bindEscapeKey = () => {    // this function binds esc so that it closes whatever popup is currently open
console.log();
    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape") { // issue: this is receiving the FORM, not the popup! It needs to receive the popup in order to remove the visible class
            closePopup(); // incomplete
        };
    });
}