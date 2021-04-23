// constants
export const imagePopup = document.querySelector(".popup_type_image");
export const imagePopupImage = document.querySelector(".popup__image");
export const imagePopupCaption = document.querySelector(
  ".popup__image-caption"
);

export const renderLoading = (isLoading, formElement) => {
  const thisForm = formElement;
  // get current textContent of the current button:
  const thisFormButton = thisForm.querySelector(".edit-form__save-button");
  const buttonText = thisFormButton.textContent;
  // const swapContainer = originalButtonText;
  const loadingButtonText = thisFormButton.getAttribute("data-loading-state");
  if (isLoading) {
    // btn needs loading text
    thisFormButton.textContent = loadingButtonText; // make the content of the btn to loading...
    thisFormButton.setAttribute("data-loading-state", buttonText); // swap the OG btn text into the data container
  } else {
    // btn needs base text, which should be stored in the data right now
    const container = buttonText; // will have the loading... text in it
    thisFormButton.textContent = loadingButtonText;
    thisFormButton.setAttribute("data-loading-state", container);
  }
};
