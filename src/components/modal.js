import { configValidation } from "./constants";
import {
  checkValid,
  toggleButton,
  showError,
  hideError,
  setEventListener,
  checkValidity,
} from "./validate";
import { addItem } from "../components/section";
import { createItem } from "./card";
import { getProfileInfo , changeProfileInfo} from "./profile";
import { setCards, patchProfile } from "./api";

//редактирование профиля
const buttonEditProfile = document.querySelector(".js-edit-profile");
const blockPopupProfile = document.querySelector(".popup-profile");
//модальное окно для профиля
const profilePopup = document.querySelector(".popup-profile");
const formProfile = blockPopupProfile.querySelector(".js-form-profile");
const nameInputProfile = formProfile.querySelector(".js-input-name");
const jobInputProfile = formProfile.querySelector(".js-input-job");

//открытие попапов
export function openPopup(popup) {
  popup.classList.add("popup_opened");
  //добавили класс попапа и обработчик Esc
  document.addEventListener("keydown", closePopupEsc);
  //аналогично с кликом
  popup.addEventListener("click", closePopupClick);
}

//закрытие на эск
export function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    //находим отркеытое модальное окно,которое потом бдуем передовать аргументом
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}
//закрытие на клик
export function closePopupClick(evt) {
  if (evt.currentTarget === evt.target) {
    closePopup(evt.currentTarget);
  }
}

//закрытие попапов и все кнопки с крестиком
export function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupEsc);
  popup.removeEventListener("click", closePopupClick);
}
const closeButtons = document.querySelectorAll(".popup__button-close");
closeButtons.forEach((button) => {
  const popup = button.closest(".popup");

  button.addEventListener("click", () => closePopup(popup));
});

//модальное окно для карточек
const cardsPopup = document.querySelector(".popup-cards");
//форма карточек
const formCards = cardsPopup.querySelector(".js-form-cards");
//template для карточек и разметка для них
export const cardItem = document.querySelector(".element");
//const cardNewElement = cardItem.cloneNode(true);

const itemForm = document.querySelector(".js-form-cards");
const inputCardName = itemForm.querySelector(".js-input-text-card");
const inputCardLink = itemForm.querySelector(".js-input-link-card");
//кнопка сохранить у формы места
const buttonAddCard = itemForm.querySelector(".js-save-card");

//сабмит для карточки
itemForm.addEventListener("submit", function (event) {
  event.preventDefault();
  //добавляем ф-цию,передаем туда данные из поля ввода

const freshCard = ({ name: inputCardName.value, link: inputCardLink.value });

Promise.all([ setCards(freshCard), getProfileServer()])
    //сервер вернул нам ответ//из него взяли name и link и создали карточку
    .then(([card, user]) => {
      const {name, about, _id} = user;
      addItem( { name: card.name,
        link: card.link,
        objectLikes: card["likes"],
        idCard: card["_id"],
        ownerCard: card["owner"],
        authorizedServer: user});
        
      closePopup(cardsPopup);
      itemForm.reset();
    })
    .catch((err) => {
      console.log(err);
    });
});

//попап для отображения изображения
const photoPopup = document.querySelector(".popup-photos");
const photoImg = photoPopup.querySelector(".popup__photo");
const photoFigaption = photoPopup.querySelector(".popup__figaption");
//открыть фото
export function openPhoto({ name, link }) {
  photoFigaption.textContent = name;
  photoImg.src = link;
  photoImg.alt = name;
  openPopup(photoPopup);
}

const buttonOpenCard = document.querySelector(".profile__button-add");
//открытие попапа для карточек
export function openFormCards() {
  if (formCards.checkValidity()) {
    buttonAddCard.disabled = false;
  } else {
    buttonAddCard.disabled = true;
  }
  openPopup(cardsPopup);
}
buttonOpenCard.addEventListener("click", openFormCards);

//открытие попапа профиля
export function openFormProfile() {
  if (formProfile.checkValidity()) {
    buttonAddCard.disabled = false;
  } else {
    buttonAddCard.disabled = true;
  }
  const { name, about } = getProfileInfo();
  nameInputProfile.value = name;
  jobInputProfile.value = about;

  openPopup(profilePopup);
}
buttonEditProfile.addEventListener("click", openFormProfile);

const buttonSubmitProfile = formProfile.querySelector(".js-save-form");

//сабмит для профиля
export function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  loadingButtonCaption(buttonSubmitProfile, "Сохранение...");

  patchProfile({name: nameInputProfile.value, about: jobInputProfile.value})
    .then((user) => {
      changeProfileInfo(user);
      closePopup(blockPopupProfile);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {loadingButtonCaption(buttonSubmitProfile,"Сохранить")
})
}
formProfile.addEventListener("submit", handleProfileFormSubmit);

//меняем текст у кнокпи
export function loadingButtonCaption(button, caption) {
  button.textContent = caption;
}
