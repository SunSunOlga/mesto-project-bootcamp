import {
  openFormCards,
  closePopup,
  itemSection,
  openPhoto,
  cardItem
} from "./modal";
import { toggleButton } from "./validate";
import { deleteCards } from "./api";
import { userId, initialInfo } from "../pages/script";


const itemTemplate = document
  .querySelector(".item-template")
  .content.querySelector(".element");

//функции для лайка-дизлайка/удаления фото
export function toggleLike(event) {
  event.target.classList.toggle("element__button-like_active");
}
//удаление карточки
export function deleteItem(event) {
  event.target.closest('.element').remove();
}

//перенос объектов из модального окна и образование карточек
export function createItem(card, userId) {
  //template для карточек и разметка для них
  const cardItem = document.querySelector(".element");
//const cardNewElement = cardItem.cloneNode(true);
  const newItemCard = itemTemplate.cloneNode(true);
  const itemName = newItemCard.querySelector(".element__caption");
  const itemPicture = newItemCard.querySelector(".element__picture");
  const buttonLikeCard = newItemCard.querySelector(".js-like-element");
  const buttonDeleteCard = newItemCard.querySelector(".js-delete-element");



  //делаем контейнер и перенос данных
  itemName.textContent = card.name;
  itemPicture.src = card.link;
  itemPicture.alt = card.name;
  itemPicture.id = card.cardId;

  function openItem(evt) {
    openPhoto({ name: evt.target.alt, link: evt.target.src });
  }

  if (userId === card.owner["_id"]) {
    buttonDeleteCard.addEventListener("click", (evt) => {
      const currentCard = evt.target
        .closest(".element")
        .querySelector(".element__picture").id;
        deleteCards(currentCard).then(deleteItem(evt)).catch(console.dir);
    });
  } else {
    buttonDeleteCard.remove();
  }
  //слушатели на карточке
  buttonLikeCard.addEventListener("click", toggleLike);
  //слушатели на фотографии
  itemPicture.addEventListener("click", openItem);

  return newItemCard;
}

//itemSection.append(cardNewElement)
