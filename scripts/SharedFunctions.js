// openPopup and closePopup will go here, I think

// functions 
export function openPopup(popup) { // will be moved to sharedFunctions.js
    popup.classList.add("popup_visible");
    bindEscapeKey();
};

export function closePopup(popup) { // will be moved to sharedFunctions.js
    popup.classList.remove("popup_visible");
    unbindEscapeKey();
};

export const bindEscapeKey = () => {
    document.addEventListener("keydown", handleEscKeyPress);
  }
  
export const unbindEscapeKey = () => {
    document.removeEventListener("keydown", handleEscKeyPress);
}

const handleEscKeyPress = (evt) => {
    if (evt.key === "Escape") {
      const currentlyOpenedPopup = document.querySelector(".popup_visible");
      closePopup(currentlyOpenedPopup);
    }
  }
  