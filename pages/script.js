//редактирование профиля
const buttonEditProfile = document.querySelector(".js-edit-profile");
const buttonOpenCard = document.querySelector(".profile__button-add");
const buttonCloseProfile = document.querySelector(".js-close-form");
const inputFormProfile = document.querySelector(".form__field");
const blockPopupProfile = document.querySelector(".popup-profile");
//модальное окно для профиля
const blockFormProfile = blockPopupProfile.querySelector(".js-form-profile");
const nameInputProfile = blockFormProfile.querySelector(".js-input-name");
const jobInputProfile = blockFormProfile.querySelector(".js-input-job");
const nameProfileHtml = document.querySelector(".js-name-profile");
const jobProfileHtml = document.querySelector(".js-job-profile");
//модальное окно для карточек
const cardsPopup = document.querySelector(".popup-cards");
const buttonCloseCard = document.querySelector(".js-close-cards");
const formCards = cardsPopup.querySelector(".js-form-cards");
//template для карточек и разметка для них
const cardItem = document.querySelector(".element");
//const cardNewElement = cardItem.cloneNode(true);
const itemSection = document.querySelector(".elements-grid");

const itemForm = document.querySelector(".js-form-cards");
const buttonAddCard = itemForm.querySelector(".js-save-card");
const inputCardName = itemForm.querySelector(".js-input-text-card");
const inputCardLink = itemForm.querySelector(".js-input-link-card");
const itemTemplate = document
  .querySelector(".item-template")
  .content.querySelector(".element");
//попап для отображения изображения
const photoPopup = document.querySelector(".popup-photos");
const photoFigure = photoPopup.querySelector(".photo__figure");
const photoImg = photoPopup.querySelector(".popup__photo");
const photoFigaption = photoPopup.querySelector(".popup__figaption");
const buttonPhotoClose = photoPopup.querySelector(".js-close-photo");

/*
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}
const closeButtons = document.querySelectorAll('.popup__button-close');
closeButtons.forEach((button) => {
const popup = button.closest('.popup');

button.addEventListener('click', () => closePopup(popup), openPopup(popup));
});
*/


//функции и слушатели для открытия/закрытия попапа профиля
function openFormProfile() {
  blockPopupProfile.classList.add("popup_opened");
  nameInputProfile.value = nameProfileHtml.textContent;
  jobInputProfile.value = jobProfileHtml.textContent;
}
buttonEditProfile.addEventListener("click", openFormProfile);

function closeForm() {
  blockPopupProfile.classList.remove("popup_opened");
  blockFormProfile.reset();
}
buttonCloseProfile.addEventListener("click", closeForm);
//сабмит для профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  nameProfileHtml.textContent = nameInputProfile.value;
  jobProfileHtml.textContent = jobInputProfile.value;
  closeForm();
}
blockFormProfile.addEventListener("submit", handleProfileFormSubmit);

//открытие и закрытия попапа для карточек
function openFormCards() {
  cardsPopup.classList.add("popup_opened");
}
buttonOpenCard.addEventListener("click", openFormCards);

function closeCard() {
  cardsPopup.classList.remove("popup_opened");
}
buttonCloseCard.addEventListener("click", closeCard);

//массив
const initialCards = [
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
//функции для удаления/лайка-дизлайка/закрытия фото и карточки
function likeDislikeItem(event) {
  event.target.classList.toggle("element__button-like_active");
}
function deleteItem(event) {
  event.target.closest(".element").remove();
}

function closePhoto() {
  photoPopup.classList.remove("popup_opened");
}

//перенос объектов из модального окна и образование карточек
function createItem(cardItem) {
  const newItemCard = itemTemplate.cloneNode(true);
  const itemName = newItemCard.querySelector(".element__caption");
  const itemPicture = newItemCard.querySelector(".element__picture");
  const buttonLikeCard = newItemCard.querySelector(".js-like-element");
  const buttonDeleteCard = newItemCard.querySelector(".js-delete-element");

//делаем контейнер и перенос данных
  itemName.textContent = cardItem.name;
  itemPicture.src = cardItem.link;
  itemPicture.alt = cardItem.name;

//слушатели на карточке
  buttonLikeCard.addEventListener("click", likeDislikeItem);
  buttonDeleteCard.addEventListener("click", deleteItem);
//слушатели на фотографии
  itemPicture.addEventListener("click", openPhoto);
  buttonPhotoClose.addEventListener("click", closePhoto);

//открыть фото
  function openPhoto() {
    photoFigaption.textContent = cardItem.name;
    photoImg.src = cardItem.link;
    photoImg.alt = cardItem.name;
    photoPopup.classList.add("popup_opened");
  }

  return newItemCard;
}

function addItem(newItem, section) {
  section.prepend(newItem);
}
//сабмит для карточки
itemForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const newItem = createItem({
    name: inputCardName.value,
    link: inputCardLink.value,
  });
  addItem(newItem, itemSection);
  closeCard();
});
//выносим массив в секцию для карт
initialCards.forEach((arrayItem) => {
  const newItem = createItem(arrayItem);
  addItem(newItem, itemSection);
});

//itemSection.append(cardNewElement);
