//попап для отображения изображения
//const photoFigure = photoPopup.querySelector(".photo__figure");
//const buttonPhotoClose = photoPopup.querySelector(".js-close-photo");
//кнопка сохранить у формы места
//const buttonAddCard = itemForm.querySelector(".js-save-card");
//кнопка закрытия формы профиля
//const buttonCloseProfile = document.querySelector(".js-close-form");
//попап карточек
//const formCards = cardsPopup.querySelector(".js-form-cards");

//cоздадим объект для: классов/объектов/селекторов(чтобы исчезла привязка)
export const configValidation = {
  //cелектор,по которому выбираются формы(первое свойство)
  formSelector: ".form",
  //чтобы выбрать все инпуты b тд
  inputFieldSelector: ".form__field",
  buttonSubmitSelector: ".form__button-save",
  inputErrorClass: "form__field_active",
};

//массив
export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
