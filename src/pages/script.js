import './index.css';

//редактирование профиля
const buttonEditProfile = document.querySelector(".js-edit-profile");
const buttonOpenCard = document.querySelector(".profile__button-add");
const buttonCloseProfile = document.querySelector(".js-close-form");
const blockPopupProfile = document.querySelector(".popup-profile");
//модальное окно для профиля
const profilePopup = document.querySelector(".popup-profile");
const formProfile = blockPopupProfile.querySelector(".js-form-profile");
const nameInputProfile = formProfile.querySelector(".js-input-name");
const jobInputProfile = formProfile.querySelector(".js-input-job");
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

//открытие попапов
function openPopup(popup) {
  popup.classList.add("popup_opened");
  //добавили класс попапа и обработчик Esc
  document.addEventListener("keydown", closePopupEsc);
  //аналогично с кликом
  popup.addEventListener("click", closePopupClick);
}
//закрытие на эск
function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    //находим отркеытое модальное окно,которое потом бдуем передовать аргументом
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}
//закрытие на клик
function closePopupClick(evt) {
  if (evt.currentTarget === evt.target) {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

//закрытие попапов и все кнопки с крестиком
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupEsc);
  popup.removeEventListener("click", closePopupClick);
}
const closeButtons = document.querySelectorAll(".popup__button-close");
closeButtons.forEach((button) => {
  const popup = button.closest(".popup");

  button.addEventListener("click", () => closePopup(popup));
});

//функции и слушатели для открытия попапа профиля
function openFormProfile() {
  openPopup(profilePopup);
  nameInputProfile.value = nameProfileHtml.textContent;
  jobInputProfile.value = jobProfileHtml.textContent;
}
buttonEditProfile.addEventListener("click", openFormProfile);

//открытие попапа для карточек
function openFormCards() {
  openPopup(cardsPopup);
}
buttonOpenCard.addEventListener("click", openFormCards);

//сабмит для профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  nameProfileHtml.textContent = nameInputProfile.value;
  jobProfileHtml.textContent = jobInputProfile.value;

  closePopup(blockPopupProfile);
  formProfile.reset();
}
formProfile.addEventListener("submit", handleProfileFormSubmit);

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
//функции для лайка-дизлайка/удаления фото
function likeDislikeItem(event) {
  event.target.classList.toggle("element__button-like_active");
}
function deleteItem(event) {
  event.target.closest(".element").remove();
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
  closePopup(cardsPopup);
  itemForm.reset();
});
//выносим массив в секцию для карт
initialCards.forEach((arrayItem) => {
  const newItem = createItem(arrayItem);
  addItem(newItem, itemSection);
});

//itemSection.append(cardNewElement)


//найдем спан,в котором показывает ошибку/выводим текст ошибки/передали .validationMessage
function showError(formElement, inputElement, errorMessage, config) {
  const errorField = formElement.querySelector("#error-" + inputElement.id);
  errorField.textContent = errorMessage;
  inputElement.classList.add(config.inputErrorClass);
}

//очищаем текст ошибки
function hideError(formElement, inputElement, config) {
  const ErrorField = formElement.querySelector("#error-" + inputElement.id);
  ErrorField.textContent = "";
  inputElement.classList.remove(config.inputErrorClass);
}
//проверям-есть поле или нет/принимаем в параметры форму(проброс функции через эту)
function checkValid(formElement, inputElement, config) {
  if (inputElement.validity.valid) {
    hideError(formElement, inputElement, config);
  } else {
    showError(formElement, inputElement, inputElement.validationMessage, config); //взяли из инпута
  }
}

//проверем валидна форма или нет
function toggleButton(formElement, buttonSubmitForm) {
  if (formElement.checkValidity()) {
    buttonSubmitForm.disabled = false;
  } else {
    buttonSubmitForm.disabled = true;
  }
}

function setEventListener(formElement, config) {
  //проверяем инфу в момент реального времени,валидация полей/цикл,который вешает слушатель на любой инпут
  const inputList = formElement.querySelectorAll(config.inputFieldSelector);
  const buttonSubmitForm = formElement.querySelector(
    config.buttonSubmitSelector
  );
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkValid(formElement, inputElement, config);
      // записать функцию для активности доступа кнопки
      toggleButton(formElement, buttonSubmitForm);
    });
  });
}
//в эту функцию примем объект с настройками(конфигуратор)
function enableValidation(config) {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((formElement) => {
    setEventListener(formElement, config); //пробрасываем конфиг в дргуие функции
  });
}

//cоздадим объект для: классов/объектов/селекторов(чтобы исчезла привязка)
const configValidation = {
  //cелектор,по которому выбираются формы(первое свойство)
  formSelector: ".form",
  //чтобы выбрать все инпуты b тд
  inputFieldSelector: ".form__field",
  buttonSubmitSelector: ".form__button-save",
  inputErrorClass: "form__field_active",
};

enableValidation(configValidation);
