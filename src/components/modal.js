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
import { getProfileInfo, changeProfileInfo, setAvatar } from "./profile";
import { setCards, patchProfile, patchAvatar } from "./api";


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


