import { openFormCards, closePopup, cardItem, itemSection, openPhoto} from "./modal";
import {toggleButton} from "./validate";

const itemTemplate = document.querySelector(".item-template").content.querySelector(".element");

//функции для лайка-дизлайка/удаления фото
export function toggleLike(event) {
  event.target.classList.toggle("element__button-like_active");
}
export function deleteItem(event) {
  event.target.closest(".element").remove();
}

//перенос объектов из модального окна и образование карточек
export function createItem(cardItem) {
  const newItemCard = itemTemplate.cloneNode(true);
  const itemName = newItemCard.querySelector(".element__caption");
  const itemPicture = newItemCard.querySelector(".element__picture");
  const buttonLikeCard = newItemCard.querySelector(".js-like-element");
  const buttonDeleteCard = newItemCard.querySelector(".js-delete-element");

  //делаем контейнер и перенос данных
  itemName.textContent = cardItem.name;
  itemPicture.src = cardItem.link;
  itemPicture.alt = cardItem.name;

 function openItem(evt) {
  openPhoto({name:evt.target.alt, link:evt.target.src})
 }

  //слушатели на карточке
  buttonLikeCard.addEventListener("click", toggleLike);
  buttonDeleteCard.addEventListener("click", deleteItem);
  //слушатели на фотографии
  itemPicture.addEventListener("click", openItem);

  return newItemCard;
}

//itemSection.append(cardNewElement)
