//редактирование профиля
const buttonEdit = document.querySelector(".js-edit-profile");
const buttonAdd = document.querySelector(".profile__button-add");
const buttonClose = document.querySelector(".js-close-form");
const inputForm = document.querySelector(".form__field");
const blockPopup = document.querySelector(".popup");
const buttonSave = document.querySelector(".js-save-form");
//модальное окно для профиля
const blockForm = blockPopup.querySelector(".js-form");
const nameInput = blockForm.querySelector(".js-input-name");
const jobInput = blockForm.querySelector(".js-input-job");
const nameProfile = document.querySelector(".js-name-profile");
const jobProfile = document.querySelector(".js-job-profile");
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

//функции и слушатели для открытия/закрытия попапа профиля
function visibleFormProfile() {
  blockPopup.classList.add("popup_opened");
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}
buttonEdit.addEventListener("click", visibleFormProfile);

function closeForm() {
  blockPopup.classList.remove("popup_opened");
  blockForm.reset();
}
buttonClose.addEventListener("click", closeForm);
//сабмит для профиля
function handleFormSubmit(evt) {
  evt.preventDefault();

  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closeForm();
}
blockForm.addEventListener("submit", handleFormSubmit);

//открытие и закрытия попапа для карточек
function VisibleFormCards() {
  cardsPopup.classList.add("popup_opened");
}
buttonAdd.addEventListener("click", VisibleFormCards);

function cardClose() {
  cardsPopup.classList.remove("popup_opened");
  formCards.reset();
}
buttonCloseCard.addEventListener("click", cardClose);

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
//функции для удаления/лайка/закрытия фото и карточки
function likeItem(event) {
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
  const ItemPicture = newItemCard.querySelector(".element__picture");
  const buttonLikeCard = newItemCard.querySelector(".js-like-element");
  const buttonDeleteCard = newItemCard.querySelector(".js-delete-element");

//делаем контейнер и перенос данных
  itemName.textContent = cardItem.name;
  ItemPicture.src = cardItem.link;

//слушатели на карточке
  buttonLikeCard.addEventListener("click", likeItem);
  buttonDeleteCard.addEventListener("click", deleteItem);
//слушатели на фотографии
  ItemPicture.addEventListener("click", openPhoto);
  buttonPhotoClose.addEventListener("click", closePhoto);

//открыть фото
  function openPhoto() {
    photoFigaption.textContent = cardItem.name;
    photoImg.src = cardItem.link;
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
  cardClose();
});
//выносим массив в секцию для карт
initialCards.forEach((arrayItem) => {
  const newItem = createItem(arrayItem);
  addItem(newItem, itemSection);
});

//itemSection.append(cardNewElement);
