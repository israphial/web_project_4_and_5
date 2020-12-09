
let editButton = document.querySelector('.profile__edit');
let closeButton = document.querySelector('.edit-form__close-button')
let popupWindow = document.querySelector('.popup');
let popupForm = document.querySelector('.edit-form__form');

let profileHeader = document.querySelector('.profile__header');
let profileDescription = document.querySelector('.profile__description');

document.querySelector('.edit-form__input_type_header').value = profileHeader.innerText; //sets the form values at script load
document.querySelector('.edit-form__input_type_description').value = profileDescription.innerText;


popupForm.addEventListener('submit', function(event) {

    profileHeader.textContent = document.querySelector('.edit-form__input_type_header').value;
    profileDescription.textContent = document.querySelector('.edit-form__input_type_description').value;
    
    event.preventDefault(); // stops the save button submission from refreshing the page
    togglePopupBlock();
});

function togglePopupBlock() {
    popupWindow.classList.toggle("popup_visible");
}

editButton.addEventListener('click', togglePopupBlock);

closeButton.addEventListener('click', togglePopupBlock);