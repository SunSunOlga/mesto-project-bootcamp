import "./index.css";

import { configValidation } from "../components/constants";

import { enableValidation } from "../components/validate";

import { createItem, buttonDeleteCard, deleteItem } from "../components/card";

import { addItem, itemSection } from "../components/section";

import {
  getCards,
  setCards,
  getProfileServer,
  patchProfile,
  getAvatarServer,
} from "../components/api";

import {
  changeProfileInfo,
  getProfileInfo,
  setAvatar,
} from "../components/profile";

import { cardItem, openPopup, closePopup } from "../components/modal";

let userId;

//нам нужно,что когда мы получили карточки,то профиль уже был.тк объект,который приходит с карточек,то нам нужно отличать свои карточки от чужих//будем сравнивать owner,id с id текущего пользователя
export function initialInfo() {
  //показываем,что оба запроса выполнились(успешно)//в массиве мб неограниченное кол-во запросов,которые будут выполняться в промисе
  //из запросов функций создаем массив
  //деструктиризация кода-когда сложный объект разбираешь на части сразу присваивая значения отдельным переменным
  //ф-ция,которая возвращает промис,потому вызыввем ф-ции внутри
  Promise.all([getCards(), getProfileServer()])
    //два результата также в массиве
    //then это функция(лямбда)
    .then(([cards, user]) => {
      const { _id } = user;
      userId = user._id;
      changeProfileInfo(user);
      setAvatar(user);
      //cейчас получаем карточку
      cards.reverse().forEach((card) => {
        addItem(createItem(card, userId));
      });
    })
    .catch((err) => {
      console.log(err);
    });
}
initialInfo();

//включаем валидации,настройки передаем при вызове
enableValidation(configValidation);


//редактирование профиля
const buttonEditProfile = document.querySelector(".js-edit-profile");
const blockPopupProfile = document.querySelector(".popup-profile");
//модальное окно для профиля
const profilePopup = document.querySelector(".popup-profile");
const formProfile = blockPopupProfile.querySelector(".js-form-profile");
const nameInputProfile = formProfile.querySelector(".js-input-name");
const jobInputProfile = formProfile.querySelector(".js-input-job");

//модальное окно для карточек
const cardsPopup = document.querySelector(".popup-cards");
//форма карточек
const formCards = cardsPopup.querySelector(".js-form-cards");

const itemForm = document.querySelector(".js-form-cards");
const inputCardName = itemForm.querySelector(".js-input-text-card");
const inputCardLink = itemForm.querySelector(".js-input-link-card");
//кнопка сохранить у формы места
const buttonAddCard = itemForm.querySelector(".js-save-card");

//сабмит для карточки
itemForm.addEventListener("submit", function (event) {
  event.preventDefault();
  //добавляем ф-цию,передаем туда данные из поля ввода
  loadingButtonCaption(buttonAddCard, "Создание...");
  setCards({ name: inputCardName.value, link: inputCardLink.value })
    //сервер вернул нам ответ//из него взяли name и link и создали карточку
    .then((card, userId) => {
      const newItem = createItem(card, userId);
      addItem(newItem);
      closePopup(cardsPopup);
      itemForm.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      loadingButtonCaption(buttonAddCard, "Создать");
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

  patchProfile({ name: nameInputProfile.value, about: jobInputProfile.value })
    .then((user) => {
      changeProfileInfo(user);
      closePopup(blockPopupProfile);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      loadingButtonCaption(buttonSubmitProfile, "Сохранить");
    });
}
formProfile.addEventListener("submit", handleProfileFormSubmit);

//меняем текст у кнокпи
export function loadingButtonCaption(button, caption) {
  button.textContent = caption;
}

//редактирование аватара
const avatarPopup = document.querySelector(".popup-avatar");
const formAvatar = avatarPopup.querySelector(".js-form-avatar");
const inputAvatar = formAvatar.querySelector(".js-input-link-avatar");
const buttonChangeAvatar = document.querySelector(".profile__button-avatar");
const buttonSaveAvatar = formAvatar.querySelector(".js-save-avatar");

//открытие попапа аватара
export function openFormAvatar() {
  if (formAvatar.checkValidity()) {
    buttonAddCard.disabled = false;
  } else {
    buttonAddCard.disabled = true;
  }
  openPopup(avatarPopup);
}
buttonChangeAvatar.addEventListener("click", openFormAvatar);

//сабмит для аватара
function handleAvatarFormSubmit(event) {
  event.preventDefault();
  loadingButtonCaption(buttonSaveAvatar, "Сохранение...");

  patchAvatar({ avatar: inputAvatar.value })
    .then((avatar) => {
      setAvatar(avatar);
      closePopup(avatarPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      loadingButtonCaption(buttonSaveAvatar, "Сохранить");
    });
}

formAvatar.addEventListener("submit", handleAvatarFormSubmit);












/* ////используем модуль
getCards()
  //нужно подождать данные прежде,чем получить-выполнить действие только, когда сервер вернет данные
  .then((res) => {
    //console.log(res)
    //массив рес//перебрали каждый элемент,взяли из объектов name и link и передали ф-цию createItem
    res.forEach((arrayItem) => {
      const newItem = createItem({
        name: arrayItem.name,
        link: arrayItem.link,
      });
      addItem(newItem);
    });
  });
 */

/* //выносим массив в секцию для карт
initialCards.forEach((arrayItem) => {
  const newItem = createItem(arrayItem);
  addItem(newItem);
}); */

/* //обработка необработанного отклонения промисов
window.addEventListener("unhandledrejection", (evt) => {
  console.error("Необработанная ошибка.\nМесто возникновения: ");
  console.error(evt.promise);
  console.error("Информация об ошибке:");
  console.error(evt.reason);
}); */
