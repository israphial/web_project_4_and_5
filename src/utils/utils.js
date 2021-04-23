// constants
export const imagePopup = document.querySelector(".popup_type_image");
export const imagePopupImage = document.querySelector(".popup__image");
export const imagePopupCaption = document.querySelector(".popup__image-caption");


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
  
